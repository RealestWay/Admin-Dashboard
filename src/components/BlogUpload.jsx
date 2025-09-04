import { useState } from "react";

export default function BlogUploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        setMessage("✅ Blog uploaded successfully!");
        setFormData({
          title: "",
          slug: "",
          description: "",
          content: "",
          date: new Date().toISOString().split("T")[0],
          image: null,
        });
      } else {
        const errorText = await res.text();
        throw new Error(errorText);
      }
    } catch (err) {
      setMessage(`❌ Upload failed: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#100073]">Upload Blog Post</h2>

      <input
        type="text"
        name="title"
        placeholder="Blog title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={formData.slug}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Short description (for SEO and blog listing)"
        value={formData.description}
        onChange={handleChange}
        required
        rows={3}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="content"
        placeholder="Full blog content"
        value={formData.content}
        onChange={handleChange}
        required
        rows={10}
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="p-2"
      />

      <button
        type="submit"
        className="bg-[#00a256] text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload Blog
      </button>

      {message && <p className="text-sm text-center mt-4">{message}</p>}
    </form>
  );
}
