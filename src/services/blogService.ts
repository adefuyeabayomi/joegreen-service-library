import axiosInstance from './axiosInstance';

// Define the interface for the blog response type
interface Blog {
  _id?: string;
  title: string;
  highlightParagraph: string;
  created?: string;
  link: string;
  image?: string;
  published?: boolean;
}

class BlogService {
  // Create a new blog post
  static async createBlogPost(blogData: Blog) {
    try {
      const response = await axiosInstance.post('/blogs', blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all blog posts
  static async getAllBlogPosts() {
    try {
      const response = await axiosInstance.get('/blogs');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get a blog post by ID
  static async getBlogPostById(id: string) {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update a blog post by ID
  static async updateBlogPost(id: string, blogData: Blog) {
    try {
      const response = await axiosInstance.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete a blog post by ID
  static async deleteBlogPost(id: string) {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default BlogService;
