import React, { useEffect, useRef, useState } from "react";

import "./ImageUpload.css";
import Button from "./Button";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickedHandler = async (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    // Access the selected file using event.target.files[0]
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      const { signature, timestamp } = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/upload/cloudinary-sign"
      );
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      const { secure_url } = await sendRequest(url, "POST", formData);
      console.log(secure_url);
      props.onInput(props.id, secure_url, fileIsValid);
    } catch (err) {
      throw new Error("something went wrong");
    }
    // Call the onInput function and pass the picked file to the parent component
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="form-control">
        {isLoading && <LoadingSpinner asOverlay />}
        <input
          id={props.id}
          ref={filePickerRef}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="preview" />}
            {!previewUrl && <p>Please pic an image.</p>}
          </div>
          <Button type="button" onClick={pickImageHandler}>
            PICK IMAGE
          </Button>
        </div>
        {!isValid && <p>{props.errorTexts}</p>}
      </div>
    </>
  );
};

export default ImageUpload;
