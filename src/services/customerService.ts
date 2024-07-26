import axiosInstance from "./axiosInstance";

export interface CustomerMessage {
  email: string;
  message: string;
  created: string;
  replied: boolean;
}

interface ReplyResponse {
  message: string;
}

const customerSupportService = {
  // Send a customer message
  postCustomerMessage: async (email: string, message: string): Promise<ReplyResponse> => {
    try {
        const response = await axiosInstance.post('/messages', { email, message });
        return response.data
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Admin replies to a customer message
  replyToCustomerMessage: async (messageId: string, replyMessage: string): Promise<ReplyResponse> => {
    try {
      const response = await axiosInstance.post(`/messages/${messageId}/reply`, { replyMessage });
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  }
};

export default customerSupportService;
