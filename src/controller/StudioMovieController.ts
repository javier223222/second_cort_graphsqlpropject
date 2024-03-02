import { getStudiosByMovie } from "../domain/orm/Movie.studios.orm";
import { IStudioMovieController } from "./interfaces";
import { PaginationType } from "./types/PaginationType";

export default class StudioMovieController implements IStudioMovieController{
    public async getStudiosOfMovies(idMovie: number, page?: number | undefined, limit?: number | undefined): Promise<any[] | PaginationType> {
        try{
         if(page && limit){
            const result=await getStudiosByMovie(idMovie,page,limit)
            return result
         }
            const result=await getStudiosByMovie(idMovie)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}