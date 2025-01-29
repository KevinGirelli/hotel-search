import database from "../database/sqlite";

const getRooms = async (
    name: string,
    capacity: number,
    features: string[],
    minPrice: number,
    maxPrice: number,
    offset: number,
    limit: number
) => {
    return new Promise<{ rows: any[], total: number }>((resolve, reject) => {
        let roomsQuery = `
            SELECT DISTINCT r.roomid, r.name, r.price, r.capacity,
            GROUP_CONCAT(f.featurename) as features
            FROM room r
            LEFT JOIN roomfeature rf ON r.roomid = rf.roomid
            LEFT JOIN features f ON rf.featureid = f.featureid
            WHERE r.price BETWEEN ? AND ?
            AND r.capacity >= ?
            AND r.name LIKE ?
        `;
        
        let countQuery = `
            SELECT COUNT(DISTINCT r.roomid) as total
            FROM room r
            LEFT JOIN roomfeature rf ON r.roomid = rf.roomid
            LEFT JOIN features f ON rf.featureid = f.featureid
            WHERE r.price BETWEEN ? AND ?
            AND r.capacity >= ?
            AND r.name LIKE ?
        `;

        const params = [minPrice, maxPrice, capacity, `%${name}%`];
        
        if (features.length > 0) {
            const featureCondition = ` AND f.featurename IN (${features.map(() => '?').join(',')})`;
            roomsQuery += featureCondition;
            countQuery += featureCondition;
            params.push(...features);
        }

        roomsQuery += ` GROUP BY r.roomid, r.name, r.price, r.capacity`;
        roomsQuery += ` LIMIT ? OFFSET ?`;

        database.get(countQuery, params, (err: Error, totalRow: any) => {
            if (err) {
                reject(err);
                return;
            }

            database.all(roomsQuery, [...params, limit, offset], (err: Error, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ 
                        rows, 
                        total: totalRow.total
                    });
                }
            });
        });
    });
};

module.exports = {
    getRooms
};
