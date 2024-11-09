import app from "./config/server";
import client from "./config/database";
import petRoutes from "./routes/PetRoutes";
import shelterRoutes from "./routes/ShelterRoutes";

const port = process.env.PORT || 3000;

// server setup
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// Database connection
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err.stack));


// Pets
app.use(petRoutes);

// Shelters
app.use(shelterRoutes);