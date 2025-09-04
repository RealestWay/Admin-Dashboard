// BlogManagement.jsx
import { useState, useEffect } from "react";
import { useBlog } from "../contexts/BlogContext";
import { useAuth } from "../contexts/AuthContext";

const BlogManagement = () => {
  const {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    updateBlogStatus,
    clearError,
  } = useBlog();
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
    image: null,
  });

  useEffect(() => {
    fetchBlogs(statusFilter === "all" ? null : statusFilter);
  }, [statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("status", formData.status);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, submitData, token);
      } else {
        await createBlog(submitData, token);
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        status: "draft",
        image: null,
      });
      setEditingBlog(null);
      setShowForm(false);
    } catch (err) {
      // Error is handled in the context
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      status: blog.status,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blogId);
      } catch (err) {
        // Error is handled in the context
      }
    }
  };

  const handleStatusChange = async (blogId, newStatus, token) => {
    try {
      await updateBlogStatus(blogId, newStatus, token);
    } catch (err) {
      // Error is handled in the context
    }
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      status: "draft",
      image: null,
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6 flex-col gap-5 md:flex-row">
          <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "+ Create New Blog"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button
              onClick={clearError}
              className="mt-2 text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="6"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
                {editingBlog && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center p-2 w-full mb-6">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <div className="flex flex-col items-end">
              <label htmlFor="statusFilter" className="mr-2">
                Filter by status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading blogs...</p>
            </div>
          ) : blogs?.length === 0 ? (
            <div className="text-center py-8">
              <p>No blogs found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs?.map((blog) => (
                <div
                  key={blog?.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md"
                >
                  {blog?.image_url && (
                    <img
                      src={blog?.image_url}
                      alt={blog?.title}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{blog?.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog?.content}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        blog?.status === "published"
                          ? "bg-green-100 text-green-800"
                          : blog?.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {blog?.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(blog?.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(blog, token)}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog?.id, token)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                    {blog?.status !== "published" && (
                      <button
                        onClick={() =>
                          handleStatusChange(blog?.id, "published", token)
                        }
                        className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200"
                      >
                        Publish
                      </button>
                    )}
                    {blog?.status !== "archived" && (
                      <button
                        onClick={() =>
                          handleStatusChange(blog?.id, "archived", token)
                        }
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-200"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
