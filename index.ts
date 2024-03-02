import { ApolloServer } from "@apollo/server"
import "dotenv/config"
import { typeDefs } from "./src/GraphQl/schema"
import { resolvers } from "./src/GraphQl/resolvers"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express ,{ Express } from "express"
import { createServer } from "http"
import {useServer} from "graphql-ws/lib/use/ws"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from "ws"
import cors from "cors"
import bodyParser from "body-parser"
import { expressMiddleware } from "@apollo/server/express4"
import assertEnvVar from "./src/utils/assertEnvVar"
import { obtnertoken } from "./src/middlewares"



( async function () {
    // Server code in here!
   // Publish and Subscribe, Publish -> everyone gets to hear it
    const app = express();
    const httpServer = createServer(app);

 

    const schema = makeExecutableSchema({typeDefs, resolvers});

    // ws Server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql" // localhost:3000/graphql
    });

    const serverCleanup = useServer({ schema }, wsServer); // dispose

    // apollo server
    const server = new ApolloServer({
            
        schema,
        
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
        
    });

    // start our server
    await server.start();

    // apply middlewares (cors, expressmiddlewares)
    app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server,
        {
            context:async({req})=>{
               const token=req.headers["token"]
               try{
              
                const user=await obtnertoken(token as string)
                  
                return user

               }catch(e:any){
                   console.log(e.message)
                   return {}
               }
            }
        }));

    // http server start
    httpServer.listen(assertEnvVar("PORT"), () => {
        console.log("Server running on http://localhost:" + "4000" + "/graphql");
    });

})();





