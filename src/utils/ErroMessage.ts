import { ErrorType } from "../controller/types/ErrorType";

export const errorMesagge=(message:string,error:string,status:number):ErrorType=>{
    return {
        message:message,
        error:error,
        status:status
    }
}