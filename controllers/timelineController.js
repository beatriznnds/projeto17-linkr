import { authRepository } from "../repositories/authRepository.js";
import { timelineRepository } from "../repositories/timelineRepository.js"

export async function timeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: publications } = await timelineRepository.timeline();

    res.send(publications).status(200);
  } catch {
    res.sendStatus(400);
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

export async function hashtagTimeline(req, res){
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const { hashtag } = req.params;

  try {
    const { rows: validToken } = await authRepository.searchToken(token);

    if (validToken.length === 0) {
      return res.sendStatus(401);
    }

    const { rows: publications } = await timelineRepository.hashtagTimeline(hashtag);

    res.send([publications, hashtag]).status(200);
  } catch {
    res.sendStatus(400);
  }
}

export async function trendings(req, res){
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