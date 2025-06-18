/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import {
  userDummyData,
  postDummyData,
  commentDummyData,
  replyDummyData,
  postReactionDummyData,
  commentReactionDummyData,
  replyReactionDummyData,
  photoDummyData,
  storyDummyData,
  storyphotoDummyData,
} from "../../libs/placeholders/user/place-holder";
import { User } from "@/app/types/db/query/user";
import { letters, randomTexts } from "../utils";
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

  const insertedUsers = await Promise.all(
    userDummyData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`INSERT INTO users (email, password, phoneNumber, fName, mName,
       lName, gender, birthDate, profilePic, coverPic, bio, work, college, currentCity, 
       homeTown, relationShipStatus, nickName, aboutYou, favouriteQoutes) VALUES
        (${user.email}, ${user.password}, ${user.phoneNumber}, ${user.fName}, 
        ${user.mName}, ${user.lName}, ${user.gender}, ${user.birthDate}, 
        ${user.profilePic}, ${user.coverPic}, ${user.bio}, ${JSON.stringify(
        user.work
      )}, 
        ${JSON.stringify(user.college)}, ${user.currentCity}, ${user.homeTown}, 
        ${user.relationShipStatus}, ${user.nickName}, ${user.aboutYou}, 
        ${user.favouriteQoutes}) ON CONFLICT (userid) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedPost() {
  /*   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS uposts (
      postid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      posttype TEXT NOT NULL,
      userid UUID NOT NULL,
      post TEXT,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `; */
  const randomUserIndex = Math.floor(Math.random() * 20);
  const randomTextIndex = Math.floor(Math.random() * 20);
  const post = randomTexts[randomTextIndex];
  const usersDb = await client.sql<User>`SELECT * FROM users`;
  const users = usersDb.rows;

  const randomNumberForIsPost = Math.floor(Math.random() * 5) + 1;
  const isOdd = randomNumberForIsPost % 2 !== 0;

  const insertedPosts = await Promise.all(
    Array.from(Array(500).keys()).map((_post) => {
      return client.sql`INSERT INTO uposts (posttype, userid, post) VALUES ('userpost', ${
        users[randomUserIndex].userid
      }, ${isOdd ? null : post}) ON CONFLICT (postid) DO NOTHING;
      `;
    })
  );

  return insertedPosts;
}

