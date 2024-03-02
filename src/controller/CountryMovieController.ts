import { createCountry, findCountry } from "../domain/orm/Country.orm";
import { addCountrysMovie, deleteCountryOfMovie, getCountrysMovie } from "../domain/orm/Movie.country.orm";
import { ICountryController } from "./interfaces";
import { CountryMovieType } from "./types/CountryMovieType";
import { PaginationType } from "./types/PaginationType";

export default class CountryMovieController implements ICountryController{
 public async   getCountryOfMovie(idMovie: number, page?: number | undefined, limit?: number | undefined): Promise<any[] | PaginationType> {
      try{
        let result:PaginationType|any[]
        if(page && limit){
            result= await getCountrysMovie(idMovie,page,limit)
            return result as PaginationType
        }

        result= await getCountrysMovie(idMovie)
        return result as any[]

      }catch(e:any){
            throw new Error(e.message)
      }
  }
  public async addCountryofMovie(movieCountry: CountryMovieType): Promise<CountryMovieType> {
      try{
         const find=await findCountry(movieCountry.name?.toLocaleLowerCase()||"d")
         let result:CountryMovieType;
         if(find){
          result=await addCountrysMovie({
            idCountry:find.idCountry||2,
            idMovie:movieCountry.idMovie,

          })
          return result
         }

        const create=await createCountry({
          name:movieCountry.name||"d"
        })

        result=await addCountrysMovie({
          idMovie:movieCountry.idMovie,
          idCountry:create.idCountry||2
        })
        return result

      }catch(e:any){
        throw new Error(e.message)
      }
  }
 public async  deleteCountry(idCountry: number): Promise<CountryMovieType> {
      try{
        const result=await deleteCountryOfMovie(idCountry) 
        return result
      }catch(e:any){
        throw new Error(e.message)
      }
  }
    
}