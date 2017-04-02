/****** Drop the tables if they already exist within the database ******/
DROP TABLE temp;
DROP TABLE light;
DROP TABLE moist;
DROP TABLE humid;
DROP TABLE plants;
DROP TABLE readings;

/****** Create the tables that are needed for the database ******/
CREATE TABLE plants ( -- add the two extreems lowest and highest
   id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  name       CHAR(20) NOT NULL
,  sci_name   CHAR(255)
,  temp_id    INT
,  humid_id   INT
,  light_id   INT
,  moist_id   INT
);

CREATE TABLE readings (
   id        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  plant_id  INT
,  temp      INT
,  humidity  INT
,  light     INT
,  moisture  INT
,  last_read DATE
);

CREATE TABLE temp (
   id            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  high_temp  INT
,  best_temp     INT
,  lowest_temp   INT
);

CREATE TABLE light (
   id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  high_light   INT
,  best_light   INT
,  lowest_light INT
);

CREATE TABLE moist (
   id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  high_moist   INT
,  best_moist   INT
,  lowest_moist INT
);

CREATE TABLE humid (
   id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
,  high_humid   INT
,  best_humid   INT
,  lowest_humid INT
);

/****** Add Foreign Key constr ******/
ALTER TABLE plants
   ADD FOREIGN KEY plants_fk1 (temp_id) REFERENCES temp (id);

ALTER TABLE plants
   ADD FOREIGN KEY plants_fk2 (humid_id) REFERENCES humid (id);

ALTER TABLE plants
   ADD FOREIGN KEY plants_fk3 (light_id) REFERENCES light (id);

ALTER TABLE plants
   ADD FOREIGN KEY plants_fk4 (moist_id) REFERENCES moist (id);
   
ALTER TABLE readings
   ADD FOREIGN KEY readings_fk1 (plant_id) REFERENCES plants (id);
   
/****** Insert into the tables ******/   
INSERT INTO temp
(high_temp, best_temp, lowest_temp)
VALUES
(100,70,40);

INSERT INTO light
(high_light, best_light, lowest_light)
VALUES
(100,70,20);

INSERT INTO light
(high_light, best_light, lowest_light)
VALUES
(90,70,20);

INSERT INTO moist
(high_moist, best_moist, lowest_moist)
VALUES
(80,50,30);

INSERT INTO moist
(high_moist, best_moist, lowest_moist)
VALUES
(70,40,10);

INSERT INTO humid
(high_humid, best_humid, lowest_humid)
VALUES
(100,70,40);

INSERT INTO humid
(high_humid, best_humid, lowest_humid)
VALUES
(90,70,40);

INSERT INTO humid
(high_humid, best_humid, lowest_humid)
VALUES
(70,40,10);

INSERT INTO plants 
(name, sci_name, temp_id,  humid_id,  light_id,  moist_id)
VALUES
("Zebra Cactus", "Haworthia", 1, 2, 1, 2);

INSERT INTO plants 
(name, sci_name, temp_id,  humid_id,  light_id,  moist_id)
VALUES
("Aloe Vera", "Aloe Barbadensis",  1, 2, 1, 2);

INSERT INTO plants 
(name, sci_name, temp_id,  humid_id,  light_id,  moist_id)
VALUES
("Cactus", "",  1, 2, 1, 2);

INSERT INTO plants 
(name, sci_name, temp_id,  humid_id,  light_id,  moist_id)
VALUES
("Rosularia", "Crassulaceae Rosularia",  1, 2, 1, 2);

INSERT INTO plants 
(name, sci_name, temp_id,  humid_id,  light_id,  moist_id)
VALUES
("Peace Lily", "Spathiphyllum",  1, 1, 1, 1);
