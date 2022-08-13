import likesRepository from "../repositories/likesRepository.js";

export async function validateParam(req, res, next) {
  const param = req.params.id;
  try {
    const { rows: post } = await likesRepository.getPost(param);
    if (post.length === 0) {
      return res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  next();
}