import express, { Router } from 'express';
import path from 'path';


interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor( options: Options){
        const { port, routes,  public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }


    async start() {

        // Middlewares, una funcion q se ejecuta cuando una petición pase x ahi
        this.app.use( express.json() ); // Serializa el body como un json, para la peticion
        this.app.use( express.urlencoded( { extended: true } )); // para peticion urlencoded

        // Public Folder
        this.app.use( express.static( this.public_path ) );


        // Routes
        this.app.use( this.routes );


        // * SPA: cualquier ruta no definida pasa por aqui
        this.app.get(/.*/, (req, res) => {
            const indexPath = path.join( __dirname + `../../../${ this.public_path }/index.html` );
            res.sendFile( indexPath );
            return;
        })



        this.app.listen(3000, () => {
            console.log(`Server Running on Port ${ this.port }`);
        });
        
    }
    
}