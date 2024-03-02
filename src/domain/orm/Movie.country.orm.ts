import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"
import { CastType } from "../../controller/types/CastType"
import { DirectorToMovieType } from "../../controller/types/DirectorType"
import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"
import {CountryMovieType}  from "../../controller/types/CountryMovieType"
import { PaginationType } from "../../controller/types/PaginationType"

/**
 * funcion para agregar un pais a una pelicula
 * @param countryMovie implementa el tipo de dato CountryMovieType que es un objeto con los campos idCountry, idMovie
 * @returns un CountryMovieType con la informacion agregada recien  o un errortype con el erro
 */
export const addCountrysMovie=async(countryMovie:CountryMovieType):Promise<CountryMovieType>=>{
 try{
        const result=await db.countryOfMovieWh.create({
            data:{
                idCountry:countryMovie.idCountry||2,
                idMovie:countryMovie.idMovie
            },
            select:{
                idCountryOfMovie:true,
                idMovie:true,
                idCountry:true,
                created_at:true,
                country:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return {
            idCountryOfMovie:result.idCountryOfMovie,
            idMovie:result.idMovie,
            idCountry:result.idCountry,
            created_at:result.created_at,
            name:result.country.name
        }

 }catch(e:any){
       throw new Error(e.message)
 }
}


export const getCountrysMovie=async(idMovie:number,page ?:number,limit?:number):Promise<Array<any>|PaginationType>=>{
    try{
        if(page && limit){

            const skip=(page-1)*limit
            const totalCountry:number=await db.countryOfMovieWh.count({
                where:{
                    idMovie:idMovie
                }
            })
            const totalpages=Math.ceil(totalCountry/limit)
            const result=await db.countryOfMovieWh.findMany({
                skip:skip,
                take:limit,
                where:{
                    idMovie:idMovie
                },
                select:{
                    idCountryOfMovie:true,
                    idMovie:true,
                    idCountry:true,
                    created_at:true,
                    country:{
                        select:{
                            idCountry:true,
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
                currentPage:page
            }
        }
        const result=await db.countryOfMovieWh.findMany({
            where:{
                idMovie:idMovie
            },
            select:{
                idCountryOfMovie:true,
                idMovie:true,
                idCountry:true,
                created_at:true,
                country:{
                    select:{
                        idCountry:true,
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

export const deleteCountryOfMovie=async(idCountryOfMovie:number):Promise<CountryMovieType>=>{
    try{

        const result=await db.countryOfMovieWh.delete({
            where:{
                idCountryOfMovie:idCountryOfMovie
            },
            select:{
                idCountryOfMovie:true,
                idMovie:true,
                idCountry:true,
                created_at:true,
                country:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return {
            idCountryOfMovie:result.idCountryOfMovie,
            idMovie:result.idMovie,
            idCountry:result.idCountry,
            created_at:result.created_at,
            name:result.country.name
        }

    }catch(e:any){
        throw new Error(e.message)
    }
}

