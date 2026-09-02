"use client";
import { Board } from "@/components/Board";

const initialLists = [
  {
    id: "1",
    title: "To Do",
    cards: [
      { id: "c1", title: "Research competitors", labels: ["feature"], description: "" },
      { id: "c2", title: "Fix login bug", labels: ["urgent", "bug"], description: "Users cannot login with email" },
      { id: "c3", title: "Design landing page", labels: ["feature"], description: "" },
    ]
  },
  {
    id: "2",
    title: "In Progress",
    cards: [
      { id: "c4", title: "Build API endpoints", labels: ["feature"], description: "REST API for user management" },
      { id: "c5", title: "Write unit tests", labels: [], description: "" },
    ]
  },
  {
    id: "3",
    title: "Review",
    cards: [
      { id: "c6", title: "Code review PR #42", labels: ["done"], description: "" },
    ]
  },
  {
    id: "4",
    title: "Done",
    cards: [
      { id: "c7", title: "Setup CI/CD", labels: ["done"], description: "GitHub Actions configured" },
      { id: "c8", title: "Deploy to production", labels: ["done"], description: "" },
    ]
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-600">
      <nav className="bg-blue-700/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-xl font-bold">Trello</h1>
          <button className="bg-white/20 text-white px-3 py-1 rounded text-sm hover:bg-white/30">Workspaces</button>
          <button className="bg-white/20 text-white px-3 py-1 rounded text-sm hover:bg-white/30">Recent</button>
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Search" className="bg-white/20 text-white placeholder-white/60 px-3 py-1 rounded text-sm w-48 focus:outline-none focus:bg-white/30" />
          <div className="h-8 w-8 rounded bg-white text-blue-600 flex items-center justify-center font-bold text-sm">K</div>
        </div>
      </nav>
      <Board initialLists={initialLists} />
    </div>
  );
}
