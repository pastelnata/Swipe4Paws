import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const token = await UserService.createUser(username, email, password);
      console.log("token:", token);
      res.json(token);
    } catch (error) {
      console.error("Error creating user:", error);
      res.json("Error creating user");
    }
  }
}

export default UserController;
