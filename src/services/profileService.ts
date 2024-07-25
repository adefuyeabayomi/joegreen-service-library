import axiosInstance from './axiosInstance';

interface ProfileResponse {
  message: string;
  data?: any;
}

interface ProfileData {
  name: string;
  email: string;
  // add all other fields that are part of the profile data
}

interface UpdateAccountInfo {
  email?: string;
  password?: string;
  recoveryEmail?: string;
}

const profileService = {
  // Create a new profile
  createProfile: async (profileData: ProfileData, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.post<ProfileResponse>(
        '/profile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Get a profile by user ID
  getProfile: async (userId: string, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        `/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Update a profile
  updateProfile: async (userId: string, profileData: ProfileData, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.put<ProfileResponse>(
        `/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Upload profile image and update profile
  uploadProfileImage: async (files: File[], token: string): Promise<ProfileResponse> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    try {
      const response = await axiosInstance.post<ProfileResponse>(
        `/profile/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Update email, password, and recovery email
  updateAccountInfo: async (updateData: UpdateAccountInfo, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.put<ProfileResponse>(
        `/profile/update-account-info`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Delete account
  deleteAccount: async (token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.delete<ProfileResponse>(
        '/profile/delete-account',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  // Disable account
  disableAccount: async (token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.put<ProfileResponse>(
        '/profile/disable-account',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default profileService;
