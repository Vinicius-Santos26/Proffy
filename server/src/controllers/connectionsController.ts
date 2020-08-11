import { Request, Response } from "express";
import dataBase from "../database/connection";
export default class ConnectionController {
  async index(request: Request, response: Response){
    const totalConnections = await dataBase('connections').count('* as total')

    const { total } = totalConnections[0]

    return response.json({total});
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await dataBase("connections").insert({
        user_id
    });

    return response.status(201).send();
  }
}
