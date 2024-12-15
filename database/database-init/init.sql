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
    description VARCHAR(255),
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
    description VARCHAR(255),
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
('user1@gmail.com', 'user1', '$2a$10$TxcmfrY7qJkpSRsyybQDwu3gPJdKuckdF1nmQDuMZRbqXTVBP4g1e'),
('user2@gmail.com', 'user2', '$2a$10$ijbV39slbGLqzlnHPLTag.xwDuarrcMNvcDBfSQWIp3ONGXtToqeO');
-- Mock data for the moderator table
INSERT INTO moderator (email, username, "password") VALUES
('moderator@gmail.com', 'moderator', '$2b$10$LBtK0B0.PEIhnbC5jTiGPuByCvtLQFFvmSERAmSZrxErlldZhF5Wq');
--('moderator2@gmail.com', 'moderator2', '$2b$10$EFtxG8UcLBwbLI9yyrD3c.fABrO3yBHCXj4NUwytZuUIWunqmH50S');--

-- Mock data for the shelter table
INSERT INTO shelter (email, managed_by, "name", "password", "address", city, postal_code, "status", photo, description) VALUES
('shelter1@example.com', 1, 'Sunny Shelter', '$2a$10$IvwJDtrvlXHOJDuvQA/LouLkRV/gQgjqs6Yu72l10g9WFlV9iXhNS', '123 Street, City', 'Copenhagen', '1000', 'Approved', './assets/shelter1.jpg', 'Description of shelter 1'),
('shelter2@example.com', 1, 'Happy Tails', '$2a$10$4s9rBJli64BmSbWt9KHfjOM2QSB.u3fO5U3CeMnkD8q6EqvHToPkW', '456 Avenue, City', 'Aarhus', '2000', 'Pending','./assets/shelter2.jpg', 'Description of shelter 2'),
('shelter3@example.com', 1, 'Furry Friends', '$2a$10$88SVNiRZ.ZDNniowWNWnNebtEJbAzmzqJmkEpREkHVIiND7PzzYny', '789 Road, City', 'Odense', '3000', 'Approved', './assets/shelter1.jpg', 'Description of shelter 3'),
('shelter4@example.com', 1, 'Paws Place', '$2a$10$BIE9G.WFlbFV3Y8s2qYt0emb.DQ5TapgdjNHzD1oF/jAHSZFOsEYO', '101 Blvd, City', 'Aalborg', '4000', 'Rejected','./assets/shelter2.jpg', 'Description of shelter 4'),
('shelter5@example.com', 1, 'Animal Haven', '$2a$10$VByK.0p6z32jHRFIPRICu.Zb4BORGx3XPgDvZ0jiCJD4yVC9cy2Wm', '202 Lane, City', 'Esbjerg', '5000', 'Approved', './assets/shelter1.jpg', 'Description of shelter 5'),
('shelter6@example.com', 1, 'Cozy Corner', '$2a$10$YSIUKztAM8CAcLzdrOO7wehXcL/LMuCBCAVGBIwOEXjg7X6h9wpCC', '303 Street, City', 'Roskilde', '6000', 'Pending', './assets/shelter2.jpg', 'Description of shelter 6'),
('shelter7@example.com', 1, 'Safe Haven', '$2a$10$rnvSZOSMiFKEJKdbgk.kTuuyBM2YZrxk/GIH93Uk9OOFU.oJG4csW', '404 Avenue, City', 'Horsens', '7000', 'Pending', './assets/shelter1.jpg', 'Description of shelter 7'),
('shelter8@example.com', 1, 'Pet Paradise', '$2a$10$jLFVgBx2MAvcIcPJJsSfCumYDIpHG3ESyH63fd9O6yeAnsNIIC.zG', '505 Road, City', 'Randers', '8000', 'Pending', './assets/shelter2.jpg', 'Description of shelter 8');


-- Mock data for the pet table
INSERT INTO pet (shelterid, "name", type, race, gender, age, date_added, photo, description) VALUES
-- Pets for Shelter 1
(1, 'Snowball', 'cat', 'Smart', 'Male', 2, '2024-06-01 10:00:00', './assets/pets/snowball.jpg', 'Description of pet Snowball'),
(1, 'Mittens', 'cat', 'Curious', 'Male', 1, '2024-07-15 11:30:00', './assets/pets/kocurek.jpg', 'Description of pet Mittens'), 
(1, 'Ryszard', 'parrot', 'Sociable', 'Male', 3, '2024-08-20 12:00:00', './assets/pets/ryszard.jpg', 'Description of pet Ryszard'), 
(1, 'Whiskers', 'cat', 'Calm', 'Male', 1, '2024-09-05 14:00:00', './assets/pets/koteczka.jpg', 'Description of pet Whiskers'), 
(1, 'Maciej', 'dog', 'Elegant', 'Male', 5, '2024-10-10 15:15:00', './assets/pets/maciej.jpg', 'Description of pet Maciej'), 


