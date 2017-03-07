DROP TABLE plants;
DROP TABLE readings;

CREATE TABLE plants { -- add the two extreems lowest and highest
   id         SERIAL PRIMARY KEY
,  name       TEXT NOT NULL
,  sci_name   TEXT
,  best_temp  TEXT NOT NULL
,  best_humid TEXT NOT NULL
,  best_light TEXT NOT NULL
,  best_moist TEXT NOT NULL
};

CREATE TABLE readings {
   id        SERIAL PRIMARY KEY
,  plant_id  INT REFERENCES plants(id)
,  temp      INT
,  humidity  INT
,  light     INT
,  moisture  INT
,  last_read DATE
};

INSERT INTO plants 
(name, sci_name, best_temp, best_humid, best_light, best_moist)
VALUES
("Zebra Cactus", "Haworthia", "N/A", "Not Direct Sunlight or Deep Shade", "N/A");

INSERT INTO plants 
(name, sci_name, best_temp, best_humid, best_light, best_moist)
VALUES
("Aloe Vera", "Aloe Barbadensis", "N/A", "N/A", "Not Direct Sunlight or Deep Shade", "N/A");

INSERT INTO plants 
(name, sci_name, best_temp, best_humid, best_light, best_moist)
VALUES
("Cactus", "", "N/A", "N/A", "Not Deep Shade", "N/A");

INSERT INTO plants 
(name, sci_name, best_temp, best_humid, best_light, best_moist)
VALUES
("Rosularia", "Crassulaceae Rosularia", "N/A", "Not Direct Sunlight or Deep Shade", "N/A");

INSERT INTO plants 
(name, sci_name, best_temp, best_humid, best_light, best_moist)
VALUES
("Peace Lily", "Spathiphyllum", "N/A", "Not Direct Sunlight", "N/A");
