import React, { useState } from "react";
import { X, PlusCircle, Globe, Code, HelpCircle } from "lucide-react";

export default function CustomGameModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Arcade");
  const [controls, setControls] = useState("");
  const [embedInput, setEmbedInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please provide a game name.");
      return;
    }

    if (!embedInput.trim()) {
      setError("Please paste a game URL or full iframe embed HTML.");
      return;
    }

    let iframeString = embedInput.trim();

    // If they pasted just a URL, wrap it in an iframe
    if (embedInput.startsWith("http://") || embedInput.startsWith("https://") || !embedInput.includes("<iframe")) {
      let url = embedInput.trim();
      // Basic check
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      iframeString = `<iframe src="${url}" style="width:100%; height:100%; border:0;" allowfullscreen="true" scrolling="no"></iframe>`;
    } else {
      // Basic iframe sanity check
      if (!iframeString.toLowerCase().includes("<iframe") || !iframeString.toLowerCase().includes("src=")) {
        setError("Invalid iframe syntax. Make sure it has a valid 'src' property.");
        return;
      }
    }

    const newGame = {
      id: "custom-" + Date.now(),
      title,
      description: description.trim() || "A custom integrated iframe game.",
      category,
      controls: controls.trim() || "Standard mouse and keyboard controls.",
      iframe: iframeString
    };

    onAdd(newGame);
    onClose();
  };

  return (
    <div id="custom-game-modal" className="fixed inset-0 bg-[#000]/80 flex items-center justify-center p-4 z-[50] backdrop-blur-sm animate-fade-in">
      <div className="bg-[#120721] border border-purple-500/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-purple-500/10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/10 bg-purple-950/20">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white font-display">Add Custom Game</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Game Name*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chrome Dino, Tic Tac Toe"
              className="w-full bg-[#1c0d30] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 placeholder-purple-400/40"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1c0d30] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Skill">Skill</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Controls Info</label>
              <input
                type="text"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                placeholder="e.g. Arrow keys, Spacebar"
                className="w-full bg-[#1c0d30] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 placeholder-purple-400/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5 flex justify-between items-center">
              <span>Embed Game Source (URL or Iframe HTML)*</span>
              <span className="text-[10px] text-purple-400 lowercase italic">Handles direct links automatically</span>
            </label>
            <div className="relative">
              <textarea
                value={embedInput}
                onChange={(e) => setEmbedInput(e.target.value)}
                placeholder="Paste game address (e.g. https://play.etc/snake) OR <iframe src='...'></iframe>"
                className="w-full h-24 bg-[#1c0d30] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-purple-400 placeholder-purple-400/30 text-xs"
                required
              />
              <div className="absolute right-3 bottom-3 flex space-x-2 text-purple-500 text-xs select-none">
                <Globe className="w-4 h-4" title="URLs supported" />
                <Code className="w-4 h-4" title="HTML frames supported" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Game Bio / Pitch</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short catchy copy illustrating why you love this game..."
              className="w-full h-16 bg-[#1c0d30] border border-purple-500/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-400 placeholder-purple-400/40"
            />
          </div>

          {/* Quick Sandbox Help */}
          <div className="bg-purple-900/10 border border-purple-500/10 p-3 rounded-xl flex items-start space-x-2.5">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-purple-300/80 leading-relaxed">
              <strong>Sandboxing Notice:</strong> Custom embeds run with maximum sandbox restrictions for security. Some commercial sites block embedded hosting due to protective browser settings. Ensure you use an embed-friendly source.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-xl cursor-pointer font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-purple-600 font-semibold hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 cursor-pointer transition-all duration-300"
            >
              Add to Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
