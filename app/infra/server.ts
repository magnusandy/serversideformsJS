import express from "express";
import { rootRouter } from "./routers/rootRouter"
import { Optional } from "java8script";


const port: number = Optional.ofNullable(process.env.PORT)
    .map(parseInt)
    .orElse(3000);
express()
    .use('/', rootRouter)
    .listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });                               
