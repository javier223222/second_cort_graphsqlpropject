import { Actor } from "@prisma/client";
import AuthController from "../../controller/AuthController"
import MovieController from "../../controller/Movie.controller"
import UserController from "../../controller/User.controller"
import { PubSub } from 'graphql-subscriptions';
import { ActorType } from "../../controller/types/ActorType";
import ActorController from "../../controller/ActorController";
import CountryMovieController from "../../controller/CountryMovieController";
import StudioMovieController from "../../controller/StudioMovieController";
import GenerOfMovieController from "../../controller/GenerOfMovieController";
const pubsub = new PubSub();
export const resolvers={
    Query:{
        movies:async(_:void,args:any,context:any)=>{

            if(context.username && context){
                const movie=new MovieController()
                const result=await movie.getMovie()
                return result
            }
            throw new Error("No user logged")
        },
        movie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                const movie=new MovieController()
                const result=await movie.getMovie(parseInt(args.idMovie))
                return result
            }
            throw new Error("No user logged")
        },
        actorOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                const movie=new MovieController()
                const result=await movie.getActorOfMovie(parseInt(args.idMovie))
                return result
          }
          throw new Error("No user logged")
          
        },
        getCurrentLoggedUser:async(_:void,args:any,context:any)=>{

           if(context.username && context){
                 return context
           }
           throw new Error("No user logged")
        },
        users:async(_:void,args:any,context:any)=>{
            
            return [
                {
                    id:1,
                    username:"admin",
                    gmail:"ss"
                }
            ]
        },
        getCountryOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
               try{
                const countryofMovie:CountryMovieController=new CountryMovieController()
                const result=await countryofMovie.getCountryOfMovie(parseInt(args.idMovie))
                return result
               }catch(e:any){
                throw new Error("erro al obtener los paises de la pelicula")
               }
            }
            throw new Error("No user logged")
        },
        getDirectorOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    const movie=new MovieController()
                    const result=await movie.getDirectorsOfMovie(parseInt(args.idMovie))
                   
                    return result
                }catch(e:any){
                    throw new Error("erro al obtener los directores de la pelicula")
                }
            }
            throw new Error("No user logged")
        },
        getStudioOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    const movie=new StudioMovieController()
                    const result=await movie.getStudiosOfMovies(parseInt(args.idMovie))
                    return result
                }catch(e:any){
                    throw new Error("erro al obtener los estudios de la pelicula")
                }
            }
            throw new Error("No user logged")
        },
        getGenerOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    const  generController=new GenerOfMovieController()
                    const result=await generController.getGenersOfMovies(parseInt(args.idMovie))
                    return result
                }catch(e:any){
                    throw new Error("erro al obtener los generos de la pelicula")
                }
            }
            throw new Error("No user logged")
        }


     

        
    },
    Movie:{
        cast:async(parent:any)=>{
          
                const movie=new MovieController()
                const result=await movie.getActorOfMovie(parseInt(parent.idMovie))
                return result
      
          
        },
        country:async(parent:any)=>{
            try{
                const countryofMovie:CountryMovieController=new CountryMovieController()
                const result=await countryofMovie.getCountryOfMovie(parseInt(parent.idMovie))
                return result
            }catch(e:any){
                throw new Error("erro al obtener los paises de la pelicula")
            }
        },
        director:async(parent:any)=>{
            try{
                
                const movie=new MovieController()
                const result=await movie.getDirectorsOfMovie(parseInt(parent.idMovie))
                return result
            }catch(e:any){
                throw new Error("erro al obtener los directores de la pelicula")
            }
        },
        studio:async(parent:any)=>{
            try{
                const movie=new StudioMovieController()
                const result=await movie.getStudiosOfMovies(parseInt(parent.idMovie))
                return result
            }catch(e:any){
                throw new Error("erro al obtener los estudios de la pelicula")
            }
        },
        genero:async(parent:any)=>{
            try{
                const  generController=new GenerOfMovieController()
                const result=await generController.getGenersOfMovies(parseInt(parent.idMovie))
                return result
            }catch(e:any){
                throw new Error("erro al obtener los generos de la pelicula")
            }
        }
    },
    Mutation:{
        updateMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){



                const movie=new MovieController()
                const result=await movie.updateMovieTittle({
                    idMovie:parseInt(args.idMovie),
                    title:args.newtittle
                })
                pubsub.publish("NEW_MOVIE_TITTLE",{newMovieTittle:result })
               
                return result
            }
            throw new Error("No user logged")
        },
        createUser:async(_:void,args:any)=>{
   
                const user=new UserController()
                const result=await user.createUser({
                    username:args.user.username,
                    gmail:args.user.gmail,
                    password:args.user.password
                })
                return result
  
            
           
        },
        login:async(_:void,args:any)=>{
         

                const user=new AuthController()
                const result=await user.login({
                    gmail:args.gmail,
                    password:args.password
                })
                return result
  
           
        },
        createActor:async(_:void,args:any,context:any)=>{
            
            if(context.username && context){
               
               try{
                const actorController=new ActorController()
            
               const result:ActorType=await actorController.addActor({
                lastName:args.actor.lastName || "dd",
                 name:args.actor.name || "dd",
                    description:args.actor.description || "sss",
                    image:args.actor.image || "sss"
               },args.idMovie)
               return result

               }catch(e:any){
                console.log(e.message)
                   throw new Error("Error creating actor")
               }
                
            }
            throw new Error("No user logged")
        
        },
        deletActor:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    console.log(args.idCast)
                    const actorController=new ActorController()
                    const result:ActorType=await actorController.deletActor(args.idCast)
                
                    return result
                }catch(e:any){
                    console.log(e.message)
                    throw new Error("Error deleting actor")
                }
                
            }
            throw new Error("No user logged")
        },
        addCountryOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    const countryofMovie:CountryMovieController=new CountryMovieController()
                    const result=await countryofMovie.addCountryofMovie({
                        idMovie:args.newCountry.idMovie,
                        name:args.newCountry.name
                    })
                  
                    return {
                        ...result,
                        country:{
                            idCountry:result.idCountry,
                            name:result.name,
                        }
                    }
                }catch(e:any){
                    throw new Error("erro al agregar pais ala pelicula")
                }
            }
            throw new Error("No user logged")
        
        },
        deleteCountryOfMovie:async(_:void,args:any,context:any)=>{
            if(context.username && context){
                try{
                    const countryofMovie:CountryMovieController=new CountryMovieController()
                    const result=await countryofMovie.deleteCountry(args.idCountryOfMovie)
                    console.log(result)
                    return {
                        ...result,
                        country:{
                            idCountry:result.idCountry,
                            name:result.name,
                        }
                    }
                }catch(e:any){
                    throw new Error("erro al eliminar pais ala pelicula")
                }
            }
            throw new Error("No user logged")
        }

    },
    Subscription:{
        newMovieTittle:{
            
            subscribe:()=>pubsub.asyncIterator(["NEW_MOVIE_TITTLE"])
        }
    }

}