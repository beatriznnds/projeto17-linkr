import connection from "../database.js"

async function insertSession(token, userId){
    return connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId])
}

export const authRepository = {
        insertSession
}