"use client";
import { useState } from "react";

interface Card {
  id: string;
  title: string;
  description?: string;
  labels: string[];
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

export function Board({ initialLists }: { initialLists: List[] }) {
  const [lists, setLists] = useState(initialLists);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addingTo, setAddingTo] = useState<string | null>(null);

  const addCard = (listId: string) => {
    if (!newCardTitle.trim()) return;
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, {
            id: Math.random().toString(36).substr(2, 9),
            title: newCardTitle,
            labels: [],
          }]
        };
      }
      return list;
    }));
    setNewCardTitle("");
    setAddingTo(null);
  };

  const addList = () => {
    const title = prompt("List name:");
    if (title) {
      setLists([...lists, {
        id: Math.random().toString(36).substr(2, 9),
        title,
        cards: [],
      }]);
    }
  };

  const labelColors: Record<string, string> = {
    "urgent": "bg-red-500",
    "feature": "bg-blue-500",
    "bug": "bg-yellow-500",
    "done": "bg-green-500",
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto h-[calc(100vh-64px)]">
      {lists.map((list) => (
        <div key={list.id} className="w-72 bg-gray-100 rounded-lg p-2 flex flex-col max-h-full">
          <h3 className="font-bold px-2 py-1">{list.title}</h3>
          <div className="flex-1 overflow-y-auto space-y-2 mb-2">
            {list.cards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg p-3 shadow cursor-pointer hover:bg-gray-50">
                {card.labels.length > 0 && (
                  <div className="flex gap-1 mb-2">
                    {card.labels.map((label) => (
                      <span key={label} className={`h-1 w-10 rounded ${labelColors[label] || "bg-gray-400"}`} />
                    ))}
                  </div>
                )}
                <p className="text-sm">{card.title}</p>
                {card.description && <p className="text-xs text-gray-500 mt-1">{card.description}</p>}
              </div>
            ))}
          </div>
          {addingTo === list.id ? (
            <div className="bg-white rounded-lg p-2">
              <textarea
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter a title..."
                className="w-full resize-none border-0 focus:outline-none text-sm"
                rows={2}
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) addCard(list.id); if (e.key === "Escape") setAddingTo(null); }}
              />
              <div className="flex gap-2 mt-2">
                <button onClick={() => addCard(list.id)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Add</button>
                <button onClick={() => setAddingTo(null)} className="text-gray-500 px-3 py-1 rounded text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingTo(list.id)} className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-200 rounded text-sm">
              + Add a card
            </button>
          )}
        </div>
      ))}
      <button onClick={addList} className="w-72 bg-gray-200/50 hover:bg-gray-200 rounded-lg p-2 text-gray-600 h-fit">
        + Add another list
      </button>
    </div>
  );
}
