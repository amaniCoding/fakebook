/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@vercel/postgres";
// import bcrypt from "bcryptjs";

import { User } from "@/app/types/db/query/user";
import { letters, randomTexts, reactions } from "../utils";
const client = await db.connect();

async function seedUser() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      userid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phoneNumber VARCHAR(255),
      fName VARCHAR(255) NOT NULL,
      mName VARCHAR(255),
      lName VARCHAR(255) NOT NULL,
      gender TEXT,
      birthDate TEXT NOT NULL,
      profilePic TEXT,
      coverPic TEXT,
      bio VARCHAR(255),
      work JSONB,
      college JSONB,
      currentCity TEXT,
      homeTown TEXT,
      relationShipStatus TEXT,
      nickName TEXT,
      aboutYou TEXT,
      favouriteQoutes TEXT,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedPost() {
  const usersDb = await client.sql<User>`SELECT * FROM users`;
  const users = usersDb.rows;
  const insertedPosts = await Promise.all(
    Array.from(Array(500).keys()).map(() => {
      const randomUserIndex = Math.floor(Math.random() * 20);
      const randomTextIndex = Math.floor(Math.random() * 20);
      const post = randomTexts[randomTextIndex];

      const randomNumberForIsPost = Math.floor(Math.random() * 5) + 1;
      const isOdd = randomNumberForIsPost % 2 !== 0;

      if (isOdd) {
        return client.sql`INSERT INTO uposts (userid, posttype) VALUES (${users[randomUserIndex].userid}, 'posttype') ON CONFLICT (postid) DO NOTHING;
      `;
      }
      return client.sql`INSERT INTO uposts (userid, post, posttype) VALUES (${users[randomUserIndex].userid}, ${post}, 'posttype') ON CONFLICT (postid) DO NOTHING;
      `;
    })
  );

  return insertedPosts;
}

async function seedCommentReactions() {
  const allPostCommentsdB =
    await client.sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_allPostCommentsdB, _users] = await Promise.all([
    allPostCommentsdB,
    usersdB,
  ]);

  const allComments = _allPostCommentsdB.rows;
  const users = _users.rows;

  const _reactions = await Promise.all(
    allComments.map((comment) => {
      const ReactionArray: string[] = [];

      const randomReactionCount = Math.floor(Math.random() * 7) + 1;

      Array.from(Array(randomReactionCount).keys()).map(() => {
        const randomReactionIndex = Math.floor(Math.random() * 7);
        const reaction = reactions[randomReactionIndex];
        ReactionArray.push(reaction);
      });
      return Promise.all(
        ReactionArray.map((reaction) => {
          const randomReactionCount = Math.floor(Math.random() * 701) + 200;

          return Promise.all(
            Array.from(Array(randomReactionCount).keys()).map(() => {
              const randomUserIndex = Math.floor(Math.random() * 20);
              const randomUser = users[randomUserIndex];
              return client.sql`INSERT INTO ucommentreactions (postid, userid, commentid, reactiontype) VALUES (${comment.postid}, ${randomUser.userid}, ${comment.commentid}, ${reaction}) ON CONFLICT (reactionid) DO NOTHING`;
            })
          );
        })
      );
    })
  );
  return _reactions;
}

async function seedCommentReplies() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ucommentreplies (
      replyid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      commentid UUID NOT NULL,
      reply TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const allCommentsdB =
    await client.sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_allComments, _users] = await Promise.all([allCommentsdB, usersdB]);

  const allComments = _allComments.rows;
  const users = _users.rows;

  const replies = await Promise.all(
    allComments.map((comment) => {
      const randomCommentCount = Math.floor(Math.random() * 701) + 200;

      return Promise.all(
        Array.from(Array(randomCommentCount).keys()).map(() => {
          const randomReplyIndex = Math.floor(Math.random() * 20);
          const randomUserIndex = Math.floor(Math.random() * 20);
          const isOdd = Math.floor(Math.random() * 5) % 2 !== 0;
          const randomUser = users[randomUserIndex];
          const randomReply = randomTexts[randomReplyIndex];

          if (isOdd) {
            return client.sql`INSERT INTO ucommentreplies (postid, userid, commentid, reply) VALUES (${comment.postid}, ${randomUser.userid}, ${comment.commentid}, ${randomReply}) ON CONFLICT (replyid) DO NOTHING`;
          }
          const randomMediaIndex = Math.floor(Math.random() * 26);
          const media = `${letters[randomMediaIndex]}.jpg`;
          return client.sql`INSERT INTO ucommentreplies (postid, userid, commentid, reply, media, type) VALUES (${comment.postid}, ${randomUser.userid}, ${comment.commentid}, ${randomReply}, ${media}, 'image/jpeg') ON CONFLICT (replyid) DO NOTHING`;
        })
      );
    })
  );
  return replies;
}

