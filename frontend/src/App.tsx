import { useEffect, useState } from "react";

import { ButtonComponent } from "./components/button/Button.component";
import { GalleryComponent } from "./components/gallery/Gallery.component";
import { InputTextComponent } from "./components/inputText/InputText.component";
import { UploadInputComponent } from "./components/uploadInput/UploadInput.component";
import { WrapperComponent } from "./components/wrapper/Wrapper.component";
import { IImage } from "./App.interface";

import { ImageService } from "./api/ImageService";

import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<Blob>(new Blob());
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await ImageService.getImages();
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleFileInputChange = (e: React.FormEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const removeImage = async (id: number) => {
    try {
      const response = await ImageService.deleteImage(id);

      if (!response) {
        throw new Error("Failed to remove image");
      }

      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const send = async () => {
    try {
      if (file.size === 0) {
        alert("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("description", text);

      const res = await ImageService.saveImage(formData);

      const newCard = {
        id: res.data.id,
        filename: res.data.filename,
        description: res.data.description,
      };

      setText("");
      setFile(new Blob());

      if (res.status === 201) {
        setImages((prevImages) => [...prevImages, newCard]);
      }

      return res;
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="App">
      <WrapperComponent title="Form for uploading files">
        <UploadInputComponent
          type={"file"}
          handleChange={handleFileInputChange}
        />

        <InputTextComponent
          type="text"
          value={text}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          label={"Description"}
          placeholder={"Description text for image"}
        />

        <ButtonComponent text={"Send"} onClick={send} />
      </WrapperComponent>

      <GalleryComponent images={images} removeImage={removeImage} />
    </div>
  );
}

export default App;
