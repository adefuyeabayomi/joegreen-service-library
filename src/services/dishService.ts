import axiosInstance from "./axiosInstance";

interface Dish {
    _id: string;
  name: string;
  addons: string[];
  description: string;
  published: boolean;
  image: string; // Add this property
}

interface DishResponse {
  data: Dish;
}

interface DishListResponse {
  data: Dish[];
}

export interface DishServiceResponseType {
  // Define properties based on API responses
  _id: string;
  name: string;
  addons: string[];
  description: string;
  published: boolean;
  image: string;
}

const dishService = {
  // Get all dishes
  getDishes: async (): Promise<DishListResponse> => {
    try {
      const response = await axiosInstance.get('/dishes');
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get a dish by ID
  getDishById: async (id: string): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.get(`/dishes/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Create a new dish
  createDish: async (dish: Dish): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.post('/dishes', dish);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update an existing dish
  updateDish: async (id: string, dish: Partial<Dish>): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.put(`/dishes/${id}`, dish);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update dish image
  updateDishImage: async (id: string, image: File): Promise<DishResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axiosInstance.patch(`/dishes/${id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get all categories
  getAllCategory: async (): Promise<DishListResponse> => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get a category by ID
  getCategoryById: async (id: string): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Create a new category
  createCategory: async (category: { name: string; description: string; published: boolean }): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.post('/categories', category);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update an existing category
  updateCategory: async (id: string, category: { name?: string; description?: string; published?: boolean }): Promise<DishResponse> => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, category);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Delete a dish or category
  delete: async (id: string, type: 'dishes' | 'categories'): Promise<void> => {
    try {
      await axiosInstance.delete(`/${type}/${id}`);
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  }
};

export default dishService;
