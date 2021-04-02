import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from '../UI/Loader/Loader';
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SuggestedPosts from "../SuggestedPosts/SuggestedPosts";
import styles from "./DetailedUser.module.css";
import Placeholder from "../UI/Placeholder/Placeholder";
import { PostIcon } from "../UI/Icons";
import axios from "../../axios";
import { Redirect } from "react-router";

const DetailedUser = (props) => {
  const [user, setUser] = useState(null);
  const id = props.match.params.id;
  const token = props.token;
  useEffect(() => {
  
    const getUser = async () => {
      await axios
        .post(
          "/getuser",
          {
            username:id,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
              console.log(response.data.user);
              setUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };


    getUser();
  }, [id, token]);

  if (!user) {
    return <Loader />;
  }

  if(user.isMe){
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <ProfileHeader user={user} />
      {user.isFollowing || user.isPublic ? (
        <React.Fragment>
          <div className={styles.ProfileTab}>
        <div>
          <PostIcon /> <span>POSTS</span>
        </div>
      </div>
      {(
        <div className={styles.Tab}>
          {user.posts.length === 0 ? (
            <Placeholder
              title="Posts"
              text="User has no posts yet."
              icon="post"
            />
          ) : (
            <SuggestedPosts posts={user.posts} />
          )}
        </div>
      )}
        </React.Fragment>
      ) : (
        <h3>Follow the user to see his posts</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(DetailedUser);
