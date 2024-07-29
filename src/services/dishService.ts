import axiosInstance from "./axiosInstance";

export interface Dish {
    _id?: string;
  name: string;
  addons: { name: string; price: number; quantity?:number, _id:string}[];
  description: string;
  price: number;
  published?: boolean;
  category?:string;
  image?: string; // Add this property
  message?: string;
}
export interface QueryOptions {
  [key: string]: string | number | boolean; // Adjust types based on your needs
}

export interface DishServiceResponseType {
  // Define properties based on API responses
  _id: string;
  name: string;
  addons: { name: string; price: number; }[];
  description: string;
  price: number;
  category?:string;
  published: boolean;
  image: string;
  message?: string;
}

const dishService = {
  getDishes: async (queryOptions: QueryOptions = {}): Promise<Dish[]> => {
    try {
      // Construct query string from queryOptions
      const queryString = new URLSearchParams(queryOptions as Record<string, string>).toString();
      // Construct full URL with query string
      const url = queryString ? `/dishes?${queryString}` : '/dishes';
      console.log({url})
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching dishes:', error);
      throw error; // Pass the error to the caller
    }
  },

  // Get a dish by ID
  getDishById: async (id: string): Promise<Dish> => {
    try {
      const response = await axiosInstance.get(`/dishes/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Create a new dish
  createDish: async (dish: Dish,token:string): Promise<Dish> => {
    try {
      const response = await axiosInstance.post('/dishes', dish,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update an existing dish
  updateDish: async (id: string, dish: Partial<Dish>,token:string): Promise<Dish> => {
    try {
      const response = await axiosInstance.put(`/dishes/${id}`, dish,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update dish image
  updateDishImage: async (id: string, image: File,token:string): Promise<Dish> => {
    try {
      const formData = new FormData();
      formData.append('files', image);

      const response = await axiosInstance.put(`/dishes/${id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get all categories
  getAllCategory: async (): Promise<Dish[]> => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get a category by ID
  getCategoryById: async (id: string): Promise<Dish> => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Create a new category
  createCategory: async (category: { name: string; description: string; published: boolean },token:string): Promise<Dish> => {
    try {
      const response = await axiosInstance.post('/categories', category,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Update an existing category
  updateCategory: async (id: string, category: { name?: string; description?: string; published?: boolean },token:string): Promise<Dish> => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, category,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Delete a dish or category
  delete: async (id: string, type: 'dishes' | 'categories',token:string): Promise<Dish> => {
    try {
      let response = await axiosInstance.delete(`/delete/${type}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      return response.data
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  }
};

export default dishService;
