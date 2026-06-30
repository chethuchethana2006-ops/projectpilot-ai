"use client";

import { useState } from "react";

import { Calendar, Code2, Sparkles, Target } from "lucide-react";
type ProjectIdea = {
  category: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  techStack: string[];
  skills: string[];
  year: string;
  goal: string;
};

export default function Home() {
  const [results, setResults] = useState<ProjectIdea[]>([]);
  const [skills, setSkills] = useState("");
  const [year, setYear] = useState("1st Year");
  const [goal, setGoal] = useState("Internship");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const generateIdea = async () => {
    setLoading(true);
    setSearched(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          year,
          goal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recommendations.");
      }

      if (Array.isArray(data.recommendations)) {
        setResults(data.recommendations);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
      setError("Unable to generate recommendations. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center p-6">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent">
            ProjectPilot AI
          </h1>

          <p className="text-gray-600 text-sm mt-2">
            Discover personalized projects based on your skills
          </p>
        </div>

        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">
          <Code2 size={18} className="text-cyan-600" />
          Skills
        </label>

        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter skills separated by commas"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">
          <Calendar size={18} className="text-cyan-600" />
          Year
        </label>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black focus:ring-2 focus:ring-cyan-400 outline-none"
        >
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">
          <Target size={18} className="text-cyan-600" />
          Goal
        </label>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-black focus:ring-2 focus:ring-cyan-400 outline-none"
        >
          <option>Internship</option>
          <option>Placement</option>
          <option>Learning</option>
        </select>

        <button
          onClick={generateIdea}
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            p-3
            rounded-xl
            font-semibold
            shadow-lg
            hover:shadow-cyan-400/50
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loading ? "Generating Ideas..." : "Generate Ideas"}
        </button>

        {loading && (
          <div className="flex items-center justify-center gap-3 mt-5">
            <div
              className="
                w-5
                h-5
                border-4
                border-blue-200
                border-t-blue-600
                rounded-full
                animate-spin
              "
            />

            <p className="text-blue-600 font-medium">
              Generating recommendations...
            </p>
          </div>
        )}

        {error && !loading ? (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
            <h2 className="font-bold text-blue-700 flex items-center gap-2 mb-1">
              <Sparkles size={20} className="text-cyan-500" />
              AI Recommended Projects
            </h2>

            <p className="text-sm text-gray-600 mb-5">
              Found {results.length} recommendation(s)
            </p>

            {results.map((result, index) => (
              <div
                key={`${result.title}-${index}`}
                className="
                  mb-6
                  p-5
                  bg-white
                  rounded-xl
                  border
                  border-gray-200
                  shadow-sm
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                <h3 className="text-lg font-bold text-black mb-2">
                  {result.title}
                </h3>

                <span
                  className="
                    inline-block
                    mb-3
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-gradient-to-r
                    from-purple-100
                    to-pink-100
                    text-purple-700
                  "
                >
                  {result.category}
                </span>

                <p className="text-black mb-4">{result.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className={
                      "px-3 py-1 rounded-full text-sm font-semibold " +
                      (result.difficulty === "Beginner"
                        ? "bg-green-200 text-green-800"
                        : result.difficulty === "Intermediate"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800")
                    }
                  >
                    {result.difficulty}
                  </span>

                  <span
                    className="
                      bg-cyan-200
                      text-cyan-900
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    "
                  >
                    Duration: {result.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {result.techStack.map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="
                        bg-cyan-100
                        text-cyan-800
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Skills:</span>{" "}
                  {result.skills.join(", ")}
                </p>

                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Year:</span> {result.year}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Goal:</span> {result.goal}
                </p>
              </div>
            ))}
          </div>
        ) : searched && !loading && !error ? (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-black font-semibold">
              No recommendations generated.
            </p>

            <p className="text-gray-600 text-sm mt-1">
              Try another skill, year or goal.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}