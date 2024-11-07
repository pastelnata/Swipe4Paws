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
    race VARCHAR(70),
    shelterID INT NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Unknown')),
    age INT,
    date_added TIMESTAMP,
    FOREIGN KEY (shelterID) REFERENCES shelter(shelterID) ON DELETE CASCADE
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
INSERT INTO pet (shelterid, race, gender, age, date_added) VALUES
-- Pets for Shelter 1
(1, 'Labrador', 'Male', 5, '2024-01-01 08:00:00'),
(1, 'Beagle', 'Female', 3, '2024-02-15 09:30:00'),
(1, 'Bulldog', 'Unknown', 2, '2024-03-20 10:45:00'),
(1, 'Poodle', 'Male', 4, '2024-04-05 11:00:00'),
(1, 'Golden Retriever', 'Female', 6, '2024-05-10 12:15:00'),

-- Pets for Shelter 2
(2, 'German Shepherd', 'Female', 4, '2024-06-01 13:30:00'),
(2, 'Pomeranian', 'Male', 2, '2024-07-10 14:00:00'),
(2, 'Siamese Cat', 'Unknown', 3, '2024-08-15 15:30:00'),
(2, 'Boxer', 'Female', 5, '2024-09-01 16:45:00'),
(2, 'Chihuahua', 'Male', 3, '2024-10-01 17:00:00'),

-- Pets for Shelter 3
(3, 'Shih Tzu', 'Unknown', 4, '2024-11-01 18:15:00'),
(3, 'Persian Cat', 'Female', 6, '2024-12-01 19:30:00'),
(3, 'Rottweiler', 'Male', 5, '2024-01-15 08:30:00'),
(3, 'Corgi', 'Female', 3, '2024-02-05 09:00:00'),
(3, 'Dachshund', 'Male', 2, '2024-03-10 10:15:00'),

-- Pets for Shelter 4
(4, 'Maine Coon', 'Male', 5, '2024-04-25 11:45:00'),
(4, 'Husky', 'Female', 6, '2024-05-30 12:00:00'),
(4, 'Sphynx Cat', 'Unknown', 3, '2024-06-20 13:30:00'),
(4, 'Pug', 'Female', 4, '2024-07-05 14:45:00'),
(4, 'Yorkshire Terrier', 'Male', 5, '2024-08-01 15:00:00'),

-- Pets for Shelter 5
(5, 'British Shorthair', 'Unknown', 7, '2024-09-15 16:00:00'),
(5, 'Great Dane', 'Female', 4, '2024-10-10 17:30:00'),
(5, 'Doberman', 'Male', 3, '2024-11-20 18:00:00'),
(5, 'Basset Hound', 'Female', 4, '2024-12-05 19:00:00'),
(5, 'Bengal Cat', 'Male', 2, '2024-01-20 08:30:00');
