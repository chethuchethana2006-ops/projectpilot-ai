"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const generateIdea = () => {
    setResult(`
Project: Expense Tracker App

Difficulty: Beginner

Technologies:
- Python
- MySQL
- HTML
- CSS

Roadmap:
1. Create database
2. Add income/expense form
3. Store records
4. Generate reports

Resume Point:
Built a personal expense tracking application using Python and MySQL.

Interview Question:
How would you design a database for an expense tracker?
`);
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          ProjectPilot AI
        </h1>

        <label className="block mb-2 font-medium text-gray-800">
          Skills
        </label>
        <input
          type="text"
          placeholder="Python, Java, HTML"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
        />

        <label className="block mb-2 font-medium text-gray-800">
          Year
        </label>
        <select className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black">
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <label className="block mb-2 font-medium text-gray-800">
          Goal
        </label>
        <select className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-black">
          <option>Internship</option>
          <option>Placement</option>
          <option>Learning</option>
        </select>

        <button
          onClick={generateIdea}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Ideas
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-bold mb-2 text-black">
              Suggested Project
            </h2>

            <p className="text-black whitespace-pre-line">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}