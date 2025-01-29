import express from "express"
import { get } from "http"
const database = require("../database/sqlite")
const {getRooms} = require("../models/room")
import cors from "cors";

const server = express()

interface Room {
    id: string;
    name: string;
    price: number;
    capacity: number;
    features: {
        wifi: boolean;
        airConditioner: boolean;
    }
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

server.get("/rooms", async (req, res) => {
    const { 
        name = '',
        minPrice = '0',
        maxPrice = '1000',
        capacity = '1',
        wifi = 'false',
        arcondicionado = 'false',
        page = '1',
        limit = '6'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;
    
    const features: string[] = [];
    if (wifi === 'true') features.push("WiFi");
    if (arcondicionado === 'true') features.push("Ar-condicionado");

    try {
        const { rows, total } = await getRooms(
            name as string,
            parseInt(capacity as string),
            features,
            parseInt(minPrice as string),
            parseInt(maxPrice as string),
            offset,
            limitNum
        );

        let roomMap: { [key: number]: Room } = {};
        rows.forEach((row: any) => {
            const featuresList = row.features ? row.features.split(',') : [];
            roomMap[row.roomid] = {
                id: row.roomid.toString(),
                name: row.name,
                price: row.price,
                capacity: row.capacity,
                features: {
                    wifi: featuresList.includes('WiFi'),
                    airConditioner: featuresList.includes('Ar-condicionado')
                }
            };
        });

        res.json({
            rooms: Object.values(roomMap),
            total,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar quartos' });
    }
});

server.listen(4000, () => console.log("Servidor Iniciado."))