async function seedReplyReactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS urreactions(
      reactionid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      commentid UUID NOT NULL,
      replyid UUID NOT NULL,
      reactiontype TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const allPostCommentRepliesdB =
    await client.sql`SELECT * FROM uposts JOIN ucomments ON uposts.postid = ucomments.postid JOIN ucommentreplies ON ucommentreplies.commentid = ucomments.commentid`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_allPostCommentRepliesdB, _users] = await Promise.all([
    allPostCommentRepliesdB,
    usersdB,
  ]);

  const allPostCommentReplies = _allPostCommentRepliesdB.rows;
  const users = _users.rows;

  const _reactions = await Promise.all(
    allPostCommentReplies.map((reply) => {
      const ReactionArray: string[] = [];

      const randomReactionCount = Math.floor(Math.random() * 7) + 1;

      Array.from(Array(randomReactionCount).keys()).map(() => {
        const randomReactionIndex = Math.floor(Math.random() * 7);
        const reaction = reactions[randomReactionIndex];
        ReactionArray.push(reaction);
      });
      return Promise.all(
        ReactionArray.map((reaction) => {
          const randomReactionCount = Math.floor(Math.random() * 701) + 200;

          return Promise.all(
            Array.from(Array(randomReactionCount).keys()).map(() => {
              const randomUserIndex = Math.floor(Math.random() * 20);
              const randomUser = users[randomUserIndex];
              return client.sql`INSERT INTO ucommentreactions (postid, userid, commentid, replyid, reactiontype) VALUES (${reply.postid}, ${randomUser.userid}, ${reply.commentid}, ${reply.replyid}, ${reaction}) ON CONFLICT (reactionid) DO NOTHING`;
            })
          );
        })
      );
    })
  );
  return _reactions;
}

async function seeMedias() {
  const postsdB = await client.sql`SELECT * FROM uposts`;
  const posts = postsdB.rows;
  let mediasArray: string[] = [];
  let lettersArray: string[] = [];
  let randomPhotoCount;
  const medias = await Promise.all(
    posts.map((post) => {
      mediasArray = [];
      lettersArray = [];
      randomPhotoCount = Math.floor(Math.random() * 9) + 1;
      const photoOrPost = Math.floor(Math.random() * 5) + 1;
      const isOdd = photoOrPost % 2 !== 0;

      Array.from(Array(randomPhotoCount).keys()).map(() => {
        const randomLetterIndex = Math.floor(Math.random() * 26);
        const letter = letters[randomLetterIndex];
        lettersArray.push(letter);
      });

      lettersArray.map((letter) => {
        mediasArray.push(`/feeds/dummy/${letter}.jpg`);
      });
      if (post.post === null) {
        return Promise.all(
          mediasArray.map((media) => {
            return client.sql`INSERT INTO umedias (postid, media, type) VALUES (${post.postid}, ${media}, 'image/jpeg')`;
          })
        );
      }
      if (isOdd) {
        return;
      }
      /** Recreate */
      lettersArray = [];
      mediasArray = [];
      randomPhotoCount = Math.floor(Math.random() * 9) + 1;
      Array.from(Array(randomPhotoCount).keys()).map(() => {
        const randomLetterIndex = Math.floor(Math.random() * 26);
        const letter = letters[randomLetterIndex];
        lettersArray.push(letter);
      });

      lettersArray.map((letter) => {
        mediasArray.push(`/feeds/dummy/${letter}.jpg`);
      });

      return Promise.all(
        mediasArray.map((media) => {
          return client.sql`INSERT INTO umedias (postid, media, type) VALUES (${post.postid}, ${media}, 'image/jpeg') ON CONFLICT (mediaid) DO NOTHING`;
        })
      );
    })
  );
  return medias;
}

async function seedPostComments() {
  const postsdB = await client.sql`SELECT * FROM uposts`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_posts, _users] = await Promise.all([postsdB, usersdB]);

  const posts = _posts.rows;
  const users = _users.rows;

  const comments = await Promise.all(
    posts.map((post) => {
      const randomCommentCount = Math.floor(Math.random() * 701) + 700;

      return Promise.all(
        Array.from(Array(randomCommentCount).keys()).map(() => {
          const randomCommentIndex = Math.floor(Math.random() * 20);
          const randomPhotoOrComment = Math.floor(Math.random() * 5);
          const isOdd = randomPhotoOrComment % 2 !== 0;
          const randomUserIndex = Math.floor(Math.random() * 20);
          const randomUser = users[randomUserIndex];
          const randomComment = randomTexts[randomCommentIndex];
          if (isOdd) {
            return client.sql`INSERT INTO ucomments (postid, userid, comment) VALUES (${post.postId}, ${randomUser.userid}, ${randomComment}) ON CONFLICT (commentid) DO NOTHING`;
          }
          const randomMediaIndex = Math.floor(Math.random() * 26);
          const media = `/feeds/dummy/${letters[randomMediaIndex]}.jpg`;

          return client.sql`INSERT INTO ucomments (postid, userid, comment, media, type) VALUES (${post.postId}, ${randomUser.userid}, ${randomComment}, ${media}, 'image/jpeg') ON CONFLICT (commentid) DO NOTHING`;
        })
      );
    })
  );
  return comments;
}

