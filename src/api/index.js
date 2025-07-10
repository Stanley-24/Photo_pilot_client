import axios from "../api/axios";

// 🧠 Helper: Get stored JWT token from localStorage or sessionStorage
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// 📦 Helper: Auth headers with token
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  // === AUTH ===
  signup: async ({ email, password, username, name }) => {
    const res = await axios.post("/auth/signup", {
      email,
      password,
      username,
      name,
    });
    return res.data;
  },

  login: async ({ email, password }) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const res = await axios.post("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  },

  getMe: async () => {
    const res = await axios.get("/auth/me", {
      headers: authHeaders(),
    });
    return res.data;
  },

  // === GALLERY ===
  uploadPhoto: async (formData) => {
    const res = await axios.post("/gallery/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeaders(),
      },
    });
    return res.data;
  },

  getMyPhotos: async () => {
    const res = await axios.get("/gallery/me", {
      headers: authHeaders(),
    });
    return res.data;
  },

  getPhotoById: async (photoId) => {
    const res = await axios.get(`/gallery/photos/${photoId}`, {
      headers: authHeaders(),
    });
    return res.data;
  },

  recordPhotoView: async (photoId) => {
    const res = await axios.post(`/gallery/photos/${photoId}/view`, null, {
      headers: authHeaders(),
    });
    return res.data;
  },

  // === AI BACKGROUNDS ===
  removeBackground: async (formData) => {
    const res = await axios.post("/ai/remove-background", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeaders(),
      },
    });
    return res.data;
  },

  getBackgroundSuggestions: async () => {
    const res = await axios.get("/ai/background-suggestions", {
      headers: authHeaders(),
    });
    return res.data;
  },

  previewReplaceBg: async (data) => {
    const res = await axios.post("/ai/preview-replace-bg", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  saveReplacedImage: async (data) => {
    const res = await axios.post("/ai/save-replaced", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  // === IMAGE TAGGING ===
  generateTags: async (formData) => {
    const res = await axios.post("/tags/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeaders(),
      },
    });
    return res.data;
  },

  batchTagImages: async (formData) => {
    const res = await axios.post("/tags/batch", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeaders(),
      },
    });
    return res.data;
  },

  // === REVIEWS ===
  submitReview: async (data) => {
    const res = await axios.post("/reviews/reviews/", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  // === PHOTO ENHANCER ===
  enhancePhoto: async () => {
    const res = await axios.get("/ai/enhance-photo", {
      headers: authHeaders(),
    });
    return res.data;
  },

  saveEnhancedPhoto: async (data) => {
    const res = await axios.post("/ai/save-enhanced", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  // === SUBSCRIPTION ===
  getSubscription: async () => {
    const res = await axios.get("/subscription/subscription/me", {
      headers: authHeaders(),
    });
    return res.data;
  },

  subscribeToPlan: async (data) => {
    const res = await axios.post("/subscription/subscription/subscribe", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  mockPayment: async (data) => {
    const res = await axios.post("/subscription/subscription/mock-payment", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  verifyPayment: async (data) => {
    const res = await axios.post("/subscription/subscription/verify-payment", data, {
      headers: authHeaders(),
    });
    return res.data;
  },

  getAdvancedFeature: async () => {
    const res = await axios.get("/subscription/subscription/advanced-feature", {
      headers: authHeaders(),
    });
    return res.data;
  },
};
