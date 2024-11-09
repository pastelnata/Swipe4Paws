-- CREATION OF TABLES --

CREATE TABLE "user" (
    userID SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE shelter (
    shelterID SERIAL PRIMARY KEY,
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
    petID SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    race VARCHAR(70),
    shelterID INT NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Unknown')),
    age INT,
    date_added TIMESTAMP,
    FOREIGN KEY (shelterID) REFERENCES shelter(shelterID) ON DELETE CASCADE
);
-- Step 1: Create the behavior table
CREATE TABLE behavior (
    behaviorID SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE
);

-- Step 2: Create the join table to associate pets with behaviors
CREATE TABLE pet_behavior (
    petID INT NOT NULL,
    behaviorID INT NOT NULL,
    PRIMARY KEY (petID, behaviorID),
    FOREIGN KEY (petID) REFERENCES pet(petID) ON DELETE CASCADE,
    FOREIGN KEY (behaviorID) REFERENCES behavior(behaviorID) ON DELETE CASCADE
);


CREATE TABLE moderator (
    modID SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
    petID INT,
    userID INT,
    PRIMARY KEY (petID, userID),
    FOREIGN KEY (petID) REFERENCES pet(petID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES "user"(userID) ON DELETE CASCADE
);


-- MOCK DATA --

-- Mock data for the shelter table
INSERT INTO shelter (email, name, password, address, city, postal_code, status) VALUES
('shelter1@example.com', 'Sunny Shelter', 'password_1', '123 Street, City', 'Copenhagen', '1000', 'Approved'),
('shelter2@example.com', 'Happy Tails', 'password_2', '456 Avenue, City', 'Aarhus', '2000', 'Approved'),
('shelter3@example.com', 'Furry Friends', 'password_3', '789 Road, City', 'Odense', '3000', 'Approved'),
('shelter4@example.com', 'Paws Place', 'password_4', '101 Blvd, City', 'Aalborg', '4000', 'Approved'),
('shelter5@example.com', 'Animal Haven', 'password_5', '202 Lane, City', 'Esbjerg', '5000', 'Approved');


-- Mock data for the pet table
INSERT INTO pet (shelterID, "name", race, gender, age, date_added) VALUES
-- Pets for Shelter 1
(1, 'Max', 'Labrador', 'Male', 5, '2024-01-01 08:00:00'),
(1, 'Bella', 'Beagle', 'Female', 3, '2024-02-15 09:30:00'),
(1, 'Charlie', 'Bulldog', 'Unknown', 2, '2024-03-20 10:45:00'),
(1, 'Milo', 'Poodle', 'Male', 4, '2024-04-05 11:00:00'),
(1, 'Luna', 'Golden Retriever', 'Female', 6, '2024-05-10 12:15:00'),

-- Pets for Shelter 2
(2, 'Rocky', 'German Shepherd', 'Female', 4, '2024-06-01 13:30:00'),
(2, 'Daisy', 'Pomeranian', 'Male', 2, '2024-07-10 14:00:00'),
(2, 'Simba', 'Siamese Cat', 'Unknown', 3, '2024-08-15 15:30:00'),
(2, 'Zoe', 'Boxer', 'Female', 5, '2024-09-01 16:45:00'),
(2, 'Buddy', 'Chihuahua', 'Male', 3, '2024-10-01 17:00:00'),

-- Pets for Shelter 3
(3, 'Bailey', 'Shih Tzu', 'Unknown', 4, '2024-11-01 18:15:00'),
(3, 'Lily', 'Persian Cat', 'Female', 6, '2024-12-01 19:30:00'),
(3, 'Rex', 'Rottweiler', 'Male', 5, '2024-01-15 08:30:00'),
(3, 'Ruby', 'Corgi', 'Female', 3, '2024-02-05 09:00:00'),
(3, 'Finn', 'Dachshund', 'Male', 2, '2024-03-10 10:15:00'),

-- Pets for Shelter 4
(4, 'Mittens', 'Maine Coon', 'Male', 5, '2024-04-25 11:45:00'),
(4, 'Shadow', 'Husky', 'Female', 6, '2024-05-30 12:00:00'),
(4, 'Whiskers', 'Sphynx Cat', 'Unknown', 3, '2024-06-20 13:30:00'),
(4, 'Chloe', 'Pug', 'Female', 4, '2024-07-05 14:45:00'),
(4, 'Toby', 'Yorkshire Terrier', 'Male', 5, '2024-08-01 15:00:00'),

-- Pets for Shelter 5
(5, 'Oliver', 'British Shorthair', 'Unknown', 7, '2024-09-15 16:00:00'),
(5, 'Sadie', 'Great Dane', 'Female', 4, '2024-10-10 17:30:00'),
(5, 'Zeus', 'Doberman', 'Male', 3, '2024-11-20 18:00:00'),
(5, 'Penny', 'Basset Hound', 'Female', 4, '2024-12-05 19:00:00'),
(5, 'Oscar', 'Bengal Cat', 'Male', 2, '2024-01-20 08:30:00');


-- Mock data for the behavior table
INSERT INTO behavior (description) VALUES
('Playful'),
('Aggressive'),
('Friendly'),
('Shy'),
('Curious'),
('Loyal'),
('Energetic'),
('Independent'),
('Calm'),
('Protective');


-- Mock data for the pet_behavior table
INSERT INTO pet_behavior (petID, behaviorID) VALUES
-- Behaviors for pets in Shelter 1
(1, 1),  -- Max is Playful
(1, 3),  -- Max is also Friendly
(2, 4),  -- Bella is Shy
(2, 3),  -- Bella is Friendly
(3, 2),  -- Charlie is Aggressive
(4, 1),  -- Milo is Playful
(4, 7),  -- Milo is Energetic
(5, 3),  -- Luna is Friendly
(5, 10), -- Luna is Protective

-- Behaviors for pets in Shelter 2
(6, 5),  -- Rocky is Curious
(6, 8),  -- Rocky is Independent
(7, 7),  -- Daisy is Energetic
(8, 4),  -- Simba is Shy
(9, 1),  -- Zoe is Playful
(9, 9),  -- Zoe is Calm
(10, 6), -- Buddy is Loyal

-- Behaviors for pets in Shelter 3
(11, 8), -- Bailey is Independent
(12, 9), -- Lily is Calm
(13, 10),-- Rex is Protective
(13, 6), -- Rex is Loyal
(14, 3), -- Ruby is Friendly
(15, 1), -- Finn is Playful

-- Behaviors for pets in Shelter 4
(16, 4), -- Mittens is Shy
(17, 3), -- Shadow is Friendly
(17, 7), -- Shadow is Energetic
(18, 8), -- Whiskers is Independent
(19, 6), -- Chloe is Loyal
(19, 9), -- Chloe is Calm
(20, 10),-- Toby is Protective

-- Behaviors for pets in Shelter 5
(21, 9), -- Oliver is Calm
(22, 10),-- Sadie is Protective
(23, 2), -- Zeus is Aggressive
(23, 6), -- Zeus is Loyal
(24, 5), -- Penny is Curious
(25, 3), -- Oscar is Friendly
(25, 1); -- Oscar is Playful
