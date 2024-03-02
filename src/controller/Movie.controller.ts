import { getCast } from "../domain/orm/Movie.Cast.orm";
import { getDirectors } from "../domain/orm/Movie.Director.orm";
import { getAllMovies, getMovieUn, updateMovieTittled } from "../domain/orm/Movie.orm";
import { IMovieController } from "./interfaces/index";
import { ErrorType } from "./types/ErrorType";
import { MovieTypeExceptions } from "./types/MovieType";
import { PaginationType } from "./types/PaginationType";
export default class MovieController implements IMovieController{
 public async getMovie(id?:number): Promise<any[] | ErrorType|MovieTypeExceptions> {
      try{
        if(id){
          const movie=await getMovieUn(id)
          return movie
        }

        const movie=await getAllMovies()

        return movie

      }catch(e:any){
            return {
                message:e.message,
                error:"Error in getMovies",
                status:500
            }
      }
  }
  public async getActorOfMovie(id: number,page?:number,limit?:number ): Promise<any[] | ErrorType|PaginationType> {
       try{
            if(page && limit){
                const  actorInMovie=await getCast(id,page,limit)
                return actorInMovie
            }
           const actorInMovie=await getCast(id)
            return actorInMovie
            
       }catch(e:any){
            return {
                message:e.message,
                error:"Error in getActorOfMovie",
                status:500
            }
       }
  }
 public async updateMovieTittle(movie: MovieTypeExceptions): Promise<MovieTypeExceptions | ErrorType> {
      try{

        const result=await updateMovieTittled(movie)
        return result

      }catch(e:any){
            return {
                message:e.message,
                error:"Error in updateMovieTittle",
                status:500
      }
  }
}
public async getDirectorsOfMovie(idMovie: number, page?: number | undefined, limit?: number | undefined): Promise<any[] | PaginationType> {
    try{
      let result:PaginationType|any[]
      if(page && limit){
        result=await getDirectors(idMovie,page,limit)
        return result
      }
      result=await getDirectors(idMovie)
      return result
    }catch(e:any){
      throw new Error(e.message)
    }
}
}