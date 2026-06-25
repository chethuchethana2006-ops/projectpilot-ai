"use client";

import { useState } from "react";
import projectIdeas from "../data/projectIdeas";

export default function Home() {
  const [result, setResult] = useState<typeof projectIdeas[number] | null>(null);
  const [skills, setSkills] = useState("");
  const [year, setYear] = useState("1st Year");
  const [goal, setGoal] = useState("Internship");

const generateIdea = () => {
  const userSkill = skills.toLowerCase();
  const userYear = year;
  const userGoal = goal.toLowerCase();

  const matchedProject = projectIdeas.find(
  (project) =>
    project.skills.includes(userSkill) &&
    project.year === userYear &&
    project.goal.toLowerCase() === userGoal
);

  if (matchedProject) {
    setResult(matchedProject);
  } else {
    setResult(null);
  }
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
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, Java, HTML"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
        />

        <label className="block mb-2 font-medium text-gray-800">
          Year
        </label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
        >
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <label className="block mb-2 font-medium text-gray-800">
          Goal
        </label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-black"
        >
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

        {result ? (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-bold mb-2 text-black">
              Suggested Project
            </h2>

            <h3 className="text-lg font-semibold text-black mb-2">
              {result.title}
            </h3>
            <p className="text-black mb-3">
              {result.description}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Skills:</span> {result.skills.join(", ")}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Year:</span> {result.year}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Goal:</span> {result.goal}
            </p>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-black">
              No matching project found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}