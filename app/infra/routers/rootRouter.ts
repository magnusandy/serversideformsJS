import {Router, Request, Response, RequestHandler} from "express";
import * as api from "../../api/rootApi";

const router: Router = Router();

router.get("/", stringRes((req: Request, res: Response) => 
    api.greet()
));

router.get("/:name", stringRes((req, res) => 
    api.greetName(req.params.name)
))

function stringRes(stringRequestHandler: (req: Request, res: Response) => string): RequestHandler {
    return (req, res) => res.send(stringRequestHandler(req, res));
}

export const rootRouter: Router = router;