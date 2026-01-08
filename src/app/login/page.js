"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginFooter from "@/components/auth/LoginFooter";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.message);
      return;
    }

    router.push(data.redirect);
  }

  return (
    <>
      <LoginHeader />

      <div className="flex justify-center items-center bg-gray-100 min-h-[calc(100vh-160px)] px-4">

        <div
          style={{
            width: "340px",
            padding: "24px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "22px",
              fontWeight: "600",
              color: "#222",
            }}
          >
            Login
          </h2>

          <form onSubmit={handleLogin}>

            {/* Username (SIDE-BY-SIDE) */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "18px" }}>
              <label
                style={{
                  width: "35%",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "65%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #bbb",
                  outline: "none",
                  fontSize: "15px",
                  color: "#333",
                }}
              />
            </div>

            {/* Password (SIDE-BY-SIDE) */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "18px" }}>
              <label
                style={{
                  width: "35%",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "65%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #bbb",
                  outline: "none",
                  fontSize: "15px",
                  color: "#333",
                }}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#0066ff",
                color: "white",
                fontSize: "16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Login
            </button>

            {/* Forgot Password */}
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <a
                href="#"
                style={{
                  fontSize: "14px",
                  color: "#0066ff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>

      <LoginFooter />
    </>
  );
}
