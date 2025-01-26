"use client";
import React, { useRef, useState, useEffect } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
function ImagePicker({ label, name, defaultImage }) {
  const imageInputRef = useRef();
  const [error, setError] = useState("");
  const [pickedImage, setPickedImage] = useState(defaultImage || null);
  useEffect(() => {
    setPickedImage(defaultImage || null);
  }, [defaultImage]);
  const handlePickClick = () => {
    imageInputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setError("");
    if (!file) {
      setPickedImage(null);
      console.log("Image not selected. Please select an image.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid PNG or JPEG image.");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.onerror = () => {
      setError("Error reading file. Please try again.");
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
          required={!pickedImage}
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
        aria-controls={name}
      >
        {defaultImage ? "Replace" : "Pick an Image"}
      </button>
      {error && (
        <p
          className="text-red-600 text-sm mt-1"
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default ImagePicker;
