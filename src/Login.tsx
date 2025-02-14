import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoneButton from "./BoneButton";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name && !email) {
      setError("Oops! Both name and email are required.");
      return;
    } else if (!name) {
      setError("Please include name.");
      return;
    } else if (!email) {
      setError("Please include email.");
      return;
    }
    setError("");
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        { name, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/search");
      } else {
        setError("Sorry, that did not work. Please try again.");
      }
    } catch (err) {
      setError(
        "We are experiencing technical difficulties. Please contact support."
      );
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('src/assets/loginbackground.png')",
      }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16"
    >
      <h1 className="font-poppins text-center text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide leading-tight bg-gradient-to-r from-amber-600 to-amber-700 text-transparent bg-clip-text mb-6">
        Help a Dog Find a Home!
      </h1>

      <div className="relative w-full max-w-md flex flex-col items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-md bg-amber-200 w-full text-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md bg-amber-200 w-full text-lg"
            />
          </div>

          <div className="mt-6">
            <BoneButton text="Log In" aria-label="Log in to your account" />
          </div>
        </form>

        {error && (
          <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-black text-center w-full">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
