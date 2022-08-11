import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { email, password } = req.body;

  //user validation
  const { rows: userValidation } = await authRepository.searchByEmail(email);

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

    await authRepository.insertSession(userValidation[0].id, token);

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

  const { rows: validToken } = await authRepository.searchToken(token);

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  await authRepository.deleteSessionByToken(token);

  res.status(201).send("Session ended successfully");
}
