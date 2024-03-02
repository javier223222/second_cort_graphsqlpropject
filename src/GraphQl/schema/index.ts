export const typeDefs=`
   type Movie{
        idMovie:ID,
        title:String,
       
        slogan:String,
        description:String,
        duration:Int,
        cast:[Cast!],
        country:[CountryOfMovie],
        director:[DirectorOfMovie],
        studio:[StudioOfMovie],
        genero:[GenerOfMovie]
       

   }
   type StudioOfMovie{
      idMovieStudio:ID,
      idMovie:Int,
      idStudio:Int,
      studio:Studio

   }
    type Studio{
      idStudio:ID,
      name:String,
      
    }
   type Cast{
         idCast:ID,
         idMovie:Int,
         idActor:Int,
        
         actor:Actor
   }
 
   type Actor{
       idActor:ID,
       name:String,
       lastName:String,
       
   }

   type DirectorOfMovie{
      idDirectorOfMovie:ID,
      idDirector:Int,
      idMovie:Int,
      director:Director
   }
   type Director{
      idDirector:ID,
      name:String,
      lastName:String,
      
      DirectorOfImage:[DirectorOfImage]
   }
   type DirectorOfImage{
      idDirectorImg:ID,
      urlImage:String
   }

   type user{
            id:ID,
            username:String,
            gmail:String,
            password:String
   }

   type CountryOfMovie{
    idCountryOfMovie:ID,
    idMovie:Int,
    idCountry:Int,
   
    country:Country
   }
   type Country{
    idCountry:ID,
    name:String,
   }
    type GenerOfMovie{
      idGeneroOfMovie:ID,
      idGenero:Int,
      idMovie:Int,
      genero:Genero

    }
    type Genero{
      idGenero:ID,
      name:String,
    } 


   type Query{
       movies:[Movie]
       users:[user]
       movie(idMovie:ID):Movie
       actorOfMovie(idMovie:ID):[Cast]
       getCurrentLoggedUser(token:String):User
       getCountryOfMovie(idMovie:ID):[CountryOfMovie],
       getDirectorOfMovie(idMovie:ID):[DirectorOfMovie],
       getStudioOfMovie(idMovie:ID):[StudioOfMovie],
       getGenerOfMovie(idMovie:ID):[GenerOfMovie]

       
     
   }
   input UserInput{
    
    username:String,
    gmail:String!,
    password:String,



   }
   type User{
         
         username:String,
         gmail:String,
       
    
   }
   type LoginRes {
      message:String,
      token:String,
      status:Int
   }
    input newActor{
        name:String,
        lastName:String,
        description:String,
        image:String
    }

    input NewCountry{
      name:String,
      idMovie:Int
    }

   type Mutation{
         updateMovie(idMovie:ID,newtittle:String):Movie,
         createUser(user:UserInput):User,
         login(gmail:String,password:String):LoginRes,
         createActor(idMovie:Int,actor:newActor):Actor,
         deletActor(idCast:Int):Actor,
         addCountryOfMovie(newCountry:NewCountry):CountryOfMovie,
         deleteCountryOfMovie(idCountryOfMovie:Int):CountryOfMovie





   }
   type NewTittle{
            idmovie:Int,
            title:String
   }

   type Subscription{
           newMovieTittle:Movie
             
     }


`