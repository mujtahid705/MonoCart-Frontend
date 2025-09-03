"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchAllUsers } from "@/redux/slices/userSlice";
import React from "react";
export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, users, loading, error, lastFetched } = useSelector(
    (s: RootState) => s.user
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    const shouldFetch =
      userData.token &&
      users.length === 0 &&
      !loading.fetchAll &&
      (!lastFetched.users || Date.now() - lastFetched.users > 2 * 60 * 1000);
    if (shouldFetch) {
      dispatch(fetchAllUsers(userData.token));
    }
  }, [
    dispatch,
    userData.token,
    users.length,
    loading.fetchAll,
    lastFetched.users,
  ]);
  const filteredUsers = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);
  if (loading.fetchAll) {
    return <div className="p-6 text-sm text-gray-500">Loading users...</div>;
  }
  if (error.fetchAll) {
    return <div className="p-6 text-sm text-red-600">{error.fetchAll}</div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-lg font-semibold text-gray-900">
          Users ({filteredUsers.length}
          {searchQuery ? ` of ${users.length}` : ""})
        </div>
        <Input
          placeholder="Search by name, email, phone, or role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <div className="p-6 text-sm text-gray-500">
          {searchQuery
            ? "No users found matching your search."
            : "No users found."}
        </div>
      ) : (
        filteredUsers.map((u) => (
          <Card key={u.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">
                  {u.name}{" "}
                  <span className="text-xs text-gray-500">({u.role})</span>
                  {!u.isActive && (
                    <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{u.email}</div>
                <div className="text-xs text-gray-500">{u.phone}</div>
              </div>
              <div className="text-xs text-gray-400">
                Joined: {new Date(u.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
