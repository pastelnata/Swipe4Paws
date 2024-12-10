import app from "./config/server";
import client from "./config/database";
import petRoutes from "./routes/PetRoutes";
import shelterRoutes from "./routes/ShelterRoutes";
import userRoutes from "./routes/UserRoutes";
import modRoutes from "./routes/ModRoutes";
import favoriteRoutes from "./routes/FavoriteRoutes";
//sets the port for the server to listen on
const port = process.env.PORT || 3000;

// server setup
app.get('/', (req, res) => {
  res.send('Hello from the backend!'); //health check for backed server
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); //check terminal if the server has started successfully
});


// Database connection
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err.stack));


// Pets
app.use('/pets', petRoutes);

// Shelters
app.use('/shelters', shelterRoutes);

// Users
app.use('/users', userRoutes);

// Moderators
app.use('/mods', modRoutes);

// Favorites
app.use('/favorites', favoriteRoutes)