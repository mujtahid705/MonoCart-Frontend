import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const handleUnauthorized = (status: number, message?: string) => {
  if (status === 401 || message?.toLowerCase().includes("unauthorized")) {
    console.log("401 Unauthorized in productsSlice:", { status, message });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
  }
};
export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  stock: number;
  brand: string;
  images: { url: string }[];
  description?: string;
  categoryId?: string | number;
  subCategoryId?: string | number;
};
export type Category = {
  id: number;
  name: string;
  slug: string;
};
export type SubCategory = {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};
interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  currentItem: Product | null;
  currentLoading: boolean;
  currentError: string | null;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  subcategories: SubCategory[];
  subcategoriesLoading: boolean;
  subcategoriesError: string | null;
  updating: boolean;
  updateError: string | null;
  lastFetched: {
    products: number | null;
    categories: number | null;
    subcategories: number | null;
  };
}
const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
  currentLoading: false,
  currentError: null,
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  subcategories: [],
  subcategoriesLoading: false,
  subcategoriesError: null,
  updating: false,
  updateError: null,
  lastFetched: {
    products: null,
    categories: null,
    subcategories: null,
  },
};
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters?: {
    category?: string | number;
    subCategory?: string | number;
  }) => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
    const params = new URLSearchParams();
    if (filters?.category !== undefined && filters?.category !== "") {
      params.set("category", String(filters.category));
    }
    if (filters?.subCategory !== undefined && filters?.subCategory !== "") {
      params.set("subCategory", String(filters.subCategory));
    }
    const qs = params.toString();
    const url = `${base}/products/all${qs ? `?${qs}` : ""}`;
    console.log("🔍 Fetching products from:", url);
    const res = await fetch(url, {
      cache: "no-cache",
    });
    if (!res.ok) {
      console.error("❌ Products API failed:", res.status, res.statusText);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const json = await res.json();
    console.log("📦 Raw API Response:", json);
    const list: any[] = json?.data ?? json ?? [];
    console.log("📋 Products list:", list);
    console.log("📊 Products count:", list.length);
    const isAbsolute = (u: string) => /^https?:\/\//i.test(u);
    const joinUrl = (root: string, path?: string) => {
      if (!path) return "/vercel.svg";
      if (isAbsolute(path)) return path;
      if (!root) return path;
      const r = root.endsWith("/") ? root.slice(0, -1) : root;
      const p = path.startsWith("/") ? path : `/${path}`;
      return `${r}${p}`;
    };
    const mappedProducts = list.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      price: p.price,
      stock: p.stock,
      brand: p.brand,
      categoryId: p?.categoryId ?? p?.category?.id ?? p?.category ?? undefined,
      subCategoryId:
        p?.subCategoryId ?? p?.subCategory?.id ?? p?.subCategory ?? undefined,
      images: Array.isArray(p.images)
        ? p.images.map((im: any) => {
            const raw =
              typeof im === "string"
                ? im
                : im?.url ?? im?.imageUrl ?? im?.path ?? im?.src;
            return { url: joinUrl(imageBase, raw) };
          })
        : [],
    })) as Product[];
    console.log("✅ Mapped products:", mappedProducts);
    return mappedProducts;
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string | number) => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
    const res = await fetch(`${base}/products/${id}`, {
      cache: "force-cache",
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Failed to fetch product ${id}`);
    }
    const json = await res.json();
    const d = json?.data ?? {};
    const isAbsolute = (u: string) => /^https?:\/\//i.test(u);
    const joinUrl = (root: string, path?: string) => {
      if (!path) return "/vercel.svg";
      if (isAbsolute(path)) return path;
      if (!root) return path;
      const r = root.endsWith("/") ? root.slice(0, -1) : root;
      const p = String(path).startsWith("/") ? String(path) : `/${path}`;
      return `${r}${p}`;
    };
    const images: { url: string }[] = Array.isArray(d?.images)
      ? d.images.map((im: any) => {
          const raw =
            typeof im === "string"
              ? im
              : im?.imageUrl ?? im?.url ?? im?.path ?? im?.src;
          return { url: joinUrl(imageBase, raw) };
        })
      : [];
    const product: Product = {
      id: String(d?.id ?? id),
      title: d?.title ?? "Untitled",
      slug: d?.slug ?? String(d?.id ?? id),
      price: Number(d?.price) || 0,
      stock: Number(d?.stock) || 0,
      brand: d?.brand ?? "",
      description: d?.description ?? "",
      categoryId: d?.categoryId ?? d?.category?.id ?? d?.category ?? undefined,
      subCategoryId:
        d?.subCategoryId ?? d?.subCategory?.id ?? d?.subCategory ?? undefined,
      images,
    };
    return product;
  }
);
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/categories/all`, {
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to load categories");
    const json = await res.json();
    const data: any[] = json ?? [];
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })) as Category[];
  }
);
export const fetchSubcategories = createAsyncThunk(
  "products/fetchSubcategories",
  async (categoryId: string | number) => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(
      `${base}/subcategories/all?categoryId=${encodeURIComponent(
        String(categoryId)
      )}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) throw new Error("Failed to load subcategories");
    const json = await res.json();
    const data: any[] = json ?? [];
    return data.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      categoryId: s.categoryId,
    })) as SubCategory[];
  }
);
export const fetchAllSubcategories = createAsyncThunk(
  "products/fetchAllSubcategories",
  async () => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/subcategories/all`, {
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to load subcategories");
    const json = await res.json();
    const data: any[] = json ?? [];
    return data.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      categoryId: s.categoryId,
      category: s.category
        ? {
            id: s.category.id,
            name: s.category.name,
            slug: s.category.slug,
          }
        : undefined,
    })) as SubCategory[];
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    payload: {
      id: string | number;
      data: {
        title?: string;
        description?: string;
        price?: number;
        stock?: number;
        brand?: string;
        categoryId?: number | string;
        subCategoryId?: number | string;
        existingImages?: string[];
        newImages?: File[];
      };
      token?: string;
    },
    { rejectWithValue }
  ) => {
    const { id, data, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const fd = new FormData();
    if (data.title !== undefined) fd.append("title", data.title);
    if (data.description !== undefined)
      fd.append("description", data.description);
    if (data.price !== undefined) fd.append("price", String(data.price));
    if (data.stock !== undefined) fd.append("stock", String(data.stock));
    if (data.brand !== undefined) fd.append("brand", data.brand);
    if (data.categoryId !== undefined)
      fd.append("categoryId", String(data.categoryId));
    if (data.subCategoryId !== undefined && data.subCategoryId !== "")
      fd.append("subCategoryId", String(data.subCategoryId));
    if (data.existingImages) {
      fd.append("existingImages", JSON.stringify(data.existingImages));
    }
    (data.newImages || []).forEach((file) => fd.append("images", file));
    const res = await fetch(`${base}/products/${id}`, {
      method: "PATCH",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: fd,
    });
    if (!res.ok) {
      let msg = "Failed to update product";
      try {
        const j = await res.json();
        msg = j?.message || msg;
        handleUnauthorized(res.status, msg);
      } catch {}
      return rejectWithValue(msg);
    }
    const json = await res.json();
    return json?.data;
  }
);
export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (payload: { name: string; token: string }, { rejectWithValue }) => {
    const { name, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/categories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to create category");
    }
    return res.json();
  }
);
export const updateCategory = createAsyncThunk(
  "products/updateCategory",
  async (
    payload: { id: number; name: string; token: string },
    { rejectWithValue }
  ) => {
    const { id, name, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/categories/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to update category");
    }
    return res.json();
  }
);
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (payload: { id: number; token: string }, { rejectWithValue }) => {
    const { id, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/categories/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to delete category");
    }
    return res.json();
  }
);
export const createSubcategory = createAsyncThunk(
  "products/createSubcategory",
  async (
    payload: { name: string; categoryId: number; token: string },
    { rejectWithValue }
  ) => {
    const { name, categoryId, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/subcategories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, categoryId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to create subcategory");
    }
    return res.json();
  }
);
export const updateSubcategory = createAsyncThunk(
  "products/updateSubcategory",
  async (
    payload: { id: number; name: string; categoryId: number; token: string },
    { rejectWithValue }
  ) => {
    const { id, name, categoryId, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/subcategories/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, categoryId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to update subcategory");
    }
    return res.json();
  }
);
export const deleteSubcategory = createAsyncThunk(
  "products/deleteSubcategory",
  async (payload: { id: number; token: string }, { rejectWithValue }) => {
    const { id, token } = payload;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const res = await fetch(`${base}/subcategories/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, data?.message);
      return rejectWithValue(data?.message || "Failed to delete subcategory");
    }
    return res.json();
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched.products = Date.now();
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.currentLoading = true;
        state.currentError = null;
        state.currentItem = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentLoading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentLoading = false;
        state.currentError = action.error.message || "Failed to load product";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
        state.lastFetched.categories = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError =
          action.error.message || "Failed to load categories";
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.subcategoriesLoading = true;
        state.subcategoriesError = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategories = action.payload;
        state.lastFetched.subcategories = Date.now();
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategoriesError =
          action.error.message || "Failed to load subcategories";
      })
      .addCase(fetchAllSubcategories.pending, (state) => {
        state.subcategoriesLoading = true;
        state.subcategoriesError = null;
      })
      .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategories = action.payload;
        state.lastFetched.subcategories = Date.now();
      })
      .addCase(fetchAllSubcategories.rejected, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategoriesError =
          action.error.message || "Failed to load subcategories";
      })
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false;
        const updated = action.payload;
        if (updated) {
          const idx = state.items.findIndex(
            (p) => String(p.id) === String(updated.id)
          );
          if (idx !== -1) {
            state.items[idx] = {
              ...state.items[idx],
              ...updated,
              images: Array.isArray(updated.images)
                ? updated.images.map((im: any) => ({ url: im.url || im }))
                : state.items[idx].images,
            };
          }
          if (
            state.currentItem &&
            String(state.currentItem.id) === String(updated.id)
          ) {
            state.currentItem = {
              ...state.currentItem,
              ...updated,
            } as Product;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload || action.error.message || "Failed to update product";
      })
      .addCase(createCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          state.categories.push(action.payload.data);
        }
      })
      .addCase(createCategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload || action.error.message || "Failed to create category";
      })
      .addCase(updateCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          const idx = state.categories.findIndex(
            (c) => c.id === action.payload.data.id
          );
          if (idx !== -1) {
            state.categories[idx] = action.payload.data;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload || action.error.message || "Failed to update category";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          state.categories = state.categories.filter(
            (c) => c.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload || action.error.message || "Failed to delete category";
      })
      .addCase(createSubcategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          state.subcategories.push(action.payload.data);
        }
      })
      .addCase(createSubcategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload ||
          action.error.message ||
          "Failed to create subcategory";
      })
      .addCase(updateSubcategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          const idx = state.subcategories.findIndex(
            (s) => s.id === action.payload.data.id
          );
          if (idx !== -1) {
            state.subcategories[idx] = action.payload.data;
          }
        }
      })
      .addCase(updateSubcategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload ||
          action.error.message ||
          "Failed to update subcategory";
      })
      .addCase(deleteSubcategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload?.data) {
          state.subcategories = state.subcategories.filter(
            (s) => s.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteSubcategory.rejected, (state, action: any) => {
        state.updating = false;
        state.updateError =
          action.payload ||
          action.error.message ||
          "Failed to delete subcategory";
      });
  },
});
export default productsSlice.reducer;
