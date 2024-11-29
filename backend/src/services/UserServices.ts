//file responsible for business logic and interaction with database
//is bridge between controllers (http) and models (database tables)
//contains user related actions: register, auth, update profiles
import { PetBehavior, User } from "../models/associations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";

class UserService {
  public static async getAllUsers(): Promise<User[]> { //fetching users from database
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching Users:", error);
      throw error;
    }
  }

  public static async createUser( //creates new user with following parameters
    username: string,
    email: string,
    password: string,
    preferences: string[]
  ): Promise<string> {
    try {
      //hash the password before saving
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log("Creating user with username:", username);
      const newUser = await User.create( //new user is created
        {
          username: username,
          email: email,
          password: hashedPassword, //hashed password is stored
          preferences: preferences.map((behavior) => ({ behavior })),
        },
        {
          include: [{ model: PetBehavior, as: "preferences" }],
        }
      );
      console.log("User created:", email);
      console.log("Preferences added to user:", email, preferences);
      return newUser.generateToken(); //jwt token generated once user created
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  //get user by id
  public static async getUserById(userid: number): Promise<User | null> {
  try {
    const user = await User.findOne({where: {userid}});
    return user;
  } catch (error) {
    console.error("Error fetching user by ID", error);
    throw error;
    }
  }
  //allow update user info
  public static async updateUser(
    userid: number,
    username: string,
    email: string,
    password: string,
    preferences: string[],
    updatedData: Partial<User>
  ): Promise<User | null> {
    try {
      const user = await User.findOne({where: {userid, username, email, password, preferences}});
      if (!user) return null;

      await user.update(updatedData);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  //login user
  public static async loginUser(email: string, password: string): Promise<String>  {
    try{ 
      //check if exists by username  and password?
      const user = await User.findOne({ where: {email}});
      if(!user){
        throw new Error("User not found");
      }
    //compare hashed passwords
      const isPasswordValid = await bcrypt.compare(password, user.getPassword());
      if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    console.log("User is logged in:", email);
    return user.generateToken();
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
    }
  }
  //user logout

}

export default UserService;
