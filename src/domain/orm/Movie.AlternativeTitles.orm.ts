import { AlternativeTittleType } from "../../controller/types/AlternativeTittleType"
import { errorMesagge } from "../../utils/ErroMessage"
import { ErrorType } from "../../controller/types/ErrorType"
import { db } from "../repositories/mysql.repo"

/**
 * funcion para agregar un titulo alternativo a la pelicula
 * @param alternativeTitle implementa el tipo de dato AlternativeTittleType que es un objeto con los campos idMovie y idAlternativeTittle
 * @returns un AlternativeTittleType con la informacion agregada recien  o un errortype con el error
 */
export const addAlternativeMovieOfMovie = async(alternativeTitle:AlternativeTittleType):Promise<AlternativeTittleType|ErrorType>=>{
    try{

        const result=await db.movieAlternantiveTittle.create({
            data:{
                idMovie:alternativeTitle.idMovie,
                idAlternantiveTittle:alternativeTitle.idAlternativeTittle

            },
            select:{
                idMovie:true,
                idAlternantiveTittle:true,
                idMovieAlternantiveTittle:true,
                created_at:true


            }
        })
        return {
            idMovie:result.idMovie,
            idAlternativeTittle:result.idAlternantiveTittle,
            idAlternativeTittleOfMovie:result.idMovieAlternantiveTittle,
            created_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Erro al agregar un nuevo registro en la tabla AnotherLenguages",e.message,500)
    }
}

/**
 * funcion par obtener todas las peliculas con sus titulos alternativos
 * @param idMovie id de la pelicula
 * @returns   un array de AlternativeTittleType con la informacion de la tabla AnotherLenguages o un errortype con el error
 */
export const getAnotherLenguages=async(idMovie:number):Promise<Array<any>|ErrorType>=>{
    try{
            const result=await db.movieAlternantiveTittle.findMany({
                  where:{
                 idMovie:idMovie
                  },
                  select:{
                 idMovie:true,
                 idAlternantiveTittle:true,
                 idMovieAlternantiveTittle:true,
                 created_at:true
                  }
            })
            return result
     }catch(e:any){
          return errorMesagge("Erro al obtener los registros de la tabla AnotherLenguages",e.message,500)
     }
}
/**
 * funcion para eliminar un titulo alternativo de la pelicula
 * @param idMovies  id de la pelicula
 * @param idAlternativeTittle  id del titulo alternativo
 * @returns  un AlternativeTittleType con la informacion eliminada recien  o un errortype con el error
 */
export const deleteAlternativeMovieOfMovie=async(idMovies:number,idAlternativeTittle:number):Promise<AlternativeTittleType|ErrorType>=>{
    try{
      const result= await db.movieAlternantiveTittle.deleteMany({
       where:{
              idMovie:idMovies,
              idAlternantiveTittle:idAlternativeTittle
         
       },
    
       })

         return {
          idMovie:idMovies,
          idAlternativeTittle:idAlternativeTittle
        
        }
    

   

    }catch(e:any){
        return errorMesagge("Erro al eliminar un registro en la tabla AnotherLenguages",e.message,500)
    }
}

