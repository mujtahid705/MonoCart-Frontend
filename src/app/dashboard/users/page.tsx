"use client";

import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UsersPage() {
  const { userData } = useSelector((s: RootState) => s.user);

  const users = [
    {
      id: 1,
      name: userData.name || "John Doe",
      email: userData.email || "john@example.com",
      role: userData.role,
    },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  ];

  return (
    <div className="space-y-4">
      {users.map((u) => (
        <Card key={u.id} className="p-4">
          <div className="font-semibold text-gray-900">
            {u.name} <span className="text-xs text-gray-500">({u.role})</span>
          </div>
          <div className="text-sm text-gray-600">{u.email}</div>
        </Card>
      ))}
    </div>
  );
}
