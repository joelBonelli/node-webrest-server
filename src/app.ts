import { Router } from "express";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";



( async() => {
    main();
})();


function main() {
    
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
        public_path: envs.PUBLIC_PATH,
    });

    
    server.start();
    
}





