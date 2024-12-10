-- CREATION OF TABLES --

CREATE TABLE "user" (
    userid SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE shelter (
    shelterid SERIAL PRIMARY KEY,
    managed_by INT,
    email VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    postal_code INT NOT NULL,
    photo VARCHAR(255),
    "status" VARCHAR(9) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected'))
);

CREATE TABLE pet (
    petid SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    race VARCHAR(70),
    shelterid INT NOT NULL,
    type VARCHAR(255),
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Unknown')),
    age INT,
    date_added TIMESTAMP,
    photo VARCHAR(255),
    FOREIGN KEY (shelterid) REFERENCES shelter(shelterid) ON DELETE CASCADE
);

CREATE TABLE pet_behavior (
    petid INT,
    userid INT,
    behaviorid SERIAL PRIMARY KEY,
    behavior VARCHAR(255),
    FOREIGN KEY (petid) REFERENCES pet(petid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES "user"(userid) ON DELETE CASCADE
);

CREATE TABLE moderator (
    modid SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE favorite (
    petid INT,
    userid INT,
    PRIMARY KEY (petid, userid),
    FOREIGN KEY (petid) REFERENCES pet(petid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES "user"(userid) ON DELETE CASCADE
);


-- MOCK DATA --
--
INSERT INTO "user" (email, username, "password") VALUES 
('user1@gmail.com', 'user1', 'password1'),
('user2@gmail.com', 'user2', 'password2');
-- Mock data for the moderator table
INSERT INTO moderator (email, username, "password") VALUES
('moderator@gmail.com', 'moderator', '$2b$10$LBtK0B0.PEIhnbC5jTiGPuByCvtLQFFvmSERAmSZrxErlldZhF5Wq'),
('moderator2@gmail.com', 'moderator2', '$2b$10$EFtxG8UcLBwbLI9yyrD3c.fABrO3yBHCXj4NUwytZuUIWunqmH50S');

-- Mock data for the shelter table
INSERT INTO shelter (email, managed_by, "name", "password", "address", city, postal_code, "status", photo) VALUES
('shelter1@example.com', 1, 'Sunny Shelter', 'password_1', '123 Street, City', 'Copenhagen', '1000', 'Approved', './assets/shelter1.jpg'),
('shelter2@example.com', 1, 'Happy Tails', 'password_2', '456 Avenue, City', 'Aarhus', '2000', 'Pending','./assets/shelter2.jpg'),
('shelter3@example.com', 1, 'Furry Friends', 'password_3', '789 Road, City', 'Odense', '3000', 'Approved', './assets/shelter1.jpg'),
('shelter4@example.com', 1, 'Paws Place', 'password_4', '101 Blvd, City', 'Aalborg', '4000', 'Rejected','./assets/shelter2.jpg'),
('shelter5@example.com', 1, 'Animal Haven', 'password_5', '202 Lane, City', 'Esbjerg', '5000', 'Approved', './assets/shelter1.jpg');


-- Mock data for the pet table
INSERT INTO pet (shelterid, "name", type, race, gender, age, date_added, photo) VALUES
-- Pets for Shelter 1
(1, 'Snowball', 'cat', 'Smart', 'Male', 2, '2024-06-01 10:00:00', './assets/pets/snowball.jpg'),
(1, 'Mittens', 'cat', 'Curious', 'Male', 1, '2024-07-15 11:30:00', './assets/pets/kocurek.jpg'), 
(1, 'Ryszard', 'parrot', 'Sociable', 'Male', 3, '2024-08-20 12:00:00', './assets/pets/ryszard.jpg'), 
(1, 'Whiskers', 'cat', 'Calm', 'Male', 1, '2024-09-05 14:00:00', './assets/pets/koteczka.jpg'), 
(1, 'Maciej', 'dog', 'Elegant', 'Male', 5, '2024-10-10 15:15:00', './assets/pets/maciej.jpg'), 
(1, 'Sadie', 'dog', 'Fearful', 'Female', 3, '2024-11-20 16:00:00', './assets/pets/tomasz.jpg'), 


-- Pets for Shelter 2
(2, 'Jumbo', 'hedgehog', 'Playful', 'Male', 2, '2024-12-10 19:30:00', './assets/pets/jumbo.jpg'),
(2, 'Tiger', 'cat', 'Male', 'Male', 1, '2024-12-05 18:00:00', './assets/pets/kocurek2.jpg'), 
(2, 'Lily', 'cat', 'Cautious', 'Female', 1, '2024-12-08 19:00:00', './assets/pets/koteczka2.jpg'),


-- Pets for Shelter 3
(3, 'Bailey', 'dog','Shih Tzu', 'Unknown', 4, '2024-11-01 18:15:00','./assets/kitty1.jpg'),
(3, 'Lily', 'cat','Persian Cat', 'Female', 6, '2024-12-01 19:30:00','./assets/kitty1.jpg'),


-- Pets for Shelter 4
(4, 'Mittens', 'cat','Maine Coon', 'Male', 5, '2024-04-25 11:45:00','./assets/kitty1.jpg'),
(4, 'Shadow', 'dog','Husky', 'Female', 6, '2024-05-30 12:00:00','./assets/kitty1.jpg'),


-- Pets for Shelter 5
(5, 'Oliver', 'dog','British Shorthair', 'Unknown', 7, '2024-09-15 16:00:00','./assets/kitty1.jpg'),
(5, 'Sadie', 'dog','Great Dane', 'Female', 4, '2024-10-10 17:30:00','./assets/kitty1.jpg'),



-- Mock data for the behavior table
INSERT INTO pet_behavior (petid, behavior) VALUES
(1, 'Playful'),
(2, 'Aggressive'),
(3, 'Friendly'),
(4, 'Shy'),
(5, 'Curious'),
(6, 'Loyal'),
(7, 'Energetic'),
(8, 'Independent'),
(9, 'Calm'),
(10, 'Protective'),
(11, 'Affectionate'),
(12, 'Gentle'),
(13, 'Playful'),
(14, 'Alert'),
(15, 'Lively'),
(16, 'Curious'),
(17, 'Relaxed'),
(18, 'Loyal'),
(19, 'Obedient'),
(20, 'Sociable'),
(21, 'Adventurous'),
(22, 'Calm'),
(23, 'Reserved'),
(24, 'Cuddly'),
(25, 'Active');