import { axiosInstance } from "data/axiosInstance";
import React, { useState } from "react";
import { data } from "react-router";

const useSelectImage = (initialUrl: string = "") => {
  // const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(initialUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("10MB 미만의 이미지만 업로드가 가능합니다.");
        e.target.value = "";
      } else {
        try {
          // setFile(file);
          const formData = new FormData();
          if (file) formData.append("image", file);
          const res = await axiosInstance.postForm(
            `${import.meta.env.VITE_API_URL}/images`,
            formData,
          );
          // setFile(file);
          console.log(res);
          // setUrl(URL.createObjectURL(file));
          setImageUrl(res.data.images[0]);
        } catch (err) {
          console.log("업로드 실패");
        }
      }
    }
  };

  return { imageUrl: imageUrl, handleFileChange };
  // return { file, url, setFile, setUrl, handleFileChange };
};

export default useSelectImage;
