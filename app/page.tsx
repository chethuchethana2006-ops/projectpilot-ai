"use client";

import { useState } from "react";
import projectIdeas from "../data/projectIdeas";

import {
  Code2,
  Calendar,
  Target,
  Sparkles
} from "lucide-react";

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
  const [skills, setSkills] = useState<string>("");
  const [year, setYear] = useState<string>("1st Year");
  const [goal, setGoal] = useState<string>("Internship");

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const generateIdea = () => {

    setLoading(true);
    setSearched(true);

    setTimeout(() => {

      const userSkills = skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean);
      const userYear = year;
      const userGoal = goal.toLowerCase();

      const projectList = Array.isArray(projectIdeas)
        ? (projectIdeas as ProjectIdea[])
        : [];

      const matchedProjects = projectList.filter((project) => {
        const projectSkills = Array.isArray(project.skills)
          ? project.skills
          : [project.skills];

        return (
          userSkills.some((userSkill) =>
            projectSkills.some(
              (skill) => skill.toLowerCase() === userSkill
            )
          ) &&
          project.year === userYear &&
          project.goal.toLowerCase() === userGoal
        );
      });

      setResults(matchedProjects);

      setLoading(false);

    }, 1000);

  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center p-6">

      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-lg">

        <div className="text-center mb-6">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent">

            ProjectPilot AI

          </h1>

          <p className="text-gray-600 text-sm mt-2">

            Discover personalized projects based on your skills

          </p>

        </div>


        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">

  <Code2 size={18} className="text-cyan-600"/>

  Skills

</label>

        <input

          type="text"

          value={skills}

          onChange={(e) => setSkills(e.target.value)}

          placeholder="Enter skills separated by commas"

          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"

        />


        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">

  <Calendar size={18} className="text-cyan-600"/>

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


        <label className="flex items-center gap-2 mb-2 font-medium text-gray-800">

  <Target size={18} className="text-cyan-600"/>

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

            transition-all

            duration-300

          "

        >

          Generate Ideas

        </button>


        {loading && (

          <div className="flex items-center justify-center gap-3 mt-4">

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

            ></div>

            <p className="text-blue-600 font-medium">

              Generating recommendations...

            </p>

          </div>

        )}


        {results.length > 0 ? (

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">

            <h2 className="font-bold mb-4 text-blue-700 flex items-center gap-2">

  <Sparkles
    size={20}
    className="text-cyan-500"
  />

  AI Recommended Projects

</h2>

            {results.map((result, index) => (

              <div

                key={index}

                className="

                  mb-4

                  p-4

                  bg-white

                  rounded-xl

                  border

                  border-gray-200

                  shadow-sm

                  hover:shadow-lg

                  transition-all

                  duration-300

                "

              >

                <h3 className="text-lg font-bold text-black mb-2">

                  {result.title}
                  <span className="inline-block mb-3 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">

  {result.category}

</span>

                </h3>

                


                <p className="text-black mb-3">

                  {result.description}

                </p>


                <div className="flex gap-3 mb-3">

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

                    ⏳ {result.duration}

                  </span>

                </div>


                <div className="flex flex-wrap gap-2 mb-3">

                  {result.techStack.map((tech, i) => (

                    <span

                      key={i}

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

                  <span className="font-semibold">

                    Skills:

                  </span>

                  {" "}

                  {result.skills.join(", ")}

                </p>


                <p className="text-sm text-gray-700 mb-1">

                  <span className="font-semibold">

                    Year:

                  </span>

                  {" "}

                  {result.year}

                </p>


                <p className="text-sm text-gray-700">

                  <span className="font-semibold">

                    Goal:

                  </span>

                  {" "}

                  {result.goal}

                </p>

              </div>

            ))}

          </div>

        ) : searched && !loading ? (

         <div className="mt-6 p-4 bg-gray-100 rounded-lg">

  <p className="text-black font-semibold">

    🚫 No matching projects found.

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
