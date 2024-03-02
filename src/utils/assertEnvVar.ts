import "dotenv/config";

const assertEnvVar= ( envVarName: string): string | undefined=> {
     const envVarValue = process.env[envVarName];
     return envVarValue 
}
export default assertEnvVar;