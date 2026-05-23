import React from "react";
import { Star, Heart, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function GameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onSelect,
  isCustom = false
}) {
  // Safe dynamic lucide icon rendering
  const renderIcon = () => {
    try {
      const IconName = game.icon || "Gamepad2";
      const IconComponent = LucideIcons[IconName] || LucideIcons.Gamepad2;
      return <IconComponent className="w-8 h-8 text-white" />;
    } catch {
      return <LucideIcons.Gamepad2 className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div 
      id={`game-card-${game.id}`}
      onClick={() => onSelect(game)}
      className="group bg-[#120721]/70 border border-purple-500/15 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/40 hover:bg-purple-950/10 transition-all duration-300 flex flex-col justify-between relative shadow-lg shadow-purple-950/5 hover:-translate-y-1"
    >
      {/* Dynamic Graphic Top Section */}
      <div className={`h-36 bg-gradient-to-tr ${game.color || "from-purple-600 to-pink-600"} p-5 relative flex flex-col justify-between overflow-hidden`}>
        {/* Background Ambient Circle decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:scale-125 transition-transform duration-500"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/20 rounded-full blur-xl"></div>

        {/* Action Header on graphic */}
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] uppercase font-mono tracking-wider bg-black/35 text-purple-200 px-2 py-1 rounded-md backdrop-blur-sm">
            {game.category}
          </span>
          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm shadow-sm hover:scale-110 transition-all cursor-pointer"
            title={isFavorite ? "Remove favorite" : "Pin to Favorites"}
          >
            <Heart 
              className={`w-4 h-4 text-rose-400 font-bold transition-all ${
                isFavorite ? "fill-rose-400 scale-110" : "text-white/80"
              }`} 
            />
          </button>
        </div>

        {/* Center Game Icon */}
        <div className="flex items-center justify-center py-2 z-10 transform group-hover:scale-110 transition-transform duration-300">
          <div className="bg-black/25 p-3.5 rounded-2xl border border-white/10 shadow-inner">
            {renderIcon()}
          </div>
        </div>

        {/* Secondary Detail Row on Graphic (Rating) */}
        <div className="flex items-center justify-between z-10 text-white/95">
          <div className="flex items-center space-x-1 bg-black/20 px-2 py-0.5 rounded text-xs select-none backdrop-blur-sm">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-mono text-[11px] font-bold">{game.rating ? game.rating.toFixed(1) : "5.0"}</span>
          </div>

          <span className="text-[10px] text-white/60 font-mono flex items-center space-x-1">
            <Play className="w-2.5 h-2.5 fill-white text-white" />
            <span>PLAY NOW</span>
          </span>
        </div>
      </div>

      {/* Description Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-display leading-tight">
            {game.title}
          </h4>
          <p className="text-xs text-purple-200/60 leading-relaxed mt-1.5 line-clamp-2 select-text">
            {game.description}
          </p>
        </div>

        {/* Detail Controls footer */}
        <div className="pt-3 border-t border-purple-500/5 flex items-center justify-between text-[11px] text-purple-400 font-mono">
          <span className="truncate max-w-[150px]" title={game.controls}>
            🎮 {game.controls || "Mouse & Keyboard"}
          </span>
          {isCustom && (
            <span className="text-pink-400 font-bold uppercase text-[9px] px-1.5 py-0.5 bg-pink-500/10 rounded border border-pink-500/20">
              Personal Web Game
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
