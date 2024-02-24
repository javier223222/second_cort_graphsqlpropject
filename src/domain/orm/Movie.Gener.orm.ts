
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"



/**
 * 
 * funcion para agregar un genero a una pelicula
 * @param generIn implementa el tipo de dato GenerOfMovieType que es un objeto con los campos idGener y idMovie
 * @returns un GenerOfMovieType con la informacion agregada recien  o un errortype con el erro
 */
export const addGenerOfMovie = async(generIn:GenerOfMovieType):Promise<GenerOfMovieType|ErrorType>=>{
    try{

        const result=await db.generoOfMovie.create({
            data:{
                idGenero:generIn.idGener,
                idMovie:generIn.idMovie
            },
            select:{
                idGenero:true,
                idMovie:true,
                idGeneroOfMovie:true,
                created_at:true
            }
        })

        return {
            idGener:result.idGenero,
            idMovie:result.idMovie,
            idGenerOfMovie:result.idGeneroOfMovie,
            created_at_movie:result.created_at
        }

    }catch(e:any){
        return errorMesagge("Erro al agregar un nuevo registro en la tabla GenerOfMovie",e.message,500)
        
    }


}


export const getGenerOfMovie=async(idMovie:number):Promise<Array<any>|ErrorType>=>{
    try{
        const result=await db.generoOfMovie.findMany({
            where:{
                idMovie:idMovie
            },
            select:{
                idGenero:true,
                idMovie:true,
                idGeneroOfMovie:true,
                created_at:true
            }
        })
        return result
    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla GenerOfMovie",e.message,500)
    }
}
/**
 * 
 * @param idGenerOfMovie id de la tabla GenerOfMovie
 * @returns un GenerOfMovieType con la informacion de la tabla GenerOfMovie o un errortype con el error
 */
export const  deleteGenerOfMovie=async(idGenerOfMovie:number):Promise<GenerOfMovieType|ErrorType>=>{
   try{
    const result=await db.generoOfMovie.delete({
        where:{
            idGeneroOfMovie:idGenerOfMovie
        },
        select:{
            idGenero:true,
            idMovie:true,
            idGeneroOfMovie:true,
            created_at:true
        }
    })
    return {
        idGener:result.idGenero,
        idMovie:result.idMovie,
        idGenerOfMovie:result.idGeneroOfMovie,
        created_at_movie:result.created_at
    }
         
   }catch(e:any){
         return errorMesagge("Erro al eliminar los registros de la tabla GenerOfMovie",e.message,500)
   }
}