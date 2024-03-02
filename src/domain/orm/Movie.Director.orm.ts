
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { PaginationType } from "../../controller/types/PaginationType"

import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"




/**
 * funcion para agregar un director a le pelicula
 * @param directInfo implementa el tipo de dato DirectorToMovieType que es un objeto con los campos idDirector y idMovie
 * @returns  un DirectorToMovieType con la informacion agregada recien  o un errortype con el erro
 */


export const addDirector = async(directInfo:DirectorToMovieType):Promise<DirectorToMovieType|ErrorType>=>{
    try{
 
     const result=await db.directorsOfMovies.create({
         data:{
          idDirector:directInfo.idDirector,
          idMovie:directInfo.idMovie
         },
         select:{
             idDirector:true,
             idMovie:true,
             idDirectorOfMovie:true,
             created_at:true
         }
     })
       return {
         idDirector:result.idDirector,
         idMovie:result.idMovie,
         idDkirectorOfMovie:result.idDirectorOfMovie,
         created_at_movie:result.created_at
         
       }
    }catch(e:any){
     return errorMesagge("Erro al agregar un nuevo registro en la tabla DirectorsOfMovies",e.message,500)
    }
 }
 /**
  * obtner todos los directores de la pelicula
  * @param idMovie id de la pelicula
  * @returns  un array de DirectorToMovieType con la informacion de la tabla DirectorsOfMovies o un errortype con el error
  */
 
export const getDirectors=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|PaginationType>=>{
    try{

        if(page && limit){
            const skip=(page-1)*limit
            const totalDirectors:number=await db.directorsOfMovies.count({
                where:{
                    idMovie:idMovie
                }
            })
            const totalpages=Math.ceil(totalDirectors/limit)
            const result=await db.directorsOfMovies.findMany({
                skip:skip,
                take:limit,
                where:{
                    idMovie:idMovie
                },
                select:{
                    idDirector:true,
                    idMovie:true,
                    idDirectorOfMovie:true,
                    created_at:true,
                    director:{
                        select:{
                            idDirector:true,
                            name:true,
                            lastName:true,
                            DirectorOfImage:{
                                select:{
                                    idDirectorImg:true,
                                     urlImage:true
                                }
                            
                            }
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
                 currentPage:page
            }
        }
        const result=await db.directorsOfMovies.findMany({
            where:{
                idMovie:idMovie
            },
            select:{
                idDirector:true,
                idMovie:true,
                idDirectorOfMovie:true,
                created_at:true,
                director:{
                    select:{
                        idDirector:true,
                        name:true,
                        lastName:true,
                        DirectorOfImage:{
                            select:{
                                idDirectorImg:true,
                                 urlImage:true
                            }
                        
                        }
                    }
                
                }
            },
            orderBy:{
                created_at:"desc"
            }
        })
        return result
    }catch(e:any){
        throw new Error("Error in getDirectorsOfMovie")
    }
}
/**
 * funcion para eleiminar un dircetor de una pelicula
 * @param idDirectorOfMovie id del registro de la tabla DirectorsOfMovies
 * @returns  un DirectorToMovieType con la informacion eliminada recien  o un errortype con el error
 */
export const deleteDirector=async(idDirectorOfMovie:number):Promise<DirectorToMovieType|ErrorType>=>{
   try{
    const result=await db.directorsOfMovies.delete({
        where:{
            idDirectorOfMovie:idDirectorOfMovie
        },
        select:{
            idDirector:true,
            idMovie:true,
            idDirectorOfMovie:true,
            created_at:true
        
        }
        })

        return {
            idDirector:result.idDirector,
            idMovie:result.idMovie,
            idDkirectorOfMovie:result.idDirectorOfMovie,
            created_at_movie:result.created_at
        }
    


   }catch(e:any){
       return errorMesagge("Erro al eliminar un registro en la tabla DirectorsOfMovies",e.message,500)
   }
}
