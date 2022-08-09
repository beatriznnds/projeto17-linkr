import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import { v4 as uuid } from 'uuid';

export async function signIn(req, res){
    const { email, password } = req.body;

    try {
        const {rows: user} = await authRepository.searchByEmail(email);
        if(!user[0] && !bcrypt.compareSync(password, user[0].password)){
            return res.send("Usuário ou senha inválidos!").status(400);
        }
        const token = uuid();
        await authRepository.insertSession(token, user[0].id);
        res.send(token).status(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}