import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  currentItem: Product | null;
  currentLoading: boolean;
  currentError: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
  currentLoading: false,
  currentError: null,
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
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    const list: any[] = json?.data ?? [];
    const isAbsolute = (u: string) => /^https?:\/\//i.test(u);
    const joinUrl = (root: string, path?: string) => {
      if (!path) return "/vercel.svg";
      if (isAbsolute(path)) return path;
      if (!root) return path; // fallback to raw if no base
      const r = root.endsWith("/") ? root.slice(0, -1) : root;
      const p = path.startsWith("/") ? path : `/${path}`;
      return `${r}${p}`;
    };
    return list.map((p) => ({
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
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string | number) => {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
    const res = await fetch(`${base}/products/${id}`, { cache: "no-store" });
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
      });
  },
});

export default productsSlice.reducer;
