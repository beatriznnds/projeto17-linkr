import connection from "../database.js";

async function createHashtag(hashtag){
    return connection.query(`INSERT INTO hashtags (hashtag) VALUES ($1)`, [hashtag])
}

export const hashtagRepository = {
    createHashtag
}