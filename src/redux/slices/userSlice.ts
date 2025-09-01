import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Utility function to handle unauthorized responses
const handleUnauthorized = (status: number, message?: string) => {
  if (status === 401 || message?.toLowerCase().includes("unauthorized")) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
  }
};

// Login user
export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData: { email: string; password: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    return response.json();
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    return response.json();
  }
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (token: string, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      handleUnauthorized(response.status, errorData?.message);
      return rejectWithValue(errorData?.message || "Failed to fetch users");
    }
    return response.json();
  }
);

interface UserState {
  loading: {
    login: boolean;
    register: boolean;
    fetchAll: boolean;
  };
  error: {
    login: string | null;
    register: string | null;
    fetchAll: string | null;
  };
  userData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
    role: "user" | "admin" | "superAdmin";
  };
  users: Array<{
    id: string;
    email: string;
    name: string;
    role: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  isLoggedIn: boolean;
  lastFetched: {
    users: number | null;
  };
}

const initialState: UserState = {
  loading: {
    login: false,
    register: false,
    fetchAll: false,
  },
  error: {
    login: null,
    register: null,
    fetchAll: null,
  },
  userData: {
    id: "",
    name: "",
    email: "",
    phone: "",
    token: "",
    role: "user",
  },
  users: [],
  isLoggedIn: false,
  lastFetched: {
    users: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //   state.id = action.payload.id;
      //   state.name = action.payload.name;
      //   state.email = action.payload.email;
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const roleRaw = localStorage.getItem("role");
        const userDataRaw = localStorage.getItem("userData");

        if (token && userDataRaw) {
          try {
            const parsedToken = JSON.parse(token);
            const parsedUserData = JSON.parse(userDataRaw);

            if (parsedToken && parsedUserData) {
              state.isLoggedIn = true;
              state.userData = {
                id: parsedUserData.id || "",
                name: parsedUserData.name || "",
                email: parsedUserData.email || "",
                phone: parsedUserData.phone || "",
                token: parsedToken,
                role: parsedUserData.role || "user",
              };
            }
          } catch (error) {
            // Clear invalid data
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userData");
          }
        }
      }
    },
    logout: (state) => {
      state.userData = {
        id: "",
        name: "",
        email: "",
        phone: "",
        token: "",
        role: "user",
      };
      state.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userData");
      }
    },
  },

  // Extra Reducers
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false;
        console.log("RESPONSE:", action.payload);

        const userData = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          phone: action.payload.user.phone,
          role: action.payload?.user?.role ?? "user",
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(action.payload.token));
          localStorage.setItem("userData", JSON.stringify(userData));
          if (action.payload?.user?.role) {
            localStorage.setItem(
              "role",
              JSON.stringify(action.payload.user.role)
            );
          }
        }

        state.userData = {
          ...userData,
          token: action.payload.token,
        };
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.error.message || "Login failed";
        console.error("Login failed:", action.payload);
      });

    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading.register = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = action.error.message || "Registration failed";
        console.error("Registration failed:", action.payload);
      });

    // Fetch All Users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading.fetchAll = true;
        state.error.fetchAll = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.users = action.payload;
        state.lastFetched.users = Date.now();
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error.fetchAll = action.error.message || "Failed to fetch users";
      });
  },
});

export const { setUser, initializeAuth, logout } = userSlice.actions;
export default userSlice.reducer;
