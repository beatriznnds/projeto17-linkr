import connection from "../database.js";

async function addNewUser (email, passwordHash, username, profilePic) {
    return connection.query(`INSERT INTO users (email, password, username, "profilePic")
        VALUES ($1, $2, $3, $4)`, [email, passwordHash, username, profilePic]);
};

export const authRepository = {
    addNewUser
}