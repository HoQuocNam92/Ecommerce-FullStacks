// pages/media/ImageUpload.jsx
import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Chọn file trước đã!");

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    setPreviewUrl(res.data.url); // backend trả về URL ảnh sau khi lưu
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload ảnh</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {previewUrl && (
        <div className="mt-4">
          <p>Ảnh đã upload:</p>
          <img src={previewUrl} alt="Uploaded" className="w-64 mt-2" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
