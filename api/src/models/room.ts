import database from "../database/sqlite";

const getRooms = async (features: string[], minPrice: number, maxPrice: number) => {
    return new Promise<any[]>((resolve, reject) => {
        let query = `SELECT * FROM room INNER JOIN roomfeature ON room.roomid = roomfeature.roomid INNER JOIN features ON roomfeature.featureid = features.featureid WHERE room.price BETWEEN ? AND ?`;
        const params:any = [minPrice,maxPrice]
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
