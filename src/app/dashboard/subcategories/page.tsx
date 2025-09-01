"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCategories,
  fetchAllSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "@/redux/slices/productsSlice";
import { toast } from "sonner";

export default function SubcategoriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    categories,
    categoriesLoading,
    subcategories,
    subcategoriesLoading,
    subcategoriesError,
    updating,
    lastFetched,
  } = useSelector((state: RootState) => state.products);
  const userToken = useSelector((s: RootState) => s.user.userData.token);

  const [query, setQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    categoryId: "",
  });
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingSubcategoryId, setEditingSubcategoryId] = React.useState<
    number | null
  >(null);
  const [editForm, setEditForm] = React.useState({
    name: "",
    categoryId: "",
  });

  React.useEffect(() => {
    // Only fetch if data arrays are empty, not loading, and haven't been fetched recently
    const shouldFetchCategories =
      categories.length === 0 &&
      !categoriesLoading &&
      (!lastFetched.categories ||
        Date.now() - lastFetched.categories > 5 * 60 * 1000);

    const shouldFetchSubcategories =
      subcategories.length === 0 &&
      !subcategoriesLoading &&
      (!lastFetched.subcategories ||
        Date.now() - lastFetched.subcategories > 5 * 60 * 1000);

    if (shouldFetchCategories) {
      dispatch(fetchCategories());
    }
    if (shouldFetchSubcategories) {
      dispatch(fetchAllSubcategories());
    }
  }, [
    dispatch,
    categories.length,
    categoriesLoading,
    subcategories.length,
    subcategoriesLoading,
    lastFetched.categories,
    lastFetched.subcategories,
  ]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subcategories;
    return subcategories.filter((s) =>
      [s.name, s.slug, s.category?.name].some((f) =>
        f?.toLowerCase().includes(q)
      )
    );
  }, [subcategories, query]);

  const openEdit = (subcategory: any) => {
    setIsEditOpen(true);
    setEditingSubcategoryId(subcategory.id);
    setEditForm({
      name: subcategory.name || "",
      categoryId: String(subcategory.categoryId) || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) {
      return;
    }

    try {
      const result = await dispatch(
        deleteSubcategory({ id, token: userToken }) as any
      ).unwrap();
      toast.success(result?.message || "Subcategory deleted successfully");
      dispatch(fetchAllSubcategories()); // Refresh the list
    } catch (err: any) {
      toast.error(err || "Failed to delete subcategory");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-lg font-semibold text-gray-900">Subcategories</div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by name, slug, or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => setIsModalOpen(true)}>Add Subcategory</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-3">Slug</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>
        <div>
          {subcategoriesLoading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading subcategories...
            </div>
          ) : subcategoriesError ? (
            <div className="p-6 text-sm text-red-600">{subcategoriesError}</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No subcategories found.
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-12 items-center gap-3 px-4 py-3 border-t hover:bg-gray-50"
              >
                <div className="col-span-4">
                  <div className="font-medium text-gray-900">{s.name}</div>
                </div>
                <div className="col-span-3 text-gray-600">
                  {s.category?.name || "Unknown Category"}
                </div>
                <div className="col-span-3 text-gray-600">{s.slug}</div>
                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(s)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(s.id)}
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

      {/* Add Subcategory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Subcategory</h3>
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
                if (!form.categoryId) {
                  return setFormError("Category is required");
                }
                if (!userToken) {
                  return setFormError("You must be logged in");
                }

                try {
                  setSubmitting(true);
                  const result = await dispatch(
                    createSubcategory({
                      name: form.name.trim(),
                      categoryId: parseInt(form.categoryId),
                      token: userToken,
                    }) as any
                  ).unwrap();

                  toast.success(
                    result?.message || "Subcategory created successfully"
                  );
                  setIsModalOpen(false);
                  setForm({ name: "", categoryId: "" });
                  dispatch(fetchAllSubcategories());
                } catch (err: any) {
                  setFormError(err || "Failed to create subcategory");
                  toast.error(err || "Failed to create subcategory");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Subcategory Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

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

      {/* Edit Subcategory Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Subcategory</h3>
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
                if (!editForm.categoryId) {
                  toast.error("Category is required");
                  return;
                }
                if (!editingSubcategoryId) return;

                try {
                  const result = await dispatch(
                    updateSubcategory({
                      id: editingSubcategoryId,
                      name: editForm.name.trim(),
                      categoryId: parseInt(editForm.categoryId),
                      token: userToken,
                    }) as any
                  ).unwrap();

                  toast.success(
                    result?.message || "Subcategory updated successfully"
                  );
                  setIsEditOpen(false);
                  dispatch(fetchAllSubcategories());
                } catch (err: any) {
                  toast.error(err || "Failed to update subcategory");
                }
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Subcategory Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />

              <select
                value={editForm.categoryId}
                onChange={(e) =>
                  setEditForm({ ...editForm, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

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
