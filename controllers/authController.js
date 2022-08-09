import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import connection from "../database.js";

export async function signUp (req, res) {
    const { email, password, username, profilePic } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const { rows: unvalidEmail } = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
    if (unvalidEmail.length !== 0) {
        return res.sendStatus(409);
    }
    try {
        await authRepository.addNewUser(email, passwordHash, username, profilePic);
        res.sendStatus(201);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}