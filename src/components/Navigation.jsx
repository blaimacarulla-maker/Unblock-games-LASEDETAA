import React, { useState, useEffect } from "react";
import { 
  Gamepad2, Search, SlidersHorizontal, Sparkles, 
  EyeOff, Keyboard, ShieldAlert, Heart, PlusCircle, Monitor, Clock
} from "lucide-react";

export default function Navigation({
  searchQuery,
  onSearchChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenCustomModal,
  panicActive,
  onTogglePanic,
  cloakPreset,
  setCloakPreset,
  customGamesCount,
  activeCategory,
  onCategoryChange,
}) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update favicon helper
  const changeFavicon = (src) => {
    try {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = src;
    } catch (e) {
      console.error("Favicon replacement blocked or unsupported in current view space.", e);
    }
  };

  // Adjust Document Title & Favicon dynamically based on Panic state
  useEffect(() => {
    if (panicActive) {
      if (cloakPreset === "docs") {
        document.title = "AP Chemistry - Term Lab Report & Field Notes";
        changeFavicon("https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico");
      } else {
        document.title = "Cellular Respiration - Wikipedia";
        // fallback safe google-styled icon or original wiki
        changeFavicon("https://en.wikipedia.org/favicon.ico");
      }
    } else {
      document.title = "Unblocked Games | Clean Arcade";
      changeFavicon("https://raw.githubusercontent.com/lucide-react/lucide/main/icons/gamepad-2.svg");
    }
  }, [panicActive, cloakPreset]);

  return (
    <nav className="border-b border-purple-500/15 bg-[#120721]/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Brand & Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer select-none">
          <div className="bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-600/30 text-white animate-pulse">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white font-display tracking-tight flex items-center space-x-1">
              <span>UNBLOCKED</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-glow">
                GAMES
              </span>
            </h1>
            <p className="text-[10px] text-purple-400 font-mono flex items-center space-x-2">
              <span>SANDBOX ENGINE V1.2</span>
              <span className="text-purple-600">•</span>
              <span className="flex items-center space-x-1 text-fuchsia-400">
                <Clock className="w-3 h-3 text-purple-500" />
                <span>UTC {currentTime}</span>
              </span>
            </p>
          </div>
        </div>

        {/* Small Panic Trigger for Mobile */}
        <button
          onClick={onTogglePanic}
          className="md:hidden flex items-center space-x-1.5 bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-red-100 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs select-none transition-all duration-300"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>PANIC</span>
        </button>
      </div>

      {/* Main filter bars / search inputs */}
      <div className="flex-1 max-w-lg md:mx-4 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search game name, theme or category..."
            className="w-full bg-[#1c0d30] border border-purple-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 placeholder-purple-400/30"
          />
          <Search className="w-4 h-4 text-purple-400/60 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Toolbox actions */}
      <div className="flex items-center justify-between md:justify-end gap-3 select-none flex-wrap">
        
        {/* Favorite Filtering */}
        <button
          onClick={onToggleFavoritesOnly}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-300 ${
            showFavoritesOnly 
              ? "bg-rose-500/20 text-rose-300 border-rose-500/40" 
              : "bg-purple-950/10 text-purple-300 border-purple-500/10 hover:border-purple-500/40"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-rose-400 text-rose-400" : ""}`} />
          <span>Favs ({favoritesCount})</span>
        </button>

        {/* Custom Game Submission Trigger */}
        <button
          onClick={onOpenCustomModal}
          className="flex items-center space-x-1.5 bg-[#1c0d30] hover:bg-purple-950/20 hover:border-purple-500/40 border border-purple-500/10 text-purple-300 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300"
        >
          <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>Add Custom ({customGamesCount})</span>
        </button>

        {/* Tab Cloak presets Selector */}
        <div className="bg-[#1c0d30] border border-purple-500/10 p-1 rounded-xl flex items-center space-x-1 text-xs">
          <span className="text-[10px] font-mono text-purple-400/80 uppercase px-1.5">Cloak:</span>
          <select
            value={cloakPreset}
            onChange={(e) => setCloakPreset(e.target.value)}
            className="bg-[#120721] text-purple-300 outline-none text-xs rounded border border-purple-500/20 px-1.5 py-1"
          >
            <option value="docs">Google Docs</option>
            <option value="wikipedia">Wikipedia</option>
          </select>
        </div>

        {/* Interactive Master Panic Trigger */}
        <button
          onClick={onTogglePanic}
          className="hidden md:flex items-center space-x-1.5 bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-300 hover:text-white px-4 py-2 rounded-xl font-bold text-xs select-none shadow-lg shadow-red-600/5 cursor-pointer transition-all duration-300"
          title="Instantly switch to background homework tab (Shortcut: Esc)"
        >
          <EyeOff className="w-4 h-4" />
          <span>PANIC BUTTON (ESC)</span>
        </button>
      </div>
    </nav>
  );
}
