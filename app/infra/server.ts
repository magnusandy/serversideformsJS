import express from "express";
import {rootRouter} from "./routers/rootRouter"
import {Optional} from "java8script";


const app: express.Application = express();
const port: number = Optional.ofNullable(process.env.PORT)
                             .map(parseInt)
                             .orElse(3000);
app.use('/', rootRouter);
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
})                               
