import React from "react";
import { 
  Compass, Gamepad2, Grid, Hexagon, ShieldAlert, Cpu, 
  Sparkles, Zap, Heart, BookOpen, AlertCircle
} from "lucide-react";

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  favoritesCount,
  customGamesCount,
  totalPlays,
  onResetStats
}) {
  const categories = [
    { id: "all", label: "All Games", icon: Compass, color: "text-purple-400" },
    { id: "Arcade", label: "Retro Arcade", icon: Gamepad2, color: "text-amber-400" },
    { id: "Puzzle", label: "Brain Puzzle", icon: Grid, color: "text-blue-400" },
    { id: "Skill", label: "Reflex Skill", icon: Zap, color: "text-fuchsia-400" },
    { id: "Strategy", label: "Classic Strategy", icon: Cpu, color: "text-emerald-400" },
    { id: "custom", label: "My Custom Links", icon: Sparkles, color: "text-pink-400" }
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#120721]/60 border-r border-purple-500/10 p-5 space-y-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6 select-none">
        
        {/* Categories Heading */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-purple-400/60 tracking-wider mb-3">
            Arcade Navigation
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "bg-purple-600/20 text-white border border-purple-500/30 shadow-md shadow-purple-600/5" 
                      : "text-purple-300/80 hover:text-white hover:bg-purple-950/10 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-purple-400" : cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                  
                  {cat.id === "custom" && customGamesCount > 0 && (
                    <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-bold">
                      {customGamesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Localized stats summary */}
        <div className="p-4 bg-purple-950/10 border border-purple-500/10 rounded-2xl space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-purple-300">Workspace Statistics</h4>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="space-y-2 text-xs divide-y divide-purple-500/5">
            <div className="flex justify-between items-center py-1.5 pt-0">
              <span className="text-purple-400/80">Sessions Loaded:</span>
              <span className="font-mono text-purple-200 font-bold">{totalPlays}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-purple-400/80">Starred Favorites:</span>
              <span className="font-mono text-purple-200 font-bold">{favoritesCount}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 pb-0">
              <span className="text-purple-400/80">Direct Embeds:</span>
              <span className="font-mono text-purple-200 font-bold">{customGamesCount}</span>
            </div>
          </div>
          {totalPlays > 0 && (
            <button
              onClick={onResetStats}
              className="w-full text-[10px] text-center font-mono text-purple-400/65 hover:text-purple-300 underline cursor-pointer"
            >
              Reset offline statistics
            </button>
          )}
        </div>

        {/* Sandbox explanation notice & shortcut */}
        <div className="p-4 bg-red-950/10 border border-red-500/10 rounded-2xl text-xs space-y-2 leading-relaxed">
          <div className="flex items-center space-x-2 text-red-300 font-bold">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>EXAMS MODE ACTIVE</span>
          </div>
          <p className="text-red-300/70 text-[11px]">
            If an administrator walks by, tap the red <strong className="text-red-200">Panic Button</strong> or hit the <strong className="text-red-200">Escape Key</strong> on your keyboard. 
          </p>
          <p className="text-red-300/70 text-[11px]">
            The entire tab will switch instantly to scientific study materials. No logs are saved.
          </p>
        </div>
      </div>

      {/* Footer credits */}
      <div className="pt-4 border-t border-purple-500/5 text-center space-y-1">
        <p className="text-[10px] text-purple-400/40 font-mono">
          © 2026 UNBLOCKED ARCADE
        </p>
        <p className="text-[9px] text-purple-400/30">
          Clean frames, pure code.
        </p>
      </div>
    </aside>
  );
}
