import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import connection from "../database.js";

export async function signUp (req, res) {
    const { email, password, username, profilePic } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const { rows: unvalidEmail } = await authRepository.searchByEmail(email);
    if (unvalidEmail.length !== 0) {
        return res.status(409).send({ error: 'This e-mail is already registered.'});
    }
    try {
        await authRepository.addNewUser(email, passwordHash, username, profilePic);
        res.sendStatus(201);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}