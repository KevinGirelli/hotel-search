import express from "express"
import { get } from "http"
const database = require("../database/sqlite")
const {getRooms} = require("../models/room")
const bodyParser = require('body-parser');

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

server.get("/rooms", async (req,res) =>{
    const data = req.body
    console.log(data)
    const rows = await getRooms(data.name,data.capacity, data.features ,data.minPrice,data.maxPrice)

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