async function seedPostMediaComments() {
  const mediasdB =
    await client.sql`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_medias, _users] = await Promise.all([mediasdB, usersdB]);

  const posts = _medias.rows;
  const users = _users.rows;

  const comments = await Promise.all(
    posts.map((media) => {
      const randomCommentCount = Math.floor(Math.random() * 701) + 700;

      return Promise.all(
        Array.from(Array(randomCommentCount).keys()).map(() => {
          const randomCommentIndex = Math.floor(Math.random() * 20);
          const randomUserIndex = Math.floor(Math.random() * 20);
          const randomUser = users[randomUserIndex];
          const randomComment = randomTexts[randomCommentIndex];
          const mediaOrComment = Math.floor(Math.random() * 5);

          const isOdd = mediaOrComment % 2 !== 0;
          if (isOdd) {
            return client.sql`INSERT INTO umediacomments (postid, userid, mediaid, comment) VALUES (${media.postId}, ${randomUser.userid}, ${media.mediaid}, ${randomComment}) ON CONFLICT (commentid) DO NOTHING`;
          }

          const randomLetterIndex = Math.floor(Math.random() * 26);
          const _media = `/feeds/dummy/${letters[randomLetterIndex]}.jpg`;

          return client.sql`INSERT INTO umediacomments (postid, userid, mediaid, comment, media, type) VALUES (${media.postId}, ${randomUser.userid}, ${media.mediaid}, ${randomComment}, ${_media}, 'image/jpeg') ON CONFLICT (commentid) DO NOTHING`;
        })
      );
    })
  );
  return comments;
}

async function seedPostReactions() {
  const postsdB = await client.sql`SELECT * FROM uposts`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_posts, _users] = await Promise.all([postsdB, usersdB]);

  const posts = _posts.rows;
  const users = _users.rows;

  const _reactions = await Promise.all(
    posts.map((post) => {
      const ReactionArray: string[] = [];

      const randomReactionCount = Math.floor(Math.random() * 7) + 1;

      Array.from(Array(randomReactionCount).keys()).map(() => {
        const randomReactionIndex = Math.floor(Math.random() * 7);
        const reaction = reactions[randomReactionIndex];
        ReactionArray.push(reaction);
      });
      return Promise.all(
        ReactionArray.map((reaction) => {
          const randomReactionCount = Math.floor(Math.random() * 701) + 700;

          return Promise.all(
            Array.from(Array(randomReactionCount).keys()).map(() => {
              const randomUserIndex = Math.floor(Math.random() * 20);
              const randomUser = users[randomUserIndex];
              return client.sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${post.postId}, ${randomUser.userid}, ${reaction}) ON CONFLICT (reactionid) DO NOTHING`;
            })
          );
        })
      );
    })
  );
  return _reactions;
}

async function seedPostMediaReactions() {
  const mediasdB =
    await client.sql`SELECT * FROM uposts JOIN umedias ON uposts.postid = umedias.postid`;
  const usersdB = await client.sql`SELECT * FROM users`;

  const [_medias, _users] = await Promise.all([mediasdB, usersdB]);

  const medias = _medias.rows;
  const users = _users.rows;

  const _reactions = await Promise.all(
    medias.map((media) => {
      const ReactionArray: string[] = [];

      const randomReactionCount = Math.floor(Math.random() * 7) + 1;

      Array.from(Array(randomReactionCount).keys()).map(() => {
        const randomReactionIndex = Math.floor(Math.random() * 7);
        const reaction = reactions[randomReactionIndex];
        ReactionArray.push(reaction);
      });
      return Promise.all(
        ReactionArray.map((reaction) => {
          const randomReactionCount = Math.floor(Math.random() * 701) + 200;

          return Promise.all(
            Array.from(Array(randomReactionCount).keys()).map(() => {
              const randomUserIndex = Math.floor(Math.random() * 20);
              const randomUser = users[randomUserIndex];
              return client.sql`INSERT INTO umediareactions (postid, userid, mediaid, reactiontype) VALUES (${media.postId}, ${randomUser.userid}, ${media.mediaid}, ${reaction}) ON CONFLICT (reactionid) DO NOTHING`;
            })
          );
        })
      );
    })
  );
  return _reactions;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await client.sql`COMMIT`;

    //await seedPost();
    //await seeMedias();
    // await seedPostComments();
    await seedPostReactions();
    // await seedPostMediaComments();
    // await seedPostMediaReactions();
    // await seedReplyReactions();
    // await seedCommentReplies();
    // await seedCommentReactions();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
