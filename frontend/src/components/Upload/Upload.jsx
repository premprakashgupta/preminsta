import React, { useState } from "react";
import "./Upload.css";
import { Close } from "@material-ui/icons";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { uploadAction } from "../../actions/postAction";
import { useSelector } from "react-redux";

const fileTypes = ["JPEG", "PNG", "JPG"];

function Upload(props) {
  const dispatch = useDispatch();
  const { upload_loading } = useSelector((state) => state.postStorage);
  const [share, setShare] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [caption, setCaption] = useState("");
  const handleChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
        setFileData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleDiscard = () => {
    setDiscard(true);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (caption === "") {
      return alert("Write caption...");
    }
    const formInfo = new FormData();
    formInfo.set("postPic", file);
    formInfo.set("postCaption", caption);

    dispatch(uploadAction(formInfo));
    setTimeout(() => {
      setFile(null);
      setDiscard(false);
      setShare(false);
    }, 2000);
  };
  return (
    <>
      <div className="uploadContainer">
        <span
          className="uploadClose"
          onClick={!file ? props.onChange : handleDiscard}
        >
          <Close />
        </span>
        <div className="uploadSection">
          <form onSubmit={handleUpload} encType="multipart/form-data">
            <h3>
              Create New Post
              <span onClick={() => setShare(true)} className="uploadNext">
                {file && !share && "next"}
              </span>
              {share &&
                (upload_loading ? (
                  <img src="./image/loader.gif" alt="" />
                ) : (
                  <input className="uploadNext" type="submit" value={"share"} />
                ))}
            </h3>
            <div className="uploadContent">
              {file ? (
                <div className="uploadedContent">
                  <img src={fileData} alt="" />
                </div>
              ) : (
                <FileUploader
                  multiple={false}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  label="Drag photos and videos here"
                  classes="uploadBtn"
                />
              )}
              {share && (
                <div className="captionWrite">
                  <div className="head_section">
                    <span>
                      <div className="head_pic">
                        <img src={props.profilePic} alt="" />
                      </div>
                      <div className="head_name">{props.username}</div>
                    </span>
                  </div>
                  <textarea
                    name="postCaption"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Write caption here.."
                    onChange={(e) => setCaption(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
          </form>
        </div>
        {file && discard && (
          <div className="discardBox">
            <h3>Discard posts?</h3>
            <small>If you leave, your edits won't be saved.</small>
            <p onClick={file && props.onChange} className="discardbtn">
              Discard
            </p>
            <p onClick={() => setDiscard(false)}>Cancel</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Upload;
