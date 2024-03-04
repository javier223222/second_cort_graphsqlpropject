import {ErrorType} from "../types/ErrorType";
import { LoginResponse } from "../types/LoginResponse";
import { MovieTypeExceptions } from "../types/MovieType";
import { PaginationType } from "../types/PaginationType";
import { UserLogin, UserType, userNotSensitive } from "../types/UserType";
import { ActorType } from "../types/ActorType";
import { CountryMovieType } from "../types/CountryMovieType";

export interface IMovieController {
    getMovie(id?:number):Promise<Array<any>|ErrorType|MovieTypeExceptions>
    getActorOfMovie(id:number,page ?:number,limit?:number):Promise<Array<any>|ErrorType|PaginationType>
    updateMovieTittle(movie:MovieTypeExceptions):Promise<MovieTypeExceptions|ErrorType>
    getDirectorsOfMovie(idMovie:number,page ?:number,limit?:number):Promise<Array<any>|PaginationType>
}

export interface IUserController{
    createUser(user:UserType):Promise<userNotSensitive|ErrorType>
  
}

export interface IAuthController{
    login(user:UserLogin):Promise<LoginResponse>
}

export interface IActorController{
   addActor(actor:ActorType,idMovie:number):Promise<ActorType>
   deletActor(idCast:number):Promise<ActorType>

}

export interface ICountryController{
    getCountryOfMovie(idMovie:number,page ?:number,limit?:number):Promise<Array<any>|PaginationType>
    addCountryofMovie(movieCountry:CountryMovieType):Promise<CountryMovieType>
    deleteCountry(idCountry:number):Promise<CountryMovieType>
}

export interface IStudioMovieController{
    getStudiosOfMovies(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|PaginationType>
}

export interface IGenersOfMovieController{
    getGenersOfMovies(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|PaginationType>
}
export interface ITypeEventController{
    addTypeEvent(url:string,idUser:number,type:any[],allType?:boolean):Promise<string>
}