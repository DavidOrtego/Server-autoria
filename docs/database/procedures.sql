USE vives_db;

DELIMITER //

CREATE OR REPLACE PROCEDURE DeleteCompletedTasks()
BEGIN
    DELETE FROM Tasks 
    WHERE state = 'complete' 
    AND expiration_date < DATE_SUB(CURDATE(), INTERVAL 10 DAY);
END //

DELIMITER ;

SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS Evt_DeleteCompletedTasks
ON SCHEDULE EVERY 1 DAY
DO
  CALL DeleteCompletedTasks();
