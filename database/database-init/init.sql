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
    postal_code VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected'))
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

-- Step 2: Create the join table to associate pets with behaviors
CREATE TABLE pet_behavior (
    petid INT NOT NULL,
    behaviorid SERIAL,
    behavior VARCHAR(255),
    PRIMARY KEY (petid, behaviorid),
    FOREIGN KEY (petid) REFERENCES pet(petid) ON DELETE CASCADE
);


CREATE TABLE moderator (
    modid SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
    petid INT,
    userid INT,
    PRIMARY KEY (petid, userid),
    FOREIGN KEY (petid) REFERENCES pet(petid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES "user"(userid) ON DELETE CASCADE
);


-- MOCK DATA --

-- Mock data for the shelter table
INSERT INTO shelter (email, "name", "password", "address", city, postal_code, "status") VALUES
('shelter1@example.com', 'Sunny Shelter', 'password_1', '123 Street, City', 'Copenhagen', '1000', 'Approved'),
('shelter2@example.com', 'Happy Tails', 'password_2', '456 Avenue, City', 'Aarhus', '2000', 'Approved'),
('shelter3@example.com', 'Furry Friends', 'password_3', '789 Road, City', 'Odense', '3000', 'Approved'),
('shelter4@example.com', 'Paws Place', 'password_4', '101 Blvd, City', 'Aalborg', '4000', 'Approved'),
('shelter5@example.com', 'Animal Haven', 'password_5', '202 Lane, City', 'Esbjerg', '5000', 'Approved');


-- Mock data for the pet table
INSERT INTO pet (shelterid, "name", type, race, gender, age, date_added, photo) VALUES
-- Pets for Shelter 1
(1, 'Max', 'dog','Labrador', 'Male', 5, '2024-01-01 08:00:00','./assets/kitty1.jpg'),
(1, 'Bella', 'dog','Beagle', 'Female', 3, '2024-02-15 09:30:00','./assets/kitty1.jpg'),
(1, 'Charlie', 'dog','Bulldog', 'Unknown', 2, '2024-03-20 10:45:00','./assets/kitty1.jpg'),
(1, 'Milo','dog' ,'Poodle', 'Male', 4, '2024-04-05 11:00:00','./assets/kitty1.jpg'),
(1, 'Luna', 'dog','Golden Retriever', 'Female', 6, '2024-05-10 12:15:00','./assets/kitty1.jpg'),

-- Pets for Shelter 2
(2, 'Rocky', 'dog','German Shepherd', 'Female', 4, '2024-06-01 13:30:00','./assets/kitty1.jpg'),
(2, 'Daisy', 'dog','Pomeranian', 'Male', 2, '2024-07-10 14:00:00','./assets/kitty1.jpg'),
(2, 'Simba', 'dog','Siamese Cat', 'Unknown', 3, '2024-08-15 15:30:00','./assets/kitty1.jpg'),
(2, 'Zoe', 'dog','Boxer', 'Female', 5, '2024-09-01 16:45:00','./assets/kitty1.jpg'),
(2, 'Buddy', 'dog','Chihuahua', 'Male', 3, '2024-10-01 17:00:00','./assets/kitty1.jpg'),

-- Pets for Shelter 3
(3, 'Bailey', 'dog','Shih Tzu', 'Unknown', 4, '2024-11-01 18:15:00','./assets/kitty1.jpg'),
(3, 'Lily', 'cat','Persian Cat', 'Female', 6, '2024-12-01 19:30:00','./assets/kitty1.jpg'),
(3, 'Rex', 'dog','Rottweiler', 'Male', 5, '2024-01-15 08:30:00','./assets/kitty1.jpg'),
(3, 'Ruby', 'dog','Corgi', 'Female', 3, '2024-02-05 09:00:00','./assets/kitty1.jpg'),
(3, 'Finn', 'dragon','Dachshund', 'Male', 2, '2024-03-10 10:15:00','./assets/kitty1.jpg'),

-- Pets for Shelter 4
(4, 'Mittens', 'cat','Maine Coon', 'Male', 5, '2024-04-25 11:45:00','./assets/kitty1.jpg'),
(4, 'Shadow', 'dog','Husky', 'Female', 6, '2024-05-30 12:00:00','./assets/kitty1.jpg'),
(4, 'Whiskers', 'cat','Sphynx Cat', 'Unknown', 3, '2024-06-20 13:30:00','./assets/kitty1.jpg'),
(4, 'Chloe', 'dog','Pug', 'Female', 4, '2024-07-05 14:45:00','./assets/kitty1.jpg'),
(4, 'Toby','dog' ,'Yorkshire Terrier', 'Male', 5, '2024-08-01 15:00:00','./assets/kitty1.jpg'),

-- Pets for Shelter 5
(5, 'Oliver', 'dog','British Shorthair', 'Unknown', 7, '2024-09-15 16:00:00','./assets/kitty1.jpg'),
(5, 'Sadie', 'dog','Great Dane', 'Female', 4, '2024-10-10 17:30:00','./assets/kitty1.jpg'),
(5, 'Zeus', 'dog','Doberman', 'Male', 3, '2024-11-20 18:00:00','./assets/kitty1.jpg'),
(5, 'Penny', 'dog','Basset Hound', 'Female', 4, '2024-12-05 19:00:00','./assets/kitty1.jpg'),
(5, 'Oscar', 'cat','Bengal Cat', 'Male', 2, '2024-01-20 08:30:00','./assets/kitty1.jpg');


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