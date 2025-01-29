import express from "express"
import { get } from "http"
const database = require("../database/sqlite")
const {getRooms} = require("../models/room")
import cors from "cors";

const server = express()

interface Room {
    roomid: number;
    name: string;
    price: number;
    capacity: number;
    features: string[]
}
  

server.get("/", (req,res) =>{
    console.log("test")
})

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
}));

server.get("/rooms", async (req,res) =>{
    const data = req.query
    const features:string[] = [] 

    if(data.arcondicionado == "true"){
        features.push("Ar-condicionado")
    }

    if(data.wifi == "true"){
        features.push("WiFi")
    }

    console.log(features)
    const rows = await getRooms(features ,data.minPrice,data.maxPrice)

    let roomMap: { [key: number]: Room } = {};

    rows.forEach((row: any) => {
        if (!roomMap[row.roomid]) {
            roomMap[row.roomid] = {
                roomid: row.roomid,
                name: row.name,
                price: row.price,
                capacity: row.capacity,
                features: [] 
            };
        }

        if (!roomMap[row.roomid].features.includes(row.featurename)) {
            roomMap[row.roomid].features.push(row.featurename);
        }
    });

    const rooms = Object.values(roomMap);
    res.json(rooms)
    
})

server.listen(4000, () => console.log("Servidor Iniciado."))