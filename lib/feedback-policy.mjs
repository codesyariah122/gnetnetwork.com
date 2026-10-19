// Shared client/server policy. Edit this list to tune moderation; criticism itself is allowed.
const blocked = ['anjing', 'bangsat', 'bajingan', 'brengsek', 'kampret', 'kontol', 'memek', 'ngentot', 'jancok', 'jancuk', 'asu', 'goblok', 'tolol', 'babi', 'tai', 'fuck', 'fucking', 'shit', 'bitch', 'asshole'];
const substitutions = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '9': 'g', '@': 'a', '$': 's', '!': 'i' };
const longWords = blocked.filter(word => word.length >= 5);
export function containsAbuse(value) {
    const normalized = value.normalize('NFKD').replace(/\p{M}|\p{Cf}/gu, '').toLowerCase().replace(/[01345789@$!]/g, c => (substitutions[c] ?? c));
    const words = normalized.replace(/[^a-z]+/g, ' ').trim().split(/\s+/).map(word => word.replace(/(.)\1{2,}/g, '$1'));
    if (words.some(word => blocked.includes(word)))
        return true;
    const compact = normalized.replace(/[^a-z]/g, '').replace(/(.)\1{2,}/g, '$1');
    return longWords.some(word => compact.includes(word));
}
export const feedbackCategories = ['Pengalaman website', 'Saran', 'Kritik membangun', 'Lainnya'];
export function validateFeedback(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input))
        return { ok: false, message: 'Format masukan tidak valid.' };
    const data = input;
    if (!Number.isInteger(data.rating) || Number(data.rating) < 1 || Number(data.rating) > 5)
        return { ok: false, message: 'Pilih penilaian 1 sampai 5 bintang.' };
    if (typeof data.message !== 'string' || data.message.trim().length < 10 || data.message.trim().length > 1500)
        return { ok: false, message: 'Tulis masukan antara 10 sampai 1.500 karakter.' };
    if (data.name !== undefined && (typeof data.name !== 'string' || data.name.length > 80))
        return { ok: false, message: 'Nama maksimal 80 karakter.' };
    if (!feedbackCategories.includes(data.category))
        return { ok: false, message: 'Pilih kategori masukan yang tersedia.' };
    const name = typeof data.name === 'string' ? data.name.replace(/[\r\n\x00-\x1f\x7f]/g, ' ').trim() : '';
    const message = data.message.trim().replace(/\r\n/g, '\n').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
    if (containsAbuse(name + ' ' + message))
        return { ok: false, message: 'Ada kata yang tidak sesuai. Sampaikan kritik dengan bahasa yang sopan, lalu coba lagi.' };
    const page = typeof data.page === 'string' && /^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(data.page) && data.page.length < 150 ? data.page : '/';
    return { ok: true, value: { rating: Number(data.rating), name: name || 'Anonim', category: String(data.category), message, page } };
}
