export const feedbackCategories: readonly ['Pengalaman website','Saran','Kritik membangun','Lainnya'];
export function containsAbuse(value:string):boolean;
export function validateFeedback(input:unknown): {ok:true;value:{rating:number;name:string;category:string;message:string;page:string}} | {ok:false;message:string};
