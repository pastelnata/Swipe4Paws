import { PetBehavior, User } from "../models/associations";

class UserService {
  public static async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching Users:", error);
      throw error;
    }
  }

  public static async createUser(
    username: string,
    email: string,
    password: string,
    preferences: string[]
  ): Promise<string> {
    try {
      console.log("Creating user with username:", username);
      const newUser = await User.create(
        {
          username: username,
          email: email,
          password: password,
          preferences: preferences.map((behavior) => ({ behavior })),
        },
        {
          include: [{ model: PetBehavior, as: "preferences" }],
        }
      );
      if(newUser){
        console.log("User created:", email);
        console.log("Preferences added to user:", email, preferences);
        return newUser.generateToken();
      } else return '';
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  //Receive user username and password form frontend and check if credentials are correct
  static async loginUser(username: string, password: string) {
    try{
        const user = await User.findOne({ where: {username, password}});
        if(!user){
            console.log('User not found');
            return;
        }
        return user.generateToken();
    }
    catch(error){
        console.error("Error in the loginUser,", error)
        throw(error)
    }
  }
}

export default UserService;
