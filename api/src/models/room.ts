import database from "../database/sqlite";

const getRooms = async (name: string, capacity: number,features: string[], minPrice: number, maxPrice: number) => {
    return new Promise<any[]>((resolve, reject) => {
        let query = ""
        const params:any = [minPrice,maxPrice]
        console.log(name)

        if(name == undefined || name == ""){
            query = `SELECT * FROM room INNER JOIN roomfeature ON room.roomid = roomfeature.roomid INNER JOIN features ON roomfeature.featureid = features.featureid WHERE room.price BETWEEN ? AND ? AND room.capacity = ?`;
            params.push(capacity)
        }else{
            query = `SELECT * FROM room INNER JOIN roomfeature ON room.roomid = roomfeature.roomid INNER JOIN features ON roomfeature.featureid = features.featureid WHERE room.price BETWEEN ? AND ? AND room.name = ? AND room.capacity = ? `;
            params.push(name)
            params.push(capacity)
        }

        if (features.length == 1) {
    
            query += ` AND features.featureid IN (SELECT featureid FROM features WHERE featurename = ?)`;
            params.push(features[0])
           
        }

        if (features.length > 1) {
            query += ` AND features.featureid IN (SELECT featureid FROM features WHERE featurename IN (${features.map(() => '?').join(', ')}))`;
            
            features.forEach(text =>{
                params.push(text)
            })
        }
        console.log(params)
        database.all(query, params, (err: Error, rows: any[]) => {
            if (err) {
                reject(err); 
                console.log(query)
            } else {
                resolve(rows);
                console.log(query)
            }
        });
    });
};

module.exports = {
    getRooms
};
