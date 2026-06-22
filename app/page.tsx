export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        ProjectPilot AI
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Discover personalized project ideas based on your skills,
        academic year, and career goals.
      </p>

      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </main>
  );
}