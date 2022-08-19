import { postRepository } from "../repositories/postRepository.js";
import { authRepository } from "../repositories/authRepository.js"
import urlMetadata from "url-metadata";
import connection from "../database.js";
import { hashtagRepository } from "../repositories/hashtagRepository.js";

export async function newPost(req, res) {
  const { link, description } = req.body;
  const { userId } = res.locals;
  const words = description.split(" ");
  const hashtags = [];

  try {
    await urlMetadata(link).then(
      async function (metadata) {
        // success handler

        await postRepository.addNewPost(
          userId,
          link,
          description,
          metadata.title,
          metadata.image,
          metadata.description
        );
      },
      function (error) {
        // failure handler
        console.log(error);
      }
    );

    for (let i = 0; i < words.length; i++) {
      if (words[i][0] === "#") {
        hashtags.push(words[i]);
      }
    }

    for (let i = 0; i < hashtags.length; i++){
      await hashtagRepository.createHashtag(hashtags[i].replace("#", "").toLowerCase());
    }

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  const { id, description } = req.body;
  const { userId } = res.locals;
  const words = description.split(" ");
  const hashtags = [];

  try {
    const { rows: validatePost } = await postRepository.searchPost(
      id
    );

    if (validatePost.length === 0) {
      return res.sendStatus(404);
    }
    if (validatePost[0].userId !== userId) {
      return res.sendStatus(401);
    }
    
    await postRepository.editPost(description, id);

    for (let i = 0; i < words.length; i++) {
      if (words[i][0] === "#") {
        hashtags.push(words[i]);
      }
    }

    for (let i = 0; i < hashtags.length; i++){
      await hashtagRepository.createHashtag(hashtags[i].replace("#", "").toLowerCase());
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { authorization } = req.headers;
  const { id } = req.body;

  const token = authorization?.replace("Bearer", "").trim();

  const { rows: validToken } = await authRepository.searchToken(token);

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  const userId = validToken[0].userId;

  try {
    const { rows: validatePost } = await postRepository.searchPost(
      id
    );
    if (validatePost.length === 0) {
      return res.sendStatus(404);
    }
    if (validatePost[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await postRepository.deletePost(id);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { id } = req.body;
  console.log(req);

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    await connection.query(
      'INSERT INTO likes ("userId", "publicationId") VALUES ($1, $2)',
      [validToken[0].userId, id]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
}

export async function likeDelete(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { id } = req.params;
  console.log(id);

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    await connection.query(
      'DELETE FROM likes WHERE "userId" = $1 AND "publicationId" = $2',
      [validToken[0].userId, id]
    );

    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
}

export async function likeGet(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { id } = req.params;
  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }
  const { rows: checkLike } = await connection.query(
    'SELECT * FROM likes WHERE "publicationId" = $1 AND "userId" = $2',
    [id, validToken[0].userId]
  );
  if (checkLike.length > 0) {
    return res.send(true).status(200);
  }
  return res.send(false).status(200);
}

export async function getAllLikes (req, res) {
  const { id } = req.params;
  try {
    let { rows: countLikes } = await connection.query(`SELECT publications.id, COUNT(publications.id) FROM publications JOIN likes ON publications.id = likes."publicationId" WHERE publications.id = $1 GROUP BY publications.id;`, [id]);
    const { rows: whoLiked } = await connection.query(`SELECT users.username as name, likes."publicationId" as postliked FROM likes JOIN users ON likes."userId" = users.id
    WHERE likes."publicationId" = $1 GROUP BY name, likes."publicationId";`, [id]);
    const count = countLikes[0]?.count || 0;
    res.send( { numberOfLikes: parseInt(count), peopleLiked: whoLiked }).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}