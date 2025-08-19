import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

interface UserState {
  loading: {
    login: boolean;
    register: boolean;
  };
  error: {
    login: string | null;
    register: string | null;
  };
  userData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
    role: "user" | "admin" | "superAdmin";
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  loading: {
    login: false,
    register: false,
  },
  error: {
    login: null,
    register: null,
  },
  userData: {
    id: "",
    name: "",
    email: "",
    phone: "",
    token: "",
    role: "user",
  },
  isLoggedIn: false,
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
        if (token) {
          try {
            const parsedToken = JSON.parse(token);
            if (parsedToken) {
              // Validate token logic needed with user data
              state.isLoggedIn = true;
              state.userData.token = parsedToken;
              if (roleRaw) {
                try {
                  const parsedRole = JSON.parse(roleRaw);
                  if (parsedRole === "admin" || parsedRole === "superAdmin") {
                    state.userData.role = parsedRole;
                  } else {
                    state.userData.role = "user";
                  }
                } catch {
                  state.userData.role = "user";
                }
              }
            }
          } catch (error) {
            localStorage.removeItem("token");
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
        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(action.payload.token));
          if (action.payload?.user?.role) {
            localStorage.setItem(
              "role",
              JSON.stringify(action.payload.user.role)
            );
          }
        }
        state.userData = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          phone: action.payload.user.phone,
          token: action.payload.token,
          role: action.payload?.user?.role ?? "user",
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
  },
});

export const { setUser, initializeAuth, logout } = userSlice.actions;
export default userSlice.reducer;
