"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import {
  User,
  Mail,
  Shield,
  Lock,
  Save,
  MapPin,
} from "lucide-react";

const UserAccount = () => {
  const { data: session, update } =
    useSession();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",

    // Address
    address: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const [loading, setLoading] =
    useState(false);

  // Prefill
  useEffect(() => {
    if (session?.user) {
      setForm({
        first_name:
          session.user.first_name ||
          "",

        last_name:
          session.user.last_name ||
          "",

        email:
          session.user.email || "",

        username:
          session.user.username ||
          "",

        password: "",

        address:

          "",

        city:
          "",

        state:
          "",

        postal_code:
          "",
      });
    }
  }, [session]);

  // Handle Change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/user/update",
        {
          method: "PUT",
          body: JSON.stringify(
            form
          ),
        }
      );

      const data =
        await res.json();

      if (res.ok) {
        alert(
          "Profile updated ✅"
        );

        await update({
          ...session,
          user: {
            ...session?.user,

            first_name:
              form.first_name,

            last_name:
              form.last_name,

            username:
              form.username,

            address:
              form.address,

            city: form.city,

            state:
              form.state,

            postal_code:
              form.postal_code,
          },
        });
      } else {
        alert(
          data.message ||
          "Error updating profile"
        );
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif tracking-tight text-black sm:text-5xl">
            Account Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/55 sm:text-base">
            Manage your profile,
            security, and address
            details in one elegant
            place.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl">

          <form
            onSubmit={
              handleSubmit
            }
            className="relative p-5 sm:p-8"
          >


            {/* Personal Info */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f3ee]">
                  <User
                    size={
                      20
                    }
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>

                  <p className="text-sm text-black/50">
                    Update
                    your
                    personal
                    details
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="First Name"
                  icon={
                    User
                  }
                >
                  <input
                    type="text"
                    name="first_name"
                    value={
                      form.first_name
                    }
                    onChange={
                      handleChange
                    }
                    className="input-style"
                  />
                </Field>

                <Field
                  label="Last Name"
                  icon={
                    User
                  }
                >
                  <input
                    type="text"
                    name="last_name"
                    value={
                      form.last_name
                    }
                    onChange={
                      handleChange
                    }
                    className="input-style"
                  />
                </Field>
              </div>

              {/* Email + Username */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Email Address"
                  icon={
                    Mail
                  }
                >
                  <input
                    type="email"
                    name="email"
                    value={
                      form.email
                    }
                    disabled
                    className="input-style bg-[#f5f5f5]"
                  />
                </Field>

                <Field
                  label="Username"
                  icon={
                    Shield
                  }
                >
                  <input
                    type="text"
                    name="username"
                    value={
                      form.username
                    }
                    onChange={
                      handleChange
                    }
                    className="input-style"
                  />
                </Field>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-black/5" />

            {/* Security */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f3ee]">
                  <Lock
                    size={
                      20
                    }
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Security
                  </h2>

                  <p className="text-sm text-black/50">
                    Update
                    your
                    password
                    securely
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="New Password"
                  icon={
                    Lock
                  }
                >
                  <input
                    type="password"
                    name="password"
                    value={
                      form.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter new password"
                    className="input-style"
                  />
                </Field>

                <Field
                  label="Confirm Password"
                  icon={
                    Lock
                  }
                >
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="input-style"
                  />
                </Field>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-black/5" />

            {/* Address Section */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f3ee]">
                  <MapPin
                    size={
                      20
                    }
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Address
                    Information
                  </h2>

                  <p className="text-sm text-black/50">
                    Manage
                    your
                    shipping
                    and
                    billing
                    address
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 gap-5">
                <Field
                  label="Street Address"
                  icon={
                    MapPin
                  }
                >
                  <textarea
                    name="address"
                    value={
                      form.address
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your address"
                    rows={
                      4
                    }
                    className="input-style resize-none"
                  />
                </Field>
              </div>

              {/* City + State */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="City"
                  icon={
                    MapPin
                  }
                >
                  <input
                    type="text"
                    name="city"
                    value={
                      form.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city"
                    className="input-style"
                  />
                </Field>

                <Field
                  label="State"
                  icon={
                    MapPin
                  }
                >
                  <input
                    type="text"
                    name="state"
                    value={
                      form.state
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter state"
                    className="input-style"
                  />
                </Field>
              </div>

              {/* Postal Code */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Postal Code"
                  icon={
                    MapPin
                  }
                >
                  <input
                    type="text"
                    name="postal_code"
                    value={
                      form.postal_code
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter postal code"
                    className="input-style"
                  />
                </Field>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  loading
                }
                className="flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                <Save
                  size={
                    16
                  }
                />

                {loading
                  ? "Updating..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Input Styles */}
      <style jsx>{`
                .input-style {
                    width: 100%;
                    border-radius: 18px;
                    border: 1px solid
                        rgba(0, 0, 0, 0.08);
                    background: rgba(
                        255,
                        255,
                        255,
                        0.75
                    );
                    padding: 14px 16px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(
                        12px
                    );
                }

                .input-style:focus {
                    border-color: black;
                    box-shadow: 0 0 0 4px
                        rgba(0, 0, 0, 0.04);
                }

                textarea.input-style {
                    min-height: 120px;
                }
            `}</style>
    </div>
  );
};

export default UserAccount;

/* Field */
const Field = ({
  label,
  icon: Icon,
  children,
}: any) => {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-black/70">
        <Icon size={15} />

        {label}
      </label>

      {children}
    </div>
  );
};