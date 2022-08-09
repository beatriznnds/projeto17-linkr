import connection from "../database.js";

async function addNewUser (email, passwordHash, username, profilePic) {
    return connection.query(`INSERT INTO users (email, password, username, "profilePic")
        VALUES ($1, $2, $3, $4)`, [email, passwordHash, username, profilePic]);
};

async function searchByEmail (email) {
    return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export const authRepository = {
    addNewUser,
    searchByEmail
}