// sirve para cargar automáticamente las variables de entorno definidas en un archivo .env a process.env al iniciar tu aplicación
import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

}