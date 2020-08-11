import express from "express";
import ClassesController from "./controllers/classesControlers";
import ConnectionController from "./controllers/connectionsController";

const routes = express.Router();

const classesControllers = new ClassesController();
const connectionsController = new ConnectionController();

routes.post("/classes", classesControllers.create);
routes.get("/classes", classesControllers.index);
routes.get("/classes/filter", classesControllers.show);
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;
