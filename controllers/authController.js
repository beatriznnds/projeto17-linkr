import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import { v4 as uuid } from "uuid";
import connection from "../database.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const { rows: user } = await authRepository.searchByEmail(email);
    if (user[0] && bcrypt.compareSync(password, user[0].password)) {
      const token = uuid();
      await authRepository.insertSession(token, user[0].id);
      return res
            .send({ token, name: user[0].username, profilePic: user[0].profilePic })
            .status(200);
    }
    res.send("Usuário ou senha inválidos!").status(400);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const { email, password, username, profilePic } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const { rows: unvalidEmail } = await authRepository.searchByEmail(email);
    if (unvalidEmail.length !== 0) {
      return res
        .status(409)
        .send({ error: "This e-mail is already registered." });
    }

    await authRepository.addNewUser(email, passwordHash, username, profilePic);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function logout(req, res) {
  const token = res.locals.token;
  console.log(token);

  await authRepository.deleteSessionByToken(token);

  res.status(201).send("Session ended successfully");
}
