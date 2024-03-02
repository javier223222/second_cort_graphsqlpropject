export type MovieTypeExceptions={
    idMovie?:number,
    title ?:string | undefined,
    year?:Date|undefined,
    slogan?:string | null | undefined,
    description?:string|undefined,
    duration?:number|undefined,
    crated_at ?:Date|undefined



}
export type MovieType={
    idmovie:number,
    title:string,
    year:Date,
    slogan:string | null,
    description:string,
    duration:number,
    crated_at :Date

}
