import { Post } from "@/app/types/db/query/post";
import { sql } from "@vercel/postgres";
import {
  firstReactor,
  medias,
  groupReactions,
  isReacted,
  totalReactions,
  totalComments,
  MediasInfo,
  constructGroupReactionInfo,
} from "../utils/post";
import { LoggedInUser } from "@/app/config/loggedinuser";

export async function fetchPostsCount() {
  const allPostsForRowCount =
    await sql<Post>`SELECT * FROM uposts JOIN users ON uposts.userid = users.userid ORDER BY uposts.date DESC`;
  return {
    page: 1,
    rowCount: allPostsForRowCount.rowCount,
  };
}

export async function fetchPosts(userId: string, page: number) {
  const offset = (page - 1) * 5;
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
        ] = await Promise.all([
          isReacted(row.postid, userId),
          totalReactions(row.postid),
          groupReactions(row.postid),
          firstReactor(row.postid),
          medias(row.postid),

          totalComments(row.postid),
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
            comments: {
              loading: true,
              page: 1,
              comments: [],
            },
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
          groupReactionInfo: await Promise.all(
            _groupPostReactions.map((reaction) => {
              return constructGroupReactionInfo(row.postid, reaction);
            })
          ),
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
        ] = await Promise.all([
          isReacted(row.postid, userId),
          totalReactions(row.postid),
          groupReactions(row.postid),
          firstReactor(row.postid),
          medias(row.postid),
          totalComments(row.postid),
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
            comments: {
              loading: true,
              comments: [],
              page: 1,
            },
          },

          reactionInfo: {
            isReacted: _isPostReactedByLoggedInUser.isReacted,
            reactionType: _isPostReactedByLoggedInUser.reactionType,
            firstReactorInfo: _firstReactorInfo,
            reactions: _totalPostReactions,
            reactionGroup: _groupPostReactions,
          },
          groupReactionInfo: await Promise.all(
            _groupPostReactions.map((reaction) => {
              return constructGroupReactionInfo(row.postid, reaction);
            })
          ),
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
    ] = await Promise.all([
      fetchPost(postId),
      MediasInfo(postId),
      isReacted(postId, LoggedInUser.userid),
      totalReactions(postId),
      groupReactions(postId),
      firstReactor(postId),
      totalComments(postId),
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
        comments: {
          loading: true,
          comments: [],
          page: 1,
        },
      },

      reactionInfo: {
        isReacted: _isPostReactedByLoggedInUser.isReacted,
        reactionType: _isPostReactedByLoggedInUser.reactionType,
        firstReactorInfo: _firstReactorInfo,
        reactions: _totalPostReactions,
        reactionGroup: _groupPostReactions,
      },
      groupReactionInfo: await Promise.all(
        _groupPostReactions.map((reaction) => {
          return constructGroupReactionInfo(postId, reaction);
        })
      ),
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
