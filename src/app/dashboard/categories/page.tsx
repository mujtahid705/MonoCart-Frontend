"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/redux/slices/productsSlice";
import { toast } from "sonner";

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    categories,
    categoriesLoading,
    categoriesError,
    updating,
    lastFetched,
  } = useSelector((state: RootState) => state.products);
  const userToken = useSelector((s: RootState) => s.user.userData.token);

  const [query, setQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
  });
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingCategoryId, setEditingCategoryId] = React.useState<
    number | null
  >(null);
  const [editForm, setEditForm] = React.useState({
    name: "",
  });

  React.useEffect(() => {
    // Only fetch if categories are empty, not loading, and haven't been fetched recently (5 minutes)
    const shouldFetch =
      categories.length === 0 &&
      !categoriesLoading &&
      (!lastFetched.categories ||
        Date.now() - lastFetched.categories > 5 * 60 * 1000);

    if (shouldFetch) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, categoriesLoading, lastFetched.categories]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) =>
      [c.name, c.slug].some((f) => f?.toLowerCase().includes(q))
    );
  }, [categories, query]);

  const openEdit = (category: any) => {
    setIsEditOpen(true);
    setEditingCategoryId(category.id);
    setEditForm({
      name: category.name || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const result = await dispatch(
        deleteCategory({ id, token: userToken }) as any
      ).unwrap();
      toast.success(result?.message || "Category deleted successfully");
      dispatch(fetchCategories()); // Refresh the list
    } catch (err: any) {
      toast.error(err || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-lg font-semibold text-gray-900">Categories</div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by name or slug"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Slug</div>
          <div className="col-span-3 text-right pr-2">Actions</div>
        </div>
        <div>
          {categoriesLoading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading categories...
            </div>
          ) : categoriesError ? (
            <div className="p-6 text-sm text-red-600">{categoriesError}</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No categories found.
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-12 items-center gap-3 px-4 py-3 border-t hover:bg-gray-50"
              >
                <div className="col-span-6">
                  <div className="font-medium text-gray-900">{c.name}</div>
                </div>
                <div className="col-span-3 text-gray-600">{c.slug}</div>
                <div className="col-span-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(c)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Category</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-3 text-sm text-red-600">{formError}</div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setFormError(null);

                if (!form.name.trim()) {
                  return setFormError("Name is required");
                }
                if (!userToken) {
                  return setFormError("You must be logged in");
                }

                try {
                  setSubmitting(true);
                  const result = await dispatch(
                    createCategory({
                      name: form.name.trim(),
                      token: userToken,
                    }) as any
                  ).unwrap();

                  toast.success(
                    result?.message || "Category created successfully"
                  );
                  setIsModalOpen(false);
                  setForm({ name: "" });
                  dispatch(fetchCategories());
                } catch (err: any) {
                  setFormError(err || "Failed to create category");
                  toast.error(err || "Failed to create category");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Category Name"
                value={form.name}
                onChange={(e) => setForm({ name: e.target.value })}
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Category</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!editForm.name.trim()) {
                  toast.error("Name is required");
                  return;
                }
                if (!editingCategoryId) return;

                try {
                  const result = await dispatch(
                    updateCategory({
                      id: editingCategoryId,
                      name: editForm.name.trim(),
                      token: userToken,
                    }) as any
                  ).unwrap();

                  toast.success(
                    result?.message || "Category updated successfully"
                  );
                  setIsEditOpen(false);
                  dispatch(fetchCategories());
                } catch (err: any) {
                  toast.error(err || "Failed to update category");
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Category Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ name: e.target.value })}
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
