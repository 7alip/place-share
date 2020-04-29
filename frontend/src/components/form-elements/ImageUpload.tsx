import React, {
  useRef,
  ReactEventHandler,
  ChangeEvent,
  useState,
  useEffect,
} from "react";

import "./ImageUpload.scss";
import Button from "./Button";

const ImageUpload: React.FC<{
  id: string;
  center: boolean;
  onInput: (
    id: string,
    pickedFile: File | null | undefined,
    isValid: boolean
  ) => void;
  errorText: string;
}> = (props) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<any>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
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
        type="file"
        ref={filePickerRef}
        style={{ display: "none" }}
        id={props.id}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Previwe" />}
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
