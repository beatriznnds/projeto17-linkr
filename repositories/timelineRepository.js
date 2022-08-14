import connection from "../database.js";

async function timeline(){
    return connection.query(
        'SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id ORDER BY publications."createdAt" desc LIMIT 20'
      );
}

async function userTimeline(id){
    return connection.query(
        'SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id WHERE users.id = $1 ORDER BY publications."createdAt" desc LIMIT 20',
        [id]
      );
}

async function hashtagTimeline(hashtag){
    return connection.query(
        `SELECT publications.*, users."username", users."profilePic" FROM publications JOIN users ON publications."userId" = users.id WHERE description LIKE $1 ORDER BY publications."createdAt" desc LIMIT 20`, ['%' + hashtag + '%']
    )
}

async function trendings(){
    return connection.query(
        `SELECT id, name, COUNT(name) AS "valueOccurrence" FROM hashtags GROUP BY name ORDER BY "valueOccurrence" DESC LIMIT 10`
    )
}

export const timelineRepository = {
    timeline,
    userTimeline,
    hashtagTimeline,
    trendings
}