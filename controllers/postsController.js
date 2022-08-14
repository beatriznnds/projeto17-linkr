import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";
import connection from "../database.js";

export async function newPost(req, res) {
  const { link, description } = req.body;
  const { userId } = res.locals;
  try {
    urlMetadata(link).then(
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
    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  console.log(req.body)
  const { publicationId, description } = req.body;
  const { userId } = res.locals;

  try {
    const { rows: validatePost } = await postRepository.searchPost(
      publicationId
    );

    if (validatePost.length === 0) {
      return res.sendStatus(404);
    }
    if (validatePost[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await postRepository.editPost(description, publicationId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { authorization } = req.headers;
  const { publicationId } = req.body;

  const token = authorization?.replace("Bearer", "").trim();

  const { rows: validToken } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  const userId = validToken[0].userId;

  try {
    const { rows: validatePost } = await postRepository.searchPost(
      publicationId
    );
    if (validatePost.length === 0) {
      return res.sendStatus(404);
    }
    if (validatePost[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await postRepository.deletePost(publicationId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
