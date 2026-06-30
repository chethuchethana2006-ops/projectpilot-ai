import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import projectIdeas from "@/data/projectIdeas";

type ProjectIdea = {
  title: string;
  category: string;
  skills: string[];
  year: string;
  goal: string;
  description: string;
  difficulty: string;
  duration: string;
  techStack: string[];
};

type GenerateRequest = {
  skills?: string;
  year?: string;
  goal?: string;
};

const normalizeText = (value: string) => value.trim().toLowerCase();

const normalizeProject = (project: Partial<ProjectIdea>): ProjectIdea => ({
  title: String(project.title || "AI Project Recommendation"),
  category: String(project.category || "Artificial Intelligence"),
  skills: Array.isArray(project.skills)
    ? project.skills.map(String)
    : ["javascript", "react", "ai"],
  year: String(project.year || "2nd Year"),
  goal: String(project.goal || "learning"),
  description: String(
    project.description ||
      "Build a practical portfolio project with clean UI, useful features, and real-world value.",
  ),
  difficulty: String(project.difficulty || "Intermediate"),
  duration: String(project.duration || "2 Weeks"),
  techStack: Array.isArray(project.techStack)
    ? project.techStack.map(String)
    : ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
});

const parseGeminiResponse = (text: string): ProjectIdea[] => {
  try {
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    const recommendations = Array.isArray(parsed)
      ? parsed
      : parsed.recommendations || parsed.projects || [];

    if (!Array.isArray(recommendations)) {
      return [];
    }

    return recommendations.map(normalizeProject).slice(0, 5);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.error("Raw Gemini response:", text);
    return [];
  }
};

const fallbackRecommendations = (
  skills: string,
  year: string,
  goal: string,
): ProjectIdea[] => {
  const userSkills = skills
    .split(",")
    .map((skill) => normalizeText(skill))
    .filter(Boolean);

  const exactMatches = projectIdeas.filter((project: ProjectIdea) => {
    const projectSkills = project.skills.map((skill) => normalizeText(skill));
    const skillMatch = userSkills.some((skill) =>
      projectSkills.some(
        (projectSkill) =>
          projectSkill.includes(skill) || skill.includes(projectSkill),
      ),
    );

    return (
      skillMatch &&
      project.year === year &&
      normalizeText(project.goal) === normalizeText(goal)
    );
  });

  const skillMatches = projectIdeas.filter((project: ProjectIdea) => {
    const projectSkills = project.skills.map((skill) => normalizeText(skill));

    return userSkills.some((skill) =>
      projectSkills.some(
        (projectSkill) =>
          projectSkill.includes(skill) || skill.includes(projectSkill),
      ),
    );
  });

  const source = exactMatches.length > 0 ? exactMatches : skillMatches;

  return source.slice(0, 3).map((project: ProjectIdea) => ({
    ...project,
    year,
    goal,
  }));
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Gemini API key." },
        { status: 500 },
      );
    }

    const { skills = "", year = "2nd Year", goal = "learning" } =
      (await request.json()) as GenerateRequest;

    if (!skills.trim()) {
      return NextResponse.json(
        { error: "Please enter at least one skill." },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are ProjectPilot AI, an expert project recommendation assistant for students.

The user wants portfolio project ideas.

User details:
- Skills: ${skills}
- Academic year: ${year}
- Goal: ${goal}

Use these sample projects only as style inspiration:
${JSON.stringify(projectIdeas.slice(0, 10), null, 2)}

Generate exactly 3 new project recommendations.

Rules:
- Do not return an empty array.
- Do not copy the sample projects exactly.
- Match the user's skills, academic year, and goal.
- Make the projects impressive enough for a portfolio.
- Use realistic tech stacks.
- Keep descriptions clear and practical.
- Return valid JSON only.
- No markdown.
- No explanation.

Return this exact JSON structure:
{
  "recommendations": [
    {
      "title": "Project title",
      "category": "Category",
      "skills": ["skill1", "skill2"],
      "year": "${year}",
      "goal": "${goal}",
      "description": "Short useful description",
      "difficulty": "Beginner or Intermediate or Advanced",
      "duration": "2 Weeks",
      "techStack": ["Tech 1", "Tech 2", "Tech 3"]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    const rawText = response.text || "";
    let recommendations = parseGeminiResponse(rawText);

    if (recommendations.length === 0) {
      recommendations = fallbackRecommendations(skills, year, goal);
    }

    if (recommendations.length === 0) {
      recommendations = [
        {
          title: "AI-Powered Student Project Recommender",
          category: "Artificial Intelligence",
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          year,
          goal,
          description:
            "Build an AI tool that recommends personalized projects based on student skills, academic year, and career goals.",
          difficulty: "Intermediate",
          duration: "2 Weeks",
          techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
        },
      ];
    }

    return NextResponse.json({
      recommendations,
      raw: rawText,
    });
  } catch (error) {
    console.error("Gemini route error:", error);

    return NextResponse.json(
      { error: "Unable to generate recommendations. Please try again." },
      { status: 500 },
    );
  }
}