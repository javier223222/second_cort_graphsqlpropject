
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.movie.create({
        data:{
            title:"The Godfather",
            year:new Date("1972-03-24"),
            slogan:"An offer you can't refuse",
            description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            duration:175,
            lenguageOfMovie:{
                create:{
                    lenguage:{
                        create:{
                            name:"English"
                        }
                    }
                }
            },
            anotherLenguageOfMovie:{
                create:{
                    lenguage:{
                        create:{
                            "name":"Latin"
                        }
                    }
                }
            },
            movieStudios:{
                create:{
                    studio:{
                        create:{
                            name:"Paramount",
                        }
                    }
                }
            },
            movieAlternantiveTittle:{
                create:{
                   alternantiveTittle:{
                    create:{
                       name:"Le Parrain 1" 
                    }
                   } 
                }
            },
            countryOfMovieWh:{
                create:{
                    country:{
                        create:{
                           name: "USA"
                        }
                    }
                }
            },
            cast:{
                create:{
                    actor:{
                        create:{
                            name:"Marlon",
                            lastName:"Brando jr",
                            description:"was an American actor",
                            ImageOfActor:{
                                create:{
                                    urlImage:"https://image.tmdb.org/t/p/w342/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg",
                                    public_id:"fuTEPMsBtV1zE98ujPONbKiYDc2"
                                }
                            }
                        }
                    }
                }
            },
            directroOfMovie:{
                create:{
                    director:{
                        create:{
                            name:"Francis Ford",
                            lastName:"Coppola",
                            description:" is an American film director, producer",
                            DirectorOfImage:{

                                create:{
                                    urlImage:"https://image.tmdb.org/t/p/w342/3Pblihd6KjXliie9vj4iQJwbNPU.jpg",
                                    public_id:"3Pblihd6KjXliie9vj4iQJwbNPU"
                                }
                            }
                        }
                    }
                }
            },
            crewofMovie:{
                create:{
                    type:"ORIGINAL WRITER",
                    crewOfPeople:{
                        create:{
                          name:"Mario",
                          lastName:"Puzo",
                        }
                    }
                }
            },
            generoOfMovie:{
                create:{
                    genero:{
                        create:{
                            name:"Crime"
                        }
                    }
                }
            },
            themOfMovie:{
                create:{
                    temas:{
                        create:{
                            name:"Crime, Drugs And Gangsters"
                        }
                    }
                }
            },
            releases:{
                create:{
                    dateOfRealeses:new Date("1972-03-24"),
                    place:"no specified",
                    clasification:"no",
                    type:"no specified",
                    country:{
                        create:{
                            name:"Japan"
                        }
                    }
                }
            },
            imageOfMovie:{
                create:{
                   urlImage:"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" ,
                   public_id:"MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                   typeOfImage:"poster"
                }
            },
            whereWatch:{
                create:{
                    name:"Amazon US",
                    link:"https://www.amazon.com/gp/video/detail/0NZP0QITBHVQGTRES3BH7Y5VW6/ref=atv_dl_rdr?tag=justusqxg9-20",
                    imageservice:"https://exitosempresariales.es/wp-content/uploads/2016/09/amazon.jpg"
                }
            }

        
        },

        

        
    })
    
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })