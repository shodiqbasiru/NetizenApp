// filepath: /D:/ngoding/React/portfolio/netizen-app/src/components/common/Login/Login.tsx
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { NavLink, useNavigate } from "react-router";
import { loginUser } from "../../../usecase/usecase-users";

function Login(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = loginUser(email, password);
    if (user) {
      alert("Login successful!");
      localStorage.setItem("userId", JSON.stringify(user.id));
      navigate("/feeds");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-jura font-bold">Welcome Back</h1>
          <p className="text-lg font-public-sans">
            Enter your email and password to access your account
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="inline-block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="p-inputgroup flex-1">
              <InputText
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="p-inputgroup flex-1">
              <InputText
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="mb-4">
            <Button label="Sign In" className="w-full" />
          </div>
        </form>
      </div>
      <div className="text-center">
        <p className="font-public-sans">
          Don't have an account?{" "}
          <NavLink to="/auth/register" className="font-bold">
            Sign Up
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;