async function seedMediaComments() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS umediacomments (
      commentid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      mediaid UUID NOT NULL,
      comment TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedStories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ustories (
      storyid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userid UUID NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedStories = await Promise.all(
    storyDummyData.map(async (story) => {
      return client.sql`INSERT INTO ustories (userid) VALUES (${story.userId}) ON CONFLICT (storyid) DO NOTHING;
      `;
    })
  );

  return insertedStories;
}

async function seedComments() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ucomments (
      commentid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      comment TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedComments = await Promise.all(
    commentDummyData.map(async (comment) => {
      return client.sql`INSERT INTO ucomments (postid, userid, comment) VALUES (${comment.postId}, ${comment.userId}, ${comment.comment}) ON CONFLICT (commentid) DO NOTHING
      `;
    })
  );

  return insertedComments;
}

async function seedReplies() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ureplies (
      replyid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      commentid UUID NOT NULL,
      reply TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedReplies = await Promise.all(
    replyDummyData.map(async (reply) => {
      return client.sql`INSERT INTO ureplies (postid, userid, commentid, reply) VALUES (${reply.postId}, ${reply.userId}, ${reply.commentId}, ${reply.reply}) ON CONFLICT (replyid) DO NOTHING;
      `;
    })
  );

  return insertedReplies;
}

async function seedMediaReactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS umediareactions (
      reactionid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      mediaid UUID NOT NULL,
      reactiontype TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedPostReactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ureactions (
      reactionid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      reactiontype TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedPostReactions = await Promise.all(
    postReactionDummyData.map(async (reaction) => {
      return client.sql`INSERT INTO ureactions (postid, userid, reactiontype) VALUES (${reaction.postId}, ${reaction.userId}, ${reaction.reactionType}) ON CONFLICT (reactionid) DO NOTHING
      `;
    })
  );

  return insertedPostReactions;
}

async function seedCommentReactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ucreactions (
      reactionid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      postid UUID NOT NULL,
      userid UUID NOT NULL,
      commentid UUID NOT NULL,
      reactiontype TEXT NOT NULL,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedCommentReactions = await Promise.all(
    commentReactionDummyData.map(async (reaction) => {
      return client.sql`INSERT INTO ucreactions (postid, userid, commentid, reactiontype) VALUES (${
        reaction.postId
      }, ${reaction.userId}, ${
        (reaction.commentId, reaction.reactionType)
      }) ON CONFLICT (reactionid) DO NOTHING;
      `;
    })
  );

  return insertedCommentReactions;
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

  const insertedReplyReactions = await Promise.all(
    replyReactionDummyData.map(async (reaction) => {
      return client.sql`INSERT INTO urreactions (postid, userid, commentid, replyid, reactiontype) VALUES (${reaction.postId}, ${reaction.userId}, ${reaction.commentId}, ${reaction.ReplyId}) ON CONFLICT (reactionid) DO NOTHING;
      `;
    })
  );

  return insertedReplyReactions;
}

async function seeMedias() {
  // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await client.sql`
  //   CREATE TABLE IF NOT EXISTS umedias(
  //     mediaid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     postid UUID NOT NULL,
  //     media TEXT,
  //     type: TEXT,
  //     date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;

  const postsdB = await client.sql`SELECT * FROM uposts`;
  const posts = postsdB.rows;
  let mediasArray: string[] = [];
  let lettersArray: string[] = [];
  let randomPhotoCount;
  const medias = await Promise.all(
    posts.map(async (post) => {
      mediasArray = [];
      lettersArray = [];
      randomPhotoCount = Math.floor(Math.random() * 15) + 1;
      const photoOrPost = Math.floor(Math.random() * 5) + 1;
      const isOdd = photoOrPost % 2 !== 0;

      Array.from(Array(randomPhotoCount).keys()).map((key) => {
        lettersArray.push(letters[key]);
      });

      lettersArray.map((letter) => {
        mediasArray.push(`/feeds/dummy/${letter}.jpg`);
      });
      if (post.post === null) {
        const medias = await Promise.all(
          mediasArray.map((media) => {
            return client.sql`INSERT INTO umedias (postid, media, type) VALUES (${post.postid}, ${media}, 'image/jpeg')`;
          })
        );
        return medias;
      }
      if (isOdd) {
        return;
      }
      /** Recreate */
      lettersArray = [];
      mediasArray = [];
      randomPhotoCount = Math.floor(Math.random() * 15) + 1;
      Array.from(Array(randomPhotoCount).keys()).map((key) => {
        lettersArray.push(letters[key]);
      });

      lettersArray.map((letter) => {
        mediasArray.push(`/feeds/dummy/${letter}.jpg`);
      });

      const medias = await Promise.all(
        mediasArray.map((media) => {
          return client.sql`INSERT INTO umedias (postid, media, type) VALUES (${post.postid}, ${media}, 'image/jpeg') ON CONFLICT (mediaid) DO NOTHING`;
        })
      );
      return medias;
    })
  );
  return medias;
}

async function seedStoryMedias() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS ustorymedias(
      mediaid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      storyid UUID NOT NULL,
      media TEXT,
      type TEXT,
      date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedStoryPhotos = await Promise.all(
    storyphotoDummyData.map(async (photo) => {
      return client.sql`INSERT INTO ustorymedias (storyid, media, type) VALUES (${photo.storyId}, ${photo.media}, ${photo.type}) ON CONFLICT (mediaid) DO NOTHING;
      `;
    })
  );

  return insertedStoryPhotos;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await client.sql`COMMIT`;

    await seedPost();
    //await seeMedias();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
