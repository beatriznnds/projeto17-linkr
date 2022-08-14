import connection from "../database.js";

async function searchUser(nameSearch){
   return connection.query (`SELECT id, username, "profilePic" FROM users
    WHERE username LIKE '%${nameSearch}%'
    `);
}

export const searchRepository = {
    searchUser
}