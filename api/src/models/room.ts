import database from "../database/sqlite";

const getRooms = async (name: string, capacity: number, features: string[], minPrice: number, maxPrice: number) => {
    return new Promise<any[]>((resolve, reject) => {
        let query = `SELECT * FROM room INNER JOIN roomfeature ON room.roomid = roomfeature.roomid INNER JOIN features ON roomfeature.featureid = features.featureid WHERE room.capacity = ${capacity} AND room.name LIKE '%${name}%' AND room.price BETWEEN ${minPrice} AND ${maxPrice}`;

        if (features.length == 1) {
    
            query += ` AND features.featureid IN (SELECT featureid FROM features WHERE featurename = '${features[0]}')`;
            database.all(query, [], (err: Error, rows: any[]) => {
                if (err) {
                    reject(err); 
                    console.log(query)
                } else {
                    resolve(rows);
                    console.log(query)
                }
            });
        }

        if (features.length > 1) {
            query += ` AND features.featureid IN (SELECT featureid FROM features WHERE featurename IN (${features.map(() => '?').join(', ')}))`;
            
            const params = []
            params.push(...features)
            database.all(query, params, (err: Error, rows: any[]) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(rows); 
                    console.log(query)
                }
            });
        }
    });
};

module.exports = {
    getRooms
};
