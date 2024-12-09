import { Request, Response } from "express";
import UserService from "../services/UserServices";
import ShelterService from "../services/ShelterServices";
import ModeratorService from "../services/ModeratorService";

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users); //send 200ok status with user data
    } catch (error) {
      console.error("Error fetching Users:", error);
      res.status(500).json({ message: "Error fetching users" }); //send 500status error message
    }
  }

  //create a new user
  public async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, preferences } = req.body;
      const token = await UserService.createUser(
        username,
        email,
        password,
        preferences
      );
      console.log("token:", token);
      console.log(preferences);
      console.log('token (controller)', token);
      res.json({token});
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json("Error creating user");
    }
  }
  //login a user
  public async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body; // Extract credentials from request
      console.log("Login request received for:", email);

      let token: String;
      try {
        token = await UserService.loginUser(email, password);
      } catch (userError) {
        console.log("User login failed, trying ShelterService...");
        try {
          token = await ShelterService.loginShelter(email, password);
        } catch (shelterError) {
          console.log("Shelter login failed..."); 
          try {
            token = await ModeratorService.loginModerator(email, password);
          } catch (moderatorError) {
            console.log("Moderator login failed...");

            throw new Error("Invalid email or password");
          }
        }
      }
      console.log(token);

      res.status(200).json({ token: token }); // Respond with user data (e.g., token)
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Error logging in user" });
    }
  }
  //logout a user
  // public logoutUser(req: Request, res: Response): void {
  //   res
  //     .status(200)
  //     .json({
  //       message:
  //         "Successfully logged out. Please remove your token from the client.",
  //     });
  //}
}

export default UserController;
