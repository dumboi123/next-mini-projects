"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

import { isValidImageUrl, handleImageChange } from "@/app/lib/validator";
const CreateBlog = () => {
  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isValidImage, setIsValidImage] = useState(false);

  const router = useRouter();

  // Kiểm tra ảnh khi imageUrl thay đổi
  useEffect(() => {
    const validateImage = async () => {
      // if (imageUrl instanceof Blob) {
      //   setIsValidImage(true);
      //   return;
      // }
      if (imageUrl) {
        const isValid = await isValidImageUrl(imageUrl);
        setIsValidImage(isValid);
      } else {
        setIsValidImage(false);
      }
    };

    validateImage();
  }, [imageUrl]);

  // Tao id duy nhất cho bài viết
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  // Thêm bài viết mới
  const addData = async () => {
    const currentDate = new Date().toLocaleDateString();
    if (
      !authorRef.current.value.trim() ||
      !titleRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !imageUrl
    ) {
      alert("Please fill in all fields and provide a valid image.");
      return;
    }

    const newId = generateUniqueId();

    const newData = {
      id: newId,
      author: authorRef.current.value,
      date: currentDate,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      imageUrl: imageUrl,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        alert("Bài viết đã được thêm thành công!");
        router.push("/");
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="container bg-light" style={{ marginTop: "5rem" }}>
      <div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Author"
          ref={authorRef}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          ref={titleRef}
        />
        <textarea
          className="form-control mb-2"
          style={{ height: "300px" }}
          placeholder="Description"
          ref={descriptionRef}
        />
        <div className="mb-2"></div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Image URL"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div
          className="flex justify-center"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          {isValidImage && imageUrl?.startsWith("http")  ? (
            <Image src={imageUrl} alt="image" width={400} height={400}></Image>
          ) : (
            <p>
              No image or valid image URL provided. Please upload an image or
              provide a valid image URL.
            </p>
          )}
        </div>
      </div>
      <button onClick={addData} className={`btn btn-primary mb-2 form-control`}>
        Add Data
      </button>
    </div>
  );
};

export default CreateBlog;

// *Chọn nhiều ảnh
// const handleImageChange = (e) => {
//   const files = Array.from(e.target.files); // Chuyển FileList thành mảng
//   const objectUrls = files.map((file) => URL.createObjectURL(file)); // Tạo URL cho từng file
//   setImageUrl(objectUrls); // Lưu danh sách URL vào state
// };
// * Nếu dùng  cách này thì cập nhật state
// const [imageUrl, setImageUrl] = useState([]); // Lưu danh sách URL của ảnh

// * Chọn lựa file
{
  // <label className="form-label">Image Source</label>
  /* <select
          className="form-select mb-2"
          onChange={(e) => setChoice(e.target.value)}
        >
          <option value="">Select Image Source</option>
          <option value="link">Link URL</option>
          <option value="file">From File</option>
        </select>
        {choice === "link" && (
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        )}
        {choice === "file" && (
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setImageUrl(handleImageChange(e))}
          />
        )} */
}
//* Hiện ảnh nếu chọn lựa file
// {imageUrl ? (
//             choice === "link" && isValidImage ? (
//               <Image
//                 src={imageUrl}
//                 alt="image"
//                 width={400}
//                 height={400}
//               ></Image>
//             ) : (
//               <Image
//                 src={imageUrl}
//                 alt="image"
//                 width={400}
//                 height={400}
//               ></Image>
//             )
//           ) : (
//             <p>
//               No image or valid image URL provided. Please upload an image or
//               provide a valid image URL.
//             </p>
//           )}
