"use client";
import React, { useRef, useState, useEffect } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
function ImagePicker({ label, name, defaultImage }) {
  const imageInputRef = useRef();
  const [pickedImage, setPickedImage] = useState(defaultImage || null);

  useEffect(() => {
    setPickedImage(defaultImage || null);
  }, [defaultImage]);
  const handlePickClick = () => {
    imageInputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const imageSrc = pickedImage?.startsWith("data:image")
    ? pickedImage
    : `/${pickedImage}`;

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>Choose an Image:</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={imageSrc}
              alt="Preview"
              // width={500} // Set width to define image size
              // height={500} // Set height to define image size
              objectFit="contain" // Optional: Adjust object fit for better scaling
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        {defaultImage ? "Replace" : "Pick an Image"}
      </button>
    </div>
  );
}

export default ImagePicker;
