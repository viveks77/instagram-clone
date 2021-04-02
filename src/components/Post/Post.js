import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Post.module.css";
import Avatar from "../UI/Avatar/Avatar";
import { format } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import LikePost from "../UI/LikePost/LikePost";
import SavePost from "../UI/SavePost/SavePost";
import { CommentIcon, InboxIcon } from "../UI/Icons";

const Post = ({ data }) => {
  const history = useHistory();
  const [likesCount, setLikesCount] = useState(data.likesCount);

  const detailedPostRedirect = () => {
    history.push(`/post/${data._id}`)
  }

  const toggleLikeInc = () => {
    setLikesCount(likesCount + 1);
  };

  const toggleLikeDec = () => {
    setLikesCount(likesCount - 1);
  };

  const userRedirectHandler = () => {
    history.push(`/user/${data.user.username}`);
  };

  let likes = null;
  if (likesCount === 0) {
    likes = <span style={{ fontWeight: "500" }}>Be the first one to like</span>;
  } else if (likesCount === 1) {
    likes = (
      <span>
        <strong>{likesCount}</strong> like
      </span>
    );
  } else {
    likes = (
      <span>
        <strong>{likesCount}</strong> likes
      </span>
    );
  }

  let createdAt = null;
  let isTrue =
    data.createdAt.split("T")[0] === new Date().toISOString().split("T")[0];
  if (isTrue) {
    createdAt = formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    }).toUpperCase();
  } else {
    createdAt = format(new Date(data.createdAt), "LLLL d, y").toUpperCase();
  }

  let comment = null;
  if(data.commentsCount > 0){
    comment = <span>View all {data.commentsCount} comments</span>
  }else {
    comment = <span>Be the first one to comment</span>
  }

  return (
    <div className={styles.PostWrapper}>
      <div className={styles.PostHeader}>
        <Avatar imgSrc={"data:image/png;base64," + data.user.avatar} />
        <p onClick={userRedirectHandler}>{data.user.username}</p>
      </div>
      <div
        onClick={detailedPostRedirect}
        className={styles.PostImg}
      >
        <img src={"data:image/png;base64," + data.files} alt="" />
      </div>
      <div className={styles.PostActions}>
        <div>
        <LikePost
          isLiked={data.isLiked}
          postId={data._id}
          likeInc={toggleLikeInc}
          likeDec={toggleLikeDec}
        />
        <CommentIcon onClick={detailedPostRedirect} style={{cursor : "pointer"}}/>
        <InboxIcon />
        </div>
        <SavePost saved={data.isSaved} postId={data._id}/>
      </div>
      <p style={{ margin: "4px 0px 3px 8px" }}>{likes}</p>
      <div className={styles.PostCaption}>
        <p style={{ color: "#8e8e8e", fontSize: "0.9rem" }}>{createdAt}</p>
        <p>
          <strong>{data.user.username}</strong> {data.caption}
        </p>
      </div>
      <div className={styles.CommentsSection}>
        <p onClick={detailedPostRedirect} style={{ color: "#8e8e8e", fontSize: "0.9rem", margin : "3px 0px", cursor: "pointer"}}>{comment}</p>
      </div>
    </div>
  );
};

export default Post;
