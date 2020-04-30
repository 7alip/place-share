import React, { useRef, ChangeEvent, useState, useEffect } from "react";

import "./ImageUpload.scss";
import Button from "./Button";
import { ImageUploadProps } from "../../models/form";

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef!.current!.click();
  };

  const pickedHandler = (event: ChangeEvent) => {
    let pickedFile;
    let fileIsValid = isValid;
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length === 1) {
      pickedFile = target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        type="file"
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
