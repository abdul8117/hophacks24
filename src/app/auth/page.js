"use client";
import API_URL from "@/utils/utils";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleTab = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mr-2 rounded ${isLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 rounded ${!isLogin ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
      </div>
    </div>
  );
}

function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Failed to login");
        }
    }

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Log In
      </button>
    </form>
  );
}

function SignUpForm() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleHeightChange(event) {
        setHeight(event.target.value);
    }

    function handleWeightChange(event) {
        setWeight(event.target.value);
    }

    function handleAgeChange(event) {
        setAge(event.target.value);
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    async function handleSignUp() {
        console.log(username, name, password, height);

        const response = await fetch(`${API_URL}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                name,
                password,
                height,
                weight,
                age,
                gender,
            }),  
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Failed to sign up");
        }
    }

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Choose a username"
          name="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
          name="name"
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create a password"
          name="password"
            onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Height (cm)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your height"
          name="height"
          onChange={handleHeightChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Weight (kg)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your weight"
          name="weight"
          onChange={handleWeightChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Age</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your age"
          name="age"
            onChange={handleAgeChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Gender</label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="gender"
            onChange={handleGenderChange}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onSubmit={handleSignUp()}
      >
        Sign Up
      </button>
    </form>
  );
}
