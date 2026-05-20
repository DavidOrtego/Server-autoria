DELIMITER //

CREATE OR REPLACE PROCEDURE seed_initial_data()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    TRUNCATE TABLE Expenses;
    TRUNCATE TABLE Tasks;
    TRUNCATE TABLE HouseMembers;
    TRUNCATE TABLE Houses;
    TRUNCATE TABLE Users;
    SET FOREIGN_KEY_CHECKS = 1;
    
    INSERT INTO Users (name, email, password, rol) VALUES ('David', 'david@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Ana', 'ana@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Carlos', 'carlos@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Laura', 'laura@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Pedro', 'pedro@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'admin');
    INSERT INTO Users (name, email, password, rol) VALUES ('Maria', 'maria@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Jorge', 'jorge@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Sofia', 'sofia@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Hugo', 'hugo@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');
    INSERT INTO Users (name, email, password, rol) VALUES ('Elena', 'elena@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');

    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Student Apartment', 'Main Street 1', 3, 1);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Downtown Apartment', 'Sol Square 5', 2, 15);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Suburban House', 'Oak Avenue 45', 4, 50);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Modern Loft', 'Gran Via Street 12', 1, 40);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Erasmus Apartment', 'University Street 8', 4, 30);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Family House', 'Luna Street 33', 3, 20);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Beach Studio', 'Boardwalk 10', 1, 22);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Penthouse with Views', 'Espana Square 2', 2, 5);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Shared Apartment', 'Cervantes Street 15', 3, 16);
    INSERT INTO Houses (name, address, number_of_rooms, level) VALUES ('Residence', 'Campus Avenue 100', 10, 40);

    INSERT INTO HouseMembers (id_house, id_user) VALUES (1, 1);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (1, 2);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (1, 3);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (2, 4);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (2, 5);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (3, 6);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (3, 7);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (4, 8);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (5, 9);
    INSERT INTO HouseMembers (id_house, id_user) VALUES (5, 10);

    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Clean kitchen', 'Wash dishes and countertop', 'pending', '2026-05-01', 1, 1);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Take out trash', 'Recycle cardboard and plastic', 'complete', '2026-04-25', 1, 2);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Buy toilet paper', 'Buy 24-pack', 'pending', '2026-04-30', 1, 3);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Clean bathrooms', 'Use bleach in both bathrooms', 'pending', '2026-05-02', 2, 4);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Pay internet', 'Pay monthly bill', 'complete', '2026-04-20', 2, 5);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Water plants', 'Balcony and living room plants', 'pending', '2026-05-03', 3, 6);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Mop floors', 'The entire apartment', 'pending', '2026-05-01', 3, 7);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Clean windows', 'Living room windows', 'pending', '2026-05-05', 4, 8);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Organize party', 'Buy drinks and snacks', 'pending', '2026-05-10', 5, 9);
    INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES ('Wash curtains', 'Washing machine at 30 degrees', 'complete', '2026-04-15', 5, 10);

    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (45.50, 'Mercadona grocery shopping', '2026-04-20', 1, 1);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (15.20, 'Cleaning supplies', '2026-04-22', 2, 1);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (60.00, 'Electricity bill', '2026-04-25', 3, 1);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (35.00, 'Internet', '2026-04-10', 4, 2);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (120.00, 'Monthly Carrefour grocery shopping', '2026-04-15', 5, 2);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (85.30, 'Shared dinner', '2026-04-18', 6, 3);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (25.00, 'Netflix and Spotify', '2026-04-05', 7, 3);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (150.00, 'IKEA furniture', '2026-04-12', 8, 4);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (90.00, 'Water and Electricity bill', '2026-04-28', 9, 5);
    INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES (20.50, 'Beers and snacks', '2026-04-27', 10, 5);

END //

DELIMITER ;
