"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const UserAccount = () => {
  const { data: session, update } = useSession();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Prefill
  useEffect(() => {
    if (session?.user) {
      setForm({
        first_name: session.user.first_name || "",
        last_name: session.user.last_name || "",
        email: session.user.email || "",
        username: session.user.username || "",
        password: "",
      });
    }
  }, [session]);

  // ✅ Handle change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated ✅");

        // update session
        await update({
          ...session,
          user: {
            ...session?.user,
            first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
          },
        });
      } else {
        alert(data.message || "Error updating profile");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border shadow-sm">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-1">
          Account Settings
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Manage your personal information
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME ROW */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserAccount;