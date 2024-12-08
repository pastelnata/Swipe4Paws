import { PetBehavior, User } from "../models/associations";

class UserService {
  //public static async getAllUsers(): Promise<User[]> {
   // try {
      //const users = await User.findAll();
      //return users;
   // } catch (error) {
     // console.error("Error fetching Users:", error);
     // throw error;
    }
 // }

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
      console.log("User created:", email);
      console.log("Preferences added to user:", email, preferences);
      return newUser.generateToken();
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
            console.log('User is not found');
        }
        return user;
    }
    catch(error){
        console.error("Error in the loginUser,", error)
        throw(error)
    }
  }
}
  //public static async createUser(
   // username: string,
   // email: string,
   // password: string,
   // preferences: string[]
 // ): Promise<string> {
   // try {
      //console.log("Creating user with username:", username);
     // const newUser = await User.create(
       // {
         // username: username,
         // email: email,
         // password: password,
          //preferences: preferences.map((behavior) => ({ behavior })),
       // },
       // {
        //  include: [{ model: PetBehavior, as: "preferences" }],
       // }
     // );
     // console.log("User created:", email);
     // console.log("Preferences added to user:", email, preferences);
      //return newUser.generateToken();
   // } catch (error) {
   //   console.error("Error creating user:", error);
    //  throw error;
   // }
 // }
  //check if users credentials are correct
 // static async loginUser(username: string, password: string) {
    //try {
      //const user = await User.findOne( { where: { username, password } } );
      //if (user) {
        //console.log('User is logged in:', user.username);
       // return user.generateToken(); // Generate token for User
      //}
  
      // Check for Moderator
      //const moderator = await Moderator.findOne({ where: { username, password } });
      //if (moderator) {
        //console.log('Moderator is logged in:', moderator.username);
        //return moderator.generateToken(); // Generate token for Moderator
     // }
  
      // Check for Shelter
      //const shelter = await Shelter.findOne({ where: { username, password } });
      //if (shelter) {
        //console.log('Shelter is logged in:', shelter.name);
        //return shelter.generateToken(); // Generate token for Shelter
     // }
  
      // If no match found, return null
      //console.log('Invalid credentials or user does not exist');
      //return null;
  
   // } catch (error) {
      //console.error("Error in loginUser:", error);
     // throw error; // Re-throw error for the caller to handle
   // }
  //}
    // if (username === 'testuser' && password === 'password123') {
    //   // Mocking a user data and token (you can replace this with real token generation later)
    //   const mockUserData = {
    //     username: 'testuser',
    //     email: 'testuser@example.com',
    //     preferences: { theme: 'dark' },
    //     token: 'fake-jwt-token' // Fake token for now
    //   };
    //   return mockUserData;  // Return the mock user data
    // } else {
    //   return null;  // Simulate invalid credentials
    // }
    
  //}


export default UserService;
