import { Post } from "@/app/types/db/query/post";
import { sql } from "@vercel/postgres";
import {
  firstReactor,
  medias,
  groupReactions,
  isReacted,
  totalReactions,
  comments,
  totalComments,
  MediasInfo,
} from "../utils/post";
import { LoggedInUser } from "@/app/config/loggedinuser";

export async function fetchPosts(userId: string, page: number = 1) {
  const offset = (page - 1) * 10;
  try {
    const posts =
      await sql<Post>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC LIMIT 5 OFFSET ${offset}`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const [
          _isPostReactedByLoggedInUser,
          _totalPostReactions,
          _groupPostReactions,
          _firstReactorInfo,
          _medias,
          _commentsCount,
          _comments,
        ] = await Promise.all([
          isReacted(row.postid, userId),
          totalReactions(row.postid),
          groupReactions(row.postid),
          firstReactor(row.postid),
          medias(row.postid),

          totalComments(row.postid),
          comments(row.postid),
        ]);
        return {
          postId: row.postid,
          post: row.post,
          date: row.date,

          medias: _medias,
          user: {
            userId: row.userid,
            fName: row.fname,
            lName: row.lname,
            profilePic: row.profilepic,
          },

          commentInfo: {
            commentsCount: _commentsCount[0].comments,
            comments: _comments,
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
        };
      })
    );
    return allPosts;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch feed data");
  }
}

export async function fetchNewPost(userId: string, postId: string) {
  try {
    const posts =
      await sql<Post>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE uposts.postid = ${postId} ORDER BY uposts.date DESC`;
    const allPosts = await Promise.all(
      posts.rows.map(async (row) => {
        const [
          _isPostReactedByLoggedInUser,
          _totalPostReactions,
          _groupPostReactions,
          _firstReactorInfo,
          _medias,
          _commentsCount,
          _comments,
        ] = await Promise.all([
          isReacted(row.postid, userId),
          totalReactions(row.postid),
          groupReactions(row.postid),
          firstReactor(row.postid),
          medias(row.postid),
          totalComments(row.postid),
          comments(row.postid),
        ]);
        return {
          postId: row.postid,
          post: row.post,
          date: row.date,

          medias: _medias,
          user: {
            userId: row.userid,
            fName: row.fname,
            lName: row.lname,
            profilePic: row.profilepic,
          },

          commentInfo: {
            commentsCount: _commentsCount[0].comments,
            comments: _comments,
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
        };
      })
    );
    return allPosts;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Faild to fetch feed data");
  }
}

export async function fetchPostInfo(postId: string) {
  try {
    const [
      post,
      medias,
      _isPostReactedByLoggedInUser,
      _totalPostReactions,
      _groupPostReactions,
      _firstReactorInfo,

      _commentsCount,
      _comments,
    ] = await Promise.all([
      fetchPost(postId),
      MediasInfo(postId),
      isReacted(postId, LoggedInUser.userid),
      totalReactions(postId),
      groupReactions(postId),
      firstReactor(postId),
      totalComments(postId),
      comments(postId),
    ]);

    return {
      postId: post[0].postid,
      post: post[0].post,
      date: post[0].date,
      user: {
        userId: post[0].userid,
        fName: post[0].fname,
        lName: post[0].lname,
        profilePic: post[0].profilepic,
      },
      medias: medias,
      commentInfo: {
        commentsCount: _commentsCount[0].comments,
        comments: _comments,
      },

      reactionInfo: {
        isReacted: _isPostReactedByLoggedInUser.isReacted,
        reactionType: _isPostReactedByLoggedInUser.reactionType,
        firstReactorInfo: _firstReactorInfo,
        reactions: _totalPostReactions,
        reactionGroup: _groupPostReactions,
      },
    };
  } catch (error) {
    console.log("Failed to fetch postinfo", error);
  }
}

export async function fetchPost(postId: string) {
  const data =
    await sql<Post>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid WHERE uposts.postid = ${postId}`;
  return data.rows;
}
