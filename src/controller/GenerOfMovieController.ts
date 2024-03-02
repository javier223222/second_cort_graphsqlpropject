import { getGenerOfMovie } from "../domain/orm/Movie.Gener.orm";
import { IGenersOfMovieController } from "./interfaces";
import { PaginationType } from "./types/PaginationType";

export default class GenerOfMovieController implements IGenersOfMovieController{
    public async getGenersOfMovies(idMovie: number, page?: number | undefined, limit?: number | undefined): Promise<any[] | PaginationType> {
        try{
            if(page && limit){
                const result=await getGenerOfMovie(idMovie,page,limit)
            }
            const result=await getGenerOfMovie(idMovie)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}