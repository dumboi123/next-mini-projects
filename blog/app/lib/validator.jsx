"use server";
// const axios = require("axios");
const isValidImageUrl = async (url) => {
  console.log("url", url);
  try {
    const response = await fetch(url, { method: "HEAD" });
    console.log("chech        ",response.headers.get("Content-Type"));
    // const response = await axios.head(url);
    return (
      response.ok && response.headers.get("Content-Type").startsWith("image/")
    );
  } catch {
    return false;
  }
};

const handleImageChange = (e) => {
  const file = e.target?.files?.[0];
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  }
};

export { isValidImageUrl, handleImageChange };
