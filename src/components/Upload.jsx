import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return; // Exit if no file is selected
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      const response = await axios.post(
        "https://landoc-api-2.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      // Check if HTML content is returned
      if (response.data.html_content) {
        // Pass the HTML content to DocumentView
        navigate("/edit", {
          state: { htmlContent: response.data.html_content },
        });
      } else {
        console.error("No HTML content returned:", response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="border border-black p-[20px] flex sm:flex-row flex-col items-center justify-between w-full gap-[20px]">
    <input type="file" onChange={handleFileChange} className="w-full"/>
    <button
      onClick={handleUpload}
      className="bg-blue-600 py-[10px] font-bold text-white rounded-lg px-[20px] "
    >
      Upload
    </button>
  </div>
  );
};

export default Upload;
