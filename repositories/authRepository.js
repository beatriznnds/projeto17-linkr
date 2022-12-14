import connection from "../database.js";

async function insertSession(token, userId) {
  return connection.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}

async function addNewUser(email, passwordHash, username, profilePic) {
  return connection.query(
    `INSERT INTO users (email, password, username, "profilePic")
        VALUES ($1, $2, $3, $4)`,
    [email, passwordHash, username, profilePic]
  );
}

async function searchByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function searchToken(token){
  return connection.query(`SELECT * FROM sessions WHERE token = $1`,
  [token])
}

async function deleteSessionByToken(token) {
  return connection.query("DELETE FROM sessions WHERE token = $1", [token]);
}

export const authRepository = {
  addNewUser,
  searchByEmail,
  insertSession,
  searchToken,
  deleteSessionByToken,
};
