// blogContext.jsx
import { createContext, useContext, useState } from "react";

// Create Context
const BlogContext = createContext();

// Custom Hook
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

// Provider Component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs with optional status filter
  const fetchBlogs = async (status = null) => {
    setLoading(true);
    setError(null);

    try {
      let url = "https://backend.realestway.com/api/blogs";
      if (status) {
        url += `?status=${status}`;
      }

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs(data.data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new blog
  const createBlog = async (formData, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://backend.realestway.com/api/blogs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a blog
  const updateBlog = async (blogId, formData, token) => {
    setLoading(true);
    setError(null);

    try {
      // Add _method=PUT to formData for Laravel API
      const updatedFormData = new FormData();
      for (let [key, value] of formData.entries()) {
        updatedFormData.append(key, value);
      }
      updatedFormData.append("_method", "PUT");

      const response = await fetch(
        `https://backend.realestway.com/api/blogs/${blogId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: updatedFormData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === blogId ? data : blog))
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (blogId, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update blog status
  const updateBlogStatus = async (blogId, status, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/blogs/${blogId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === blogId ? data : blog))
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    updateBlogStatus,
    clearError,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContext;
