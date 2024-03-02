import { db } from "../repositories/mysql.repo";
import CountryType from "../../controller/types/CountryType";
export const createCountry=async(country:CountryType):Promise<CountryType>=>{
    try{
        const result=await db.countries.create({
            data:{
                name:country.name
            },
            select:{
                idCountry:true,
                name:true
            }
        })
        return {
            idCountry:result.idCountry,
            name:result.name
        }
    }catch(e:any){
        throw new Error(e.message)
    }

}


export const findCountry=async(name:string):Promise<CountryType|null>=>{
    try{
      const result=await db.countries.findFirst({
        where:{
            name:name
        },
        select:{
            idCountry:true,
            name:true
        }
        
      })
      if(result?.idCountry){
        return result as CountryType
      }
      return null
    }catch(e:any){
        throw new Error(e.message)
    }
}
