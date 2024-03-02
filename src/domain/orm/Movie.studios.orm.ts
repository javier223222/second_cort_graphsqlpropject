import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"
import { CastType } from "../../controller/types/CastType"
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { MovieStudioType } from "../../controller/types/MovieStudioType"
import { PaginationType } from "../../controller/types/PaginationType"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"

/**
 * funcin que guarda un estudio de pelicula en la base de datos
 * @param movieStudi objeto del tipo MovieStudioType que contiene los datos de la relacion entre pelicula y estudio
 * @returns  Promise<MovieStudioType|ErrorType> retorna un objeto de tipo MovieStudioType si la operacion fue exitosa o un objeto de tipo ErrorType si la operacion fue fallida
 */

export const addMovieStudios=async(movieStudi:MovieStudioType):Promise<MovieStudioType|ErrorType>=>{
    try{
      
        const result=await db.movieStudios.create({
            data:{
                idMovie:movieStudi.idMovie,
                idStudio:movieStudi.idStudio
            },
            select:{
                idMovieStudio:true,
                idMovie:true,
                idStudio:true,
                created_at:true
            }
        })

        return {
          idMovie:result.idMovie,
          idStudio:result.idStudio,
          idMovieStudio:result.idMovieStudio,
          created_at:result.created_at
        }
    
    }catch(e:any){
        return errorMesagge("Error in addMovieStudios",e.message,500)
    }
}

/**
 * 
 * @param idMovie id de la pelicula
 * @returns retorna un arreglo con los estudios participantes en la pelicula
 */

export const getStudiosByMovie=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|PaginationType>=>{
   

  try{
   if(page && limit){
         const skip=(page-1)*limit
         const totalStudios:number=await db.movieStudios.count({
              where:{
                idMovie:idMovie
              }
         })
         const totalpages=Math.ceil(totalStudios/limit)
         const result=await db.movieStudios.findMany({
              skip:skip,
              take:limit,
              where:{
                idMovie:idMovie
              },
              select:{
                idMovieStudio:true,
                idMovie:true,
                idStudio:true,
                created_at:true,
                studio:{
                     select:{
                          idStudio:true,
                          name:true,
                     }
                }
              },
                orderBy:{
                    created_at:"desc"
                }
         })
         return {
            result:result,
            totalPage:totalpages,
            currentPage:page,
         }
   } 
     const result=await db.movieStudios.findMany({
        where:{
            idMovie:idMovie
        },
        select:{
            idMovieStudio:true,
            idMovie:true,
            idStudio:true,
            created_at:true,
            studio:{
                select:{
                    idStudio:true,
                    name:true,
                }
            }
        
        },
        orderBy:{
            created_at:"desc"
        }
     })
   
     return result

  }catch(e:any){
   throw new Error(e.message)
  }
}

/**
 * 
 * @param idMovieStudio  id de la relacion entre pelicula y estudio
 * @returns  retorna un objeto de tipo MovieStudioType si la operacion fue exitosa o un objeto de tipo ErrorType si la operacion fue fallida
 */
export const deleteMovieStudio=async(idMovieStudio:number):Promise<MovieStudioType|ErrorType>=>{
   try{
     const result=await db.movieStudios.delete({
        where:{
            idMovieStudio:idMovieStudio
        }
        ,
        select:{
            idMovieStudio:true,
            idMovie:true,
            idStudio:true,
            created_at:true,
            studio:{
                select:{
                    name:true
                }
            }
        }
     })
     return {
        idMovie:result.idMovie,
        idStudio:result.idStudio,
        idMovieStudio:result.idMovieStudio,
        created_at:result.created_at,
        nameStudi:result.studio.name
     }
   }catch(e:any){
    return errorMesagge("Error in deleteMovieStudio",e.message,500)
   }
}



