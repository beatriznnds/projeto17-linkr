import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import { v4 as uuid } from "uuid";
import connection from "../database.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  //user validation
  const { rows: userValidation } = await connection.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userValidation.length < 1) {
    res.sendStatus(401);
    return;
  }

  const comparePassword = bcrypt.compareSync(
    password,
    userValidation[0].password
  );

  if (!comparePassword) {
    res.sendStatus(401);
    return;
  }
  try {
    //Token generatioin
    const token = uuid();

    await connection.query(
      'INSERT INTO sessions ("userId","token") VALUES ($1, $2)',
      [userValidation[0].id, token]
    );

    console.log(userValidation[0].username, userValidation[0].profilePic);

    res
      .send({
        token,
        name: userValidation[0].username,
        profilePic: userValidation[0].profilePic,
      })
      .status(200);
  } catch {
    res.sendStatus(400);
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
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  console.log(token);

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  await authRepository.deleteSessionByToken(token);

  res.status(201).send("Session ended successfully");
}
