import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"
import { CastType } from "../../controller/types/CastType"
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"


/**
 * funcion  para agregar un lenguage a una pelicula
 * @param lenguages  implementa el tipo de dato AnotherLenguagesType que es un objeto con los campos idLenguage y idMovie
 * @returns  un AnotherLenguagesType con la informacion agregada recien  o un errortype con el erro
 */

export const addLenguages=async(lenguages:AnotherLenguagesType):Promise<AnotherLenguagesType|ErrorType>=>{
    try{
        const result=await db.lenguageOfMovie.create({
            data:{
                idLenguage:lenguages.idLenguage,
                idMovie:lenguages.idMovie
            },
            select:{
                idLenguage:true,
                idMovie:true,
                idLenguageOfMovie:true,
                created_at:true
            }
        })
        return {
             idLenguage:result.idLenguage,
            idMovie:result.idMovie,
            idAnotherLenguages:result.idLenguageOfMovie,
            created_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Erro al agregar un nuevo registro en la tabla Lenguages",e.message,500)
    }
}

/**
 * obtener todos los lenguajes de la pelicula
 * @param idMovie id de la pelicula
 * 
 * @returns  un array de AnotherLenguagesType con la informacion de la tabla Lenguages o un errortype con el error
 */

export const getLenguages=async(idMovie:number):Promise<Array<any>|ErrorType>=>{
    try{

        const result=await db.lenguageOfMovie.findMany({
            where:{
                idMovie:idMovie
            },
            select:{
                idLenguage:true,
                idMovie:true,
                idLenguageOfMovie:true,
                created_at:true
            }
        })
        return result

    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla Lenguages",e.message,500)
    }
}

export const deleteLenguage=async(idLenguageOfMovie:number):Promise<AnotherLenguagesType|ErrorType>=>{
    try{
        const result=await db.lenguageOfMovie.delete({
            where:{
                idLenguageOfMovie:idLenguageOfMovie
            },
            select:{
                idLenguage:true,
                idMovie:true,
                idLenguageOfMovie:true,
                created_at:true
            }
        })
        return {
            idLenguage:result.idLenguage,
            idMovie:result.idMovie,
            idAnotherLenguages:result.idLenguageOfMovie,
            created_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Erro al eliminar un registro en la tabla Lenguages",e.message,500)
    }
}