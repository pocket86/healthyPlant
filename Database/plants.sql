DROP TABLE plants;
DROP TABLE readings;

CREATE TABLE plants { -- add the two extreems lowest and highest
   id         SERIAL PRIMARY KEY
,  name       TEXT NOT NULL
,  sci_name   TEXT
,  temp_id    INT  REFERENCES temp(id)
,  humid_id   INT  REFERENCES humid
,  light_id   INT  REFERENCES light(id)
,  moist_id   INT  REFERENCES moist(id)
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

CREATE TABLE temp {
   id            SERIAL PRIMARY KEY
,  highest_temp  INT
,  best_temp     INT
,  lowest_temp   INT
}

CREATE TABLE light {
   id     SERIAL PRIMARY KEY
,  high_light   INT
,  best_light   INT
,  lowest_light INT
}

CREATE TABLE moist {
   id     SERIAL PRIMARY KEY
,  high_moist   INT
,  best_moist   INT
,  lowest_moist INT
}

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
