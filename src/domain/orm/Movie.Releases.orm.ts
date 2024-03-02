import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"
import { CastType } from "../../controller/types/CastType"
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { MovieRealesesType } from "../../controller/types/MovieRealesesType"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"
import { PaginationType } from "../../controller/types/PaginationType"
/**
 * funcion para agregar un nuevo registro en la tabla releases
 * @param releMovie implementa el tipo de dato MovieRealesesType que es un objeto con los campos idRealese, idCountry, idMovie, dateRealese, placeRealese, clasification y type
 * @returns  un MovieRealesesType con la informacion agregada recien  o un errortype con el erro
 */
export const addReleaseMovie=async(releMovie:MovieRealesesType):Promise<MovieRealesesType|ErrorType>=>{
    try{
       const result=await db.releases.create({
        data:{
            idMovie:releMovie.idMovie,
            idCountry:releMovie.idCountry,
            dateOfRealeses:releMovie.dateRealese,
            place:releMovie.placeRealese,
            clasification:releMovie.clasification,
            type:releMovie.type
        },
        select:{
            idMovie:true,
            idCountry:true,
            idreleases:true,
            dateOfRealeses:true,
            place:true,
            clasification:true,
            type:true,
            created_at:true
        }
       })

       return {
        idRealese:result.idreleases,
        idCountry:result.idCountry,
        idMovie:result.idMovie,
        dateRealese:result.dateOfRealeses,
        placeRealese:result.place,
        clasification:result.clasification,
        type:result.type||"",
        created_at:result.created_at
       }
    }catch(e:any){
        return errorMesagge("Error in addReleaseMovie",e.message,500)
    }
}

/**
 * 
 * @param idMovie  id de la pelicula
 * @param page el numero de pagina opcional
 * @param limit el limiti de registros opcional
 * @returns se le pasa el parametro page y limit retorna un objeto de tipo PaginationType si no retorna un arreglo con los registros de la tabla releases
 * o si hay un error retorna un objeto de tipo ErrorType
 */
export const getReleases=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|ErrorType|PaginationType>=>{
  try{
    if(page && limit){
      const skip=(page-1)*limit
      const totalReleases:number=await db.releases.count({
        where:{
          idMovie:idMovie
        }
      })
      const totalpages=Math.ceil(totalReleases/limit)
      const result=await db.releases.findMany({
        skip:skip,
        take:limit,
        where:{
          idMovie:idMovie
        },
        select:{
          idreleases:true,
          idMovie:true,
          idCountry:true,
          dateOfRealeses:true,
          place:true,
          clasification:true,
          type:true,
          created_at:true,
          country:{
            select:{
                name:true
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

   const result=await db.releases.findMany({
     where:{
         idMovie:idMovie
      },
      select:{
          idreleases:true,
          idMovie:true,
          idCountry:true,
          dateOfRealeses:true,
          place:true,
          clasification:true,
          type:true,
          created_at:true,
          country:{
              select:{
                  name:true
              }
          }
      },
      orderBy:{
            created_at:"desc"
      }
     
   })
   return result
  }catch(e:any){
    return errorMesagge("Error in getReleases",e.message,500)
  }
}

/**
 * 
 * @param releMovie implementa el tipo de dato MovieRealesesType que es un objeto con los campos idRealese, idCountry, idMovie, dateRealese, placeRealese, clasification y type
 * @returns  un MovieRealesesType con la informacion actualizada recien  o un errortype con el erro
 */
export const updateReleases=async(releMovie:MovieRealesesType):Promise<MovieRealesesType|ErrorType>=>{
    try{
       const result=await db.releases.update({
        where:{
            idreleases:releMovie.idRealese
        },
        data:{
            idMovie:releMovie.idMovie,
            idCountry:releMovie.idCountry,
            dateOfRealeses:releMovie.dateRealese,
            place:releMovie.placeRealese,
            clasification:releMovie.clasification,
            type:releMovie.type
        },
        select:{
            idMovie:true,
            idCountry:true,
            idreleases:true,
            dateOfRealeses:true,
            place:true,
            clasification:true,
            type:true,
            created_at:true
        }
       })

       return {
        idRealese:result.idreleases,
        idCountry:result.idCountry,
        idMovie:result.idMovie,
        dateRealese:result.dateOfRealeses,
        placeRealese:result.place,
        clasification:result.clasification,
        type:result.type||"",
        created_at:result.created_at
       }
    }catch(e:any){
        return errorMesagge("Error in updateReleases",e.message,500)
    }
}

/**
 * 
 * @param idRealese id de la relacion entre pelicula y realese
 * @returns  un MovieRealesesType con la informacion eliminada recien  o un errortype con el error
 */
export const deleteReleases=async(idRealese:number):Promise<MovieRealesesType|ErrorType>=>{
    try{
       const result=await db.releases.delete({
        where:{
            idreleases:idRealese
        },
        select:{
            idreleases:true,
            idMovie:true,
            idCountry:true,
            dateOfRealeses:true,
            place:true,
            clasification:true,
            type:true,
            created_at:true
        }
       })

       return {
        idRealese:result.idreleases,
        idCountry:result.idCountry,
        idMovie:result.idMovie,
        dateRealese:result.dateOfRealeses,
        placeRealese:result.place,
        clasification:result.clasification,
        type:result.type||"",
        created_at:result.created_at
       }
    }catch(e:any){
        return errorMesagge("Error in deleteReleases",e.message,500)
    }
}