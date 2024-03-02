
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"

import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"
import {ImageOfMovieType} from "../../controller/types/ImageOfMovieType"
import { PaginationType } from "../../controller/types/PaginationType"

/**
 * funcion para agregar una iamge a la pelicula
 * @param image implementa el tipo de dato ImageOfMovieType que es un objeto con los campos urlImage, idMovie, public_id y typeOfImage
 * @returns  un ImageOfMovieType con la informacion agregada recien  o un errortype con el erro
 */

export const addImageOfMovie = async(image:ImageOfMovieType):Promise<ImageOfMovieType|ErrorType>=>{
   try{
    const result=await db.imageOfMovie.create({
        data:{
            urlImage:image.urlImage,
            idMovie:image.idMovie,
            public_id:image.public_id,
            typeOfImage:image.typeOfImage
        },
        select:{
            idImageOfMovie:true,
            urlImage:true,
            idMovie:true,
            public_id:true,
            typeOfImage:true,
            created_at:true
        
        }
    })
    return {
        idImageOfMovie:result.idImageOfMovie,
        urlImage:result.urlImage,
        idMovie:result.idMovie,
        public_id:result.public_id,
        typeOfImage:result.typeOfImage,
       created_at:result.created_at
    }

   }catch(e:any){
       return errorMesagge("Erro al agregar un nuevo registro en la tabla ImageOfMovie",e.message,500)
   }
}

/**
 * funcion para obtener todas las imagenes de la pelicula
 * @param idMovie id de la pelicula
 * @returns  un array de ImageOfMovieType con la informacion de la tabla ImageOfMovie o un errortype con el error
 */
export const getImagesOfMovie=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|ErrorType|PaginationType>=>{
    try{
        if(page && limit){
            const skip=(page-1)*limit
            const totalImages:number=await db.imageOfMovie.count({
                where:{
                    idMovie:idMovie
                }
            })
            const totalpages=Math.ceil(totalImages/limit)
            const result=await db.imageOfMovie.findMany({
                skip:skip,
                take:limit,
                where:{
                    idMovie:idMovie
                },
                select:{
                    idImageOfMovie:true,
                    urlImage:true,
                    idMovie:true,
                    public_id:true,
                    typeOfImage:true,
                    created_at:true
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
        const result=await db.imageOfMovie.findMany({
            
            where:{
                idMovie:idMovie
            },
            select:{
                idImageOfMovie:true,
                urlImage:true,
                idMovie:true,
                public_id:true,
                typeOfImage:true,
                created_at:true,
                
            },
            orderBy:{
                created_at:"desc"
            }
            
        })
        return result
    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla ImageOfMovie",e.message,500)
    }
}


/**
 * funcion para eliminar actulizar una imagen de una pelicula
 * @param image implementa el tipo de dato ImageOfMovieType que es un objeto con los campos urlImage, idMovie, public_id y typeOfImage
 * @returns  un ImageOfMovieType con la informacion actualizada recien  o un errortype con el erro
 */
export const updateImageOfMovie=async(image:ImageOfMovieType):Promise<ImageOfMovieType|ErrorType>=>{
    try{
        const result=await db.imageOfMovie.update({
            where:{
                idImageOfMovie:image.idImageOfMovie
            },
            data:{
                urlImage:image.urlImage,
                public_id:image.public_id,
                typeOfImage:image.typeOfImage
            },
            select:{
                idImageOfMovie:true,
                urlImage:true,
                idMovie:true,
                public_id:true,
                typeOfImage:true,
                created_at:true
            }
        })
        return {
            idImageOfMovie:result.idImageOfMovie,
            urlImage:result.urlImage,
            idMovie:result.idMovie,
            public_id:result.public_id,
            typeOfImage:result.typeOfImage,
            created_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Erro al actualizar el registro de la tabla ImageOfMovie",e.message,500)
    }
}

/**
 * 
 * @param idImageOfMovie id de la imagen de la pelicula
 * @returns   un ImageOfMovieType con la informacion eliminada recien  o un errortype con el erro
 */
export const deleteImageOfMovie=async(idImageOfMovie:number):Promise<ImageOfMovieType|ErrorType>=>{
   try{

         const result=await db.imageOfMovie.delete({
              where:{
                idImageOfMovie:idImageOfMovie
              },
              select:{
                idImageOfMovie:true,
                urlImage:true,
                idMovie:true,
                public_id:true,
                typeOfImage:true,
                created_at:true
              }
         })
         return {
          idImageOfMovie:result.idImageOfMovie,
          urlImage:result.urlImage,
          idMovie:result.idMovie,
          public_id:result.public_id,
          typeOfImage:result.typeOfImage,
          created_at:result.created_at
     }

   }catch(e:any){
       return errorMesagge("Erro al eliminar el registro de la tabla ImageOfMovie",e.message,500)
   }
}