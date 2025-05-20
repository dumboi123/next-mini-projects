"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { isValidImageUrl, handleImageChange } from "@/app/lib/validator";

const UpdateBlog = () => {
  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const id = useRef(null);

  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isValidImage, setIsValidImage] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    id.current = searchParams.get("id");

    const fetchBlogById = async () => {
      try {
        const response = await fetch(`/api/${id.current}`);
        if (response.ok) {
          const blog = await response.json();

          authorRef.current.value = blog.author;
          titleRef.current.value = blog.title;
          descriptionRef.current.value = blog.description;

          setImageUrl(blog.imageUrl);
        } else {
          console.error("Failed to fetch blog by id");
        }
      } catch (error) {
        console.error("Error fetching blog by id:", error);
      }
    };
    fetchBlogById();
  }, []);

  useEffect(() => {
    const validateImage = async () => {
      if (imageUrl instanceof Blob) {
        setIsValidImage(true);
        return;
      }
      if (imageUrl) {
        const isValid = await isValidImageUrl(imageUrl);
        setIsValidImage(isValid);
      } else {
        setIsValidImage(false);
      }
    };

    validateImage();
  }, [imageUrl]);

  const updateData = async () => {
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
    const newData = {
      id: id.current,
      author: authorRef.current.value,
      date: currentDate,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      imageUrl: imageUrl,
    };

    try {
      const response = await fetch(`/api/${id.current}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        alert("Bài viết đã được sửa thành công!");
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
          placeholder="Description"
          style = {{height: "300px"}}
          ref={descriptionRef}
        />
        <div className="mb-2"></div>
        <label className="form-label">Image Source</label>
        <select
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
        )}
        <div
          className="flex justify-center"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          {imageUrl ? (
            choice === "link" && isValidImage ? (
              <Image
                src={imageUrl}
                alt="image"
                width={400}
                height={400}
              ></Image>
            ) : (
              <Image
                src={imageUrl}
                alt="image"
                width={400}
                height={400}
              ></Image>
            )
          ) : (
            <p>
              No image or valid image URL provided. Please upload an image or
              provide a valid image URL.
            </p>
          )}
        </div>
      </div>
      <button
        onClick={updateData}
        className={`btn btn-primary mb-2 form-control`}
      >
        Update Data
      </button>
    </div>
  );
};

export default UpdateBlog;
