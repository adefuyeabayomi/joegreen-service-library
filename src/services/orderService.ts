import axiosInstance from "./axiosInstance";
export interface CartItem {
    id?: string;
    name: string;
    addons: {
      name: string;
      price: number;
      quantity: number;
    }[];
    description: string;
    price: number;
    published?: boolean;
    category?: string;
    image?: string; // Optional property for image URL
    message?: string; // Optional property for additional message
    quantity: number;
  }
export interface Order {
  cartItems: CartItem[];
  phoneNumber: string;
  deliveryInfo: string;
  narration: string;
  transactionRef?: string;
  paymentRef?: string;
  paymentStatus?: string;
  fufilled?:String;
  cancelled?: boolean;
  user?: string;
  _id?:string
}

const fetchOrders = async (token: string, params?: { userId?: string; paymentStatus?: string }): Promise<Order[]> => {
    try {
        const response = await axiosInstance.get('/order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params, // Add query parameters here
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching orders: ${error}`);
    }
};
  // Create a new order
  const createOrder = async (order: Order, token: string): Promise<{order:Order,message:string}> => {
    try {
      const response = await axiosInstance.post(`/order`, order,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating order: ${error}`);
    }
  };
  
  // Update an existing order
  const updateOrder = async (orderId: string, updates: Partial<Order>, token: string): Promise<{order:Order,message:string}> => {
    try {
      const response = await axiosInstance.put(`/order/${orderId}`, updates,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating order: ${error}`);
    }
  };
  
  // Fetch a single order by ID
  const fetchOrderById = async (orderId: string, token: string): Promise<Order> => {
    try {
      const response = await axiosInstance.get(`/order/${orderId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching order by ID: ${error}`);
    }
  };
  

const orderService = {
    fetchOrders, createOrder, updateOrder, fetchOrderById
};

export default orderService;
