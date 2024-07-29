import axiosInstance from './axiosInstance';

// Define the interface for the blog response type
export interface BlogType {
  _id?: string;
  title: string;
  highlightParagraph: string;
  created?: string;
  link: string;
  image?: string;
  published?: boolean;
  message?:string
}

  const createBlogPost = async (blogData: FormData,token:string): Promise<BlogType> => {
    try {
      const response = await axiosInstance.post('/blogs', blogData,
        { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all blog posts
  const getAllBlogPosts = async (): Promise<BlogType[]> => {
    try {
      const response = await axiosInstance.get('/blogs');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get a blog post by ID
  const getBlogPostById = async (id: string): Promise<BlogType> =>{
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update a blog post by ID
  const updateBlogPost = async (id: string, blogData: FormData | object,token:string): Promise<BlogType> => {
    try {
      const response = await axiosInstance.put(`/blogs/${id}`, blogData,
        { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete a blog post by ID
  const deleteBlogPost= async (id: string,token:string): Promise<BlogType> => {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

const BlogService = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}
export default BlogService;
