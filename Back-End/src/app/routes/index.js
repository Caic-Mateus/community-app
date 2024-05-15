import { Router } from "express";
const routes = Router();

routes.get("/users", (request,response) =>{
    console.log('GET');
    response.json([{id:1}]);
})

export default routes;