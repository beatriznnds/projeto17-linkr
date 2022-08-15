import connection from "../database.js";

async function searchUser(nameSearch){
   return connection.query (`SELECT id, username, "profilePic" FROM users WHERE LOWER(username) LIKE $1`, [nameSearch.toLowerCase() + '%']);
}

export const searchRepository = {
    searchUser
}
