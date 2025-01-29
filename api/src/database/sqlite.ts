import sqlite3 from "sqlite3";

const db = new sqlite3.Database("hotelsearch", (err) =>{
    if(err){
        console.log(err.message)
    }else{
        console.log("Database connected")
        db.exec(`
            CREATE TABLE IF NOT EXISTS features (
                featureid INTEGER PRIMARY KEY AUTOINCREMENT,
                featurename text
            )
            `)

        db.exec(`
            CREATE TABLE IF NOT EXISTS room(
                roomid INTEGER PRIMARY KEY AUTOINCREMENT,
                name text,
                price float,
                capacity int
            )
            `)

        db.exec(`
            CREATE TABLE IF NOT EXISTS roomfeature (
                roomfeatureid INTEGER PRIMARY KEY AUTOINCREMENT,
                roomid integer,
                featureid integer,
                FOREIGN KEY (roomid) REFERENCES room(roomid)
                FOREIGN KEY (featureid) REFERENCES features(featureid)
            )
            `)
        
        db.exec(`INSERT INTO features (featurename) VALUES
                ('Ar-condicionado'),
                ('WiFi');`)

        db.exec(`INSERT INTO room (name, price, capacity) VALUES
                ('Suite Luxo 101', 100.00, 2),
                ('Quarto Econômico 102', 120.00, 2),
                ('Suite Superior 103', 130.00, 3),
                ('Quarto Deluxe 104', 150.00, 3),
                ('Suite Premium 105', 180.00, 2),
                ('Quarto Executivo 106', 200.00, 4),
                ('Suite Presidencial 107', 250.00, 2),
                ('Quarto Master 108', 220.00, 3),
                ('Suite Royale 109', 300.00, 4),
                ('Quarto Premium 110', 350.00, 2),
                ('Suite Master 201', 350.00, 2),
                ('Quarto Executivo Premium 202', 280.00, 2),
                ('Suite Deluxe 203', 250.00, 3),
                ('Quarto Luxo 204', 220.00, 2),
                ('Suite Grand 205', 400.00, 3),
                ('Quarto Royal 206', 500.00, 4),
                ('Suite Infinity 207', 600.00, 2),
                ('Quarto Elegante 208', 240.00, 3),
                ('Suite Prestige 209', 450.00, 4),
                ('Quarto Comfort 210', 180.00, 2);
                    `)

        db.exec(`INSERT INTO roomfeature (roomid, featureid) VALUES
                        (1, 1),
                        (1, 2),
                        (2, 1),
                        (3, 2),
                        (4, 1),
                        (5, 2),
                        (6, 1),
                        (7, 2),
                        (8, 1),
                        (9, 2),
                        (10, 1),
                        (10, 2),
                        (11, 1),
                        (11, 2),
                        (12, 1),
                        (13, 2),
                        (14, 1),
                        (15, 2),
                        (16, 1),
                        (17, 2),
                        (18, 1),
                        (19, 2),
                        (20, 1);`)
    }
})

export default db


