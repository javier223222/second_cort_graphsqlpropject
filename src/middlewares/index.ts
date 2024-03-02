import "dotenv/config";
import jwt from "jsonwebtoken";
import assertEnvVar from "../utils/assertEnvVar";


const secret = assertEnvVar("SECRET")||"secret";
export const generateToken = async (payload:any):Promise<string> => {
    return jwt.sign(payload, secret, { expiresIn: "1d" });
}


export const obtnertoken =async (token: string): Promise<any> => {
    let data=null;
   jwt.verify(token, secret, (err, decoded) => {
         if(err){
        
         }else{
              data=decoded
         }
   })
   

    return data;
}

export const verifyTokenApollo = async (context:any): Promise<any> => {
    console.log(context)
    if(context.user && context){
        return context
    }


    throw new Error("No user logged")
}