import { put, head } from '@vercel/blob';
import { createHmac, randomUUID } from 'node:crypto';
import { validateFeedback } from '../lib/feedback-policy.mjs';

export const config = { maxDuration: 15 };
export function createFeedbackHandler({write=put, exists=async path=>{try {await head(path);return true;}catch{return false;}}, secret=()=>process.env.FEEDBACK_HASH_SECRET, now=()=>Date.now()}={}) {
  return async function feedback(req,res) {
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    const reply=(code,message)=>res.status(code).json({ok:code===201,message});
    if(req.method!=='POST'){res.setHeader('Allow','POST');return reply(405,'Metode tidak didukung.');}
    const origins = new Set(['https://gnetnetwork.com','https://www.gnetnetwork.com','https://gnetnetwork.vercel.app']);
    if(process.env.VERCEL_URL)origins.add(`https://${process.env.VERCEL_URL}`);
    if(!origins.has(req.headers.origin))return reply(403,'Kirim masukan melalui website GNET Network.');
    if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))return reply(415,'Format masukan harus JSON.');
    if(Number(req.headers['content-length']||0)>10000)return reply(413,'Masukan terlalu panjang.');
    let body=req.body;
    try{if(typeof body==='string')body=JSON.parse(body);if(Buffer.byteLength(JSON.stringify(body) || '')>10000)return reply(413,'Masukan terlalu panjang.');}catch{return reply(400,'Masukan tidak dapat dibaca.');}
    if(body?.website)return reply(400,'Masukan tidak dapat diproses.');
    const checked=validateFeedback(body);
    if(!checked.ok)return reply(400,checked.message);
    const salt=secret();
    const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'').split(',')[0].trim();
    if(!salt || !ip)return reply(503,'Feedback sementara belum tersedia. Silakan coba kembali nanti.');
    const timestamp=now();
    const date=new Date(timestamp).toISOString();
    const bucket=Math.floor(timestamp/60000);
    const network=createHmac('sha256',salt).update(ip).digest('hex').slice(0,24);
    // One immutable private text file per network/minute. No shared append or process-local counters.
    const pathname=`feedback/${date.slice(0,10)}/${bucket}-${network}.txt`;
    const id=randomUUID();
    const record={id,submittedAt:date,...checked.value};
    try{
      await write(pathname,JSON.stringify(record,null,2)+'\n',{access:'private',contentType:'text/plain; charset=utf-8',addRandomSuffix:false,allowOverwrite:false});
      return res.status(201).json({ok:true,message:'Terima kasih! Masukan Anda sudah tersimpan untuk tim GNET.',id});
    }catch{
      if(await exists(pathname).catch(()=>false)){res.setHeader('Retry-After','60');return reply(429,'Masukan dari jaringan ini baru saja diterima. Tunggu sekitar satu menit sebelum mengirim lagi.');}
      console.error('Feedback storage write failed');
      return reply(503,'Masukan belum tersimpan. Silakan coba kembali beberapa saat lagi.');
    }
  };
}
export default createFeedbackHandler();
