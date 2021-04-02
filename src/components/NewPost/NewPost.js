import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styles from "./NewPost.module.css";
import axios from "../../axios";

const NewPost = (props) => {
  const [preview, setPreview] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [caption, setCaption] = useState(" ");
  const [showModal, setShowModal] = useState(false);

  const handleUploadImage = (event) => {
    if (event.target.files[0]) {
      setPostImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowModal(true);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCancelButton = () => {
    props.history.push({
      pathname: "/",
    });
  };

  const handleSubmitHandler = async () => {
    let formData = new FormData();
    formData.append("post", postImage);
    formData.append("caption", caption);
    await axios
      .post("/addpost", formData, {
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Your post have been uploaded");
        props.history.push({
            pathname: "/",
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.Wrapper}>
      {!showModal && (
        <input
          className={styles.ImageInput}
          type="file"
          onChange={handleUploadImage}
          accept="image/*"
        />
      )}
      {showModal && (
        <div className={styles.PostWrapper}>
          <div className={styles.NewPostHeader}>
            <h3 onClick={handleCancelButton}>Cancel</h3>
            <h3 onClick={handleSubmitHandler}>Share</h3>
          </div>
          <div className={styles.NewPost}>
            {preview && <img src={preview} alt="preview" />}
            <textarea
              type="text"
              placeholder="Add caption"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(NewPost);
