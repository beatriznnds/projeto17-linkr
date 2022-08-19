import connection from "../database.js";
import { authRepository } from "../repositories/authRepository.js";
import { timelineRepository } from "../repositories/timelineRepository.js";

export async function timeline(req, res) {
  let { page } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  try {
    const { rows: validToken } = await authRepository.searchToken(token);
    console.log(validToken);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: publications } = await timelineRepository.timeline(
      page,
      validToken[0].userId
    );

    res.send(publications).status(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function countTimelinePublications(req, res) {
  const { id } = req.params;
  console.log(id);

  try {
    const { rows: count } = await connection.query(
      "SELECT COUNT(publications.id) as count FROM publications WHERE ID > $1",
      [id]
    );
    console.log(count);
    res.send(count).status(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function userTimeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { id } = req.params;
  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: publications } = await timelineRepository.userTimeline(id);

    res.send(publications).status(200);
  } catch {
    res.sendStatus(400);
  }
}

export async function hashtagTimeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { hashtag } = req.params;

  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: publications } = await timelineRepository.hashtagTimeline(
      hashtag
    );
    publications.map((publication) => {
      publication.description = publication.description.concat(" ");
    });

    const publicationsArray = publications.filter((publication) => {
      return publication.description
        .toLowerCase()
        .includes("#" + hashtag.toLowerCase() + " ");
    });

    res.send([publicationsArray, hashtag]).status(200);
  } catch {
    res.sendStatus(400);
  }
}

export async function trendings(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { hashtag } = req.params;

  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: trendings } = await timelineRepository.trendings();

    res.send(trendings).status(200);
  } catch {
    res.sendStatus(400);
  }
}
