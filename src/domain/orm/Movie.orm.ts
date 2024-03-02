import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"
import { CastType } from "../../controller/types/CastType"
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { MovieType, MovieTypeExceptions } from "../../controller/types/MovieType"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"

export const addMovie=async(movie:MovieType):Promise<MovieType|ErrorType>=>{
    try{
        const result=await db.movie.create({
            data:{
                title:movie.title,
                year:movie.year,
                slogan:movie.slogan,
                description:movie.description,
                duration:movie.duration
            
            },
            select:{
                idMovie:true,
                title:true,
                year:true,
                slogan:true,
                description:true,
                duration:true,
                created_at:true
            
            }
        })
        return {
            idmovie:result.idMovie,
            title:result.title,
            year:result.year,
            slogan:result.slogan,
            description:result.description,
            duration:result.duration,
            crated_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Error in addMovie",e.message,500)
    }
}

export const getMovieUn=async(idmovie:number):Promise<MovieTypeExceptions|ErrorType>=>{

    try{
        const result=await db.movie.findUnique({
            where:{
                idMovie:idmovie
            },
            select:{
                idMovie:true,
                title:true,
                year:true,
                slogan:true,
                description:true,
                duration:true,
                created_at:true
            }
        })
        return {
          idMovie:result?.idMovie,
          title:result?.title,
          year:result?.year,
         slogan:result?.slogan,
         description:result?.description,
         duration:result?.duration,
            crated_at:result?.created_at

        }
    }catch(e:any){
        return errorMesagge("Error in getMovie",e.message,500)
    }
}

export const getAllMovies=async():Promise<Array<any>|ErrorType>=>{
    try{
        const result=await db.movie.findMany({
            select:{
                idMovie:true,
                title:true,
                year:true,
                slogan:true,
                description:true,
                duration:true,
                created_at:true
            }
        })
        return result
    }catch(e:any){
        return errorMesagge("Error in getMovies",e.message,500)
    
    }
}



export const deleteMovie=async(idmovie:number):Promise<MovieTypeExceptions|ErrorType>=>{
    try{
        const result=await db.movie.delete({
            where:{
                idMovie:idmovie
            },
            select:{
                idMovie:true,
                title:true,
                year:true,
                slogan:true,
                description:true,
                duration:true,
                created_at:true
            }
        })
        return {
            idMovie:result.idMovie,
            title:result.title,
            year:result.year,
            slogan:result.slogan,
            description:result.description,
            duration:result.duration,
            crated_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Error in deleteMovie",e.message,500)
    }
}


export const updateMovieTittled=async(movie:MovieTypeExceptions):Promise<MovieTypeExceptions|ErrorType>=>{
    try{
       
      
            const result=await db.movie.update({
                where:{
                    idMovie:movie.idMovie
            
                },
                data:{
                    title:movie.title
            
                },
                select:{
                    idMovie:true,
                    title:true,
                    year:true,
                    slogan:true,
                    description:true,
                    duration:true,
                    created_at:true
                }
            })

            
            return {
                idMovie:result.idMovie,
                title:movie.title,
                year:result.year,
                slogan:result.slogan,
                description:result.description,
                duration:result.duration,
                crated_at:result.created_at
            }

      
    }catch(e:any){
        return errorMesagge("Error in updateMovie",e.message,500)
    }
}









