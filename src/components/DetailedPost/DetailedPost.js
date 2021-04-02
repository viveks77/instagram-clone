import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {format} from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import styles from "./DetailedPost.module.css";
import Follow from "../UI/Follow/Follow";
import Avatar from "../UI/Avatar/Avatar";
import axios from "../../axios";
import LikePost from "../UI/LikePost/LikePost";
import SavePost from "../UI/SavePost/SavePost";
import Comments from "../Comments/Comments";
import { CommentIcon, InboxIcon, MoreIcon} from "../UI/Icons";
import Modal from "../UI/Modal/Modal";

const DetailedPost = (props) => {
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const id = props.match.params.id;
  const token = props.token;

  useEffect(() => {

    const fetchPost = async () => {
      await axios
        .get(`getpost/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setPost(response.data.post);
          setLikesCount(response.data.post.likesCount);
          setPostComments(response.data.comments);
        })
        .catch((error) => console.log(error));
    };

    fetchPost();
  }, [id, token]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/addcomment", {
      id : props.match.params.id,
      comment : comment
    }, {
      headers : {Authorization : "Bearer " + props.token}
    }).then(response => {
      setPostComments(response.data.comment);
      setComment("");
    })
    .catch(error => {
      console.log(error);
    });

  }

  const deletePostHandler = async () => {
    await axios.delete(`/post/delete/${props.match.params.id}`, {
      headers : {Authorization : "Bearer " + props.token}
    }).then(response => {
      props.history.replace("/");
    }).catch(error => {
      
    })
  }

  const toggleLikeInc = () => {
    setLikesCount(likesCount + 1);
  };

  const toggleLikeDec = () => {
    setLikesCount(likesCount - 1);
  };

  const userRedirectHandler = () => {
    props.history.push(`/user/${post.user.username}`);
  };

  const toggleModalHandler = () => {
    let oldProp = showModal;
    setShowModal(!oldProp);
  }

  if (!post) {
    return null;
  }
  let follow = null;
  if (!post.isFollowing && !post.isMine) {
    follow = <Follow user={post.user.username} />;
  }

  let likes = null;
  if(likesCount === 0){
      likes = <span style={{fontWeight: "500"}}>Be the first one to like</span>
  }else if(likesCount === 1){
      likes = <span><strong>{likesCount}</strong> like</span>
  }else{
      likes = <span><strong>{likesCount}</strong> likes</span>
  }

  let createdAt = null;
  let isTrue = post.createdAt.split("T")[0] === new Date().toISOString().split("T")[0];
  if(isTrue){
      createdAt = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix : true
      }).toUpperCase();
  }else{
      createdAt = format(new Date(post.createdAt), 'LLLL d').toUpperCase();
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <img
          className={styles.PostImg}
          src={"data:image/png;base64," + post.files}
          alt=""
        />
        <div className={styles.SideBar}>
          <div className={styles.UserCardHeader}>
            <div className={styles.UserCard}>
            <Avatar imgSrc={"data:image/png;base64," + post.user.avatar} />
            <span onClick={userRedirectHandler}>
              <strong>{post.user.username}</strong>
            </span>
            {follow}
            </div>
            <MoreIcon onClick={toggleModalHandler}/>
          </div>
          <div className={styles.Comments}>
            <Comments data={postComments}/>
          </div>
          <div className={styles.PostActions}>
            <div>
            <LikePost
              isLiked={post.isLiked}
              postId={post._id}
              likeInc={toggleLikeInc}
              likeDec={toggleLikeDec}
            />
            <CommentIcon />
            <InboxIcon />
            </div>
            <SavePost saved={post.isSaved} postId={post._id}/>
          </div>
          <p style={{ margin: "4px 0px 3px 8px" }}>
            {likes}
          </p>
          <div className={styles.PostCaption}>
            <p>
              <>{post.caption}</>
            </p>
            <p style={{color : "#8e8e8e", fontSize: "0.9rem"}}>
              {createdAt}
            </p>
          </div>
          <div className={styles.AddComment}>
            <form onSubmit={(event) => handleCommentSubmit(event)}>
              <input onChange={(e) => setComment(e.target.value)} name="comment" value={comment} placeholder="Add a comment" />
            </form>
          </div>
        </div>
      </div>
      <Modal show={showModal} toggleModal={toggleModalHandler}>
        <div className={styles.Modal}>
          <p onClick={userRedirectHandler}>Go to Profile</p>
          {post.isMine ? <p style={{color : "red"}} onClick={deletePostHandler}>Delete Post</p> : null}
          <p style={{color : "#8e8e8e"}}>More features comming soon.</p>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(DetailedPost);
