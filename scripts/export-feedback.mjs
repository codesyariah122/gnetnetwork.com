import { list, get } from '@vercel/blob';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const records=[];let cursor;
do {const batch=await list({prefix:'feedback/',limit:1000,cursor});for(const blob of batch.blobs){if(!blob.pathname.endsWith('.txt'))continue;const result=await get(blob.pathname,{access:'private'});if(!result?.stream)throw new Error('Tidak dapat membaca '+blob.pathname);records.push(JSON.parse(await new Response(result.stream).text()));}cursor=batch.hasMore?batch.cursor:undefined;}while(cursor);
records.sort((a,b)=>a.submittedAt.localeCompare(b.submittedAt));
const output=resolve(process.argv[2]||'feedback-export.txt');
const log=records.map(r=>`[${r.submittedAt}] ${r.rating}/5 | ${r.category}\nID: ${r.id}\nNama: ${r.name}\nHalaman: ${r.page}\nMasukan:\n${r.message.split('\n').map(line=>'  '+line).join('\n')}\n${'-'.repeat(60)}`).join('\n\n');
await writeFile(output,log+'\n',{mode:0o600});console.log(`Ekspor ${records.length} feedback ke ${output}`);
