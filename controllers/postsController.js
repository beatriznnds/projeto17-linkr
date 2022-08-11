import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";
import connection from "../database.js";

export async function newPost(req, res) {
  const { link, description } = req.body;
  const { userId } = res.locals;

  urlMetadata(link).then(
    function (metadata) {
      // success handler
      await connection.query('INSERT INTO publications (url, title, image, description) VALUES ($1, $2, $3)', [metadata.url, metadata.title, metadata.image, metadata.description])
    },
    function (error) {
      // failure handler
      console.log(error);
    }
  );

  try {
    await postRepository.addNewPost(userId, link, description);
    return res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}
