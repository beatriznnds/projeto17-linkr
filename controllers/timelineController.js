import connection from "../database";

export async function timeline(req, res) {
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

  try {
    await connection.query("SELECT * FROM publications");
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
}