-- Pets for Shelter 2
(2, 'Jumbo', 'hedgehog', 'Playful', 'Male', 2, '2024-12-10 19:30:00', './assets/pets/jumbo.jpg', 'Description of pet Jumbo'),
(2, 'Tiger', 'cat', 'Male', 'Male', 1, '2024-12-05 18:00:00', './assets/pets/kocurek2.jpg', 'Description of pet Tiger'), 
(2, 'Lily', 'cat', 'Cautious', 'Female', 1, '2024-12-08 19:00:00', './assets/pets/koteczka2.jpg', 'Description of pet Lily'),
(2, 'Sadie', 'dog', 'Fearful', 'Female', 3, '2024-11-20 16:00:00', './assets/pets/tomasz.jpg', 'Description of pet Sadie'), 
(2, 'Buddy', 'dog','Chihuahua', 'Male', 3, '2024-10-01 17:00:00','./assets/pets/robert.jpg','Description of pet Buddy'),

-- Pets for Shelter 3
(3, 'Bailey', 'parrot','blue parrot', 'Unknown', 4, '2024-11-01 18:15:00','./assets/pets/parot.jpg', 'Description of pet Bailey'),
(3, 'Mira', 'dog','Shiba Inu', 'Female', 8, '2024-12-01 19:30:00','./assets/pets/mira.JPG','Description of pet Mira'),
(3, 'Baloo', 'dog','Staffy', 'Male', 5, '2024-01-15 08:30:00','./assets/pets/baloo.jpg','Description of pet Baloo'),
(3, 'Ruby', 'dog','Corgi', 'Female', 3, '2024-02-05 09:00:00','./assets/pets/sadCorgi.jpg','Description of pet Ruby'),
(3, 'Finn', 'dragon','Dachshund', 'Male', 2, '2024-03-10 10:15:00','./assets/pets/dachshund.jpg','Description of pet Finn'),

-- Pets for Shelter 4
(4, 'Mittens', 'cat','Maine Coon', 'Male', 1, '2024-04-25 11:45:00','./assets/pets/mittens.jpg','Description of pet Mittens'),
(4, 'Hampter', 'dog','hamster', 'Male', 6, '2024-05-30 12:00:00','./assets/pets/hamper.png','Description of pet Hampter'),
(4, 'Pawel', 'parrot','green parrot', 'Female', 3, '2024-06-20 13:30:00','./assets/pets/parrot.jpg','Description of pet Pawel'),
(4, 'Chloe', 'dog','Pug', 'Female', 4, '2024-07-05 14:45:00','./assets/pets/sadPug.jpg','Description of pet Chloe'),
(4, 'Toby','dog' ,'Yorkshire Terrier', 'Male', 5, '2024-08-01 15:00:00','./assets/pets/yorkshire.jpg','Description of pet Toby'),


-- Pets for Shelter 5
(5, 'Oliver', 'dog','British Shorthair', 'Male', 7, '2024-09-15 16:00:00','./assets/pets/goodBoy.jpg', 'Description of pet Oliver'),
(5, 'Squrwiel', 'Squirrel','Great Dane', 'Female', 4, '2024-10-10 17:30:00','./assets/pets/squirel.jpg', 'Description of pet Squrwiel'),
(5, 'Martin', 'cat','Burmese', 'Male', 11, '2024-11-20 18:00:00','./assets/pets/martin.jpg' ,'Description of pet Martin'),
(5, 'Penny', 'dog','Basset Hound', 'Female', 4, '2024-12-05 19:00:00','./assets/pets/bassetHound.png','Description of pet Penny'),
(5, 'Semjon', 'cat','Oriental Shorthair', 'Male', 2, '2024-01-20 08:30:00','./assets/pets/semjon.JPG','Description of pet Semjon');


-- Mock data for the behavior table
INSERT INTO pet_behavior (petid, behavior) VALUES
(1, 'Playful'),
(1, 'Energetic'),
(2, 'Aggressive'),
(2, 'Alert'),
(3, 'Friendly'),
(4, 'Shy'),
(4, 'Curious'),
(5, 'Curious'),
(6, 'Loyal'),
(6, 'Protective'),
(7, 'Energetic'),
(7, 'Friendly'),
(8, 'Independent'),
(8, 'Shy'),
(9, 'Calm'),
(9, 'Gentle'),
(10, 'Protective'),
(11, 'Affectionate'),
(12, 'Gentle'),
(13, 'Playful'),
(14, 'Alert'),
(15, 'Lively'),
(16, 'Friendly'),
(16, 'Curious'),
(17, 'Relaxed'),
(18, 'Loyal'),
(19, 'Obedient'),
(20, 'Sociable'),
(20, 'Adventurous'),
(21, 'Adventurous'),
(22, 'Calm'),
(23, 'Reserved'),
(24, 'Cuddly'),
(24, 'Playful'),
(25, 'Active');