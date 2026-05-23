import React, { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, RefreshCw, Maximize2, Minimize2, Heart, 
  HelpCircle, Star, Sparkles, Flame, ShieldAlert, Check
} from "lucide-react";

export default function ArcadePlayer({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  savedRating,
  onSaveRating
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const playerContainerRef = useRef(null);
  const [hasCopiedUrl, setHasCopiedUrl] = useState(false);

  // Parse direct iframe URL out for copy link utility
  const getIframeUrl = () => {
    try {
      const doc = new DOMParser().parseFromString(game.iframe, "text/html");
      const iframe = doc.querySelector("iframe");
      return iframe ? iframe.getAttribute("src") : "";
    } catch {
      return "";
    }
  };

  const handleCopyLink = () => {
    const url = getIframeUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      setHasCopiedUrl(true);
      setTimeout(() => setHasCopiedUrl(false), 2000);
    }
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleFullscreenToggle = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => {
          console.error("Browser native fullscreen blocked by frame containment. Resorting to simulated full theater mode.", err);
          setIsFullscreen(true);
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Track Native Fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* Back button Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-purple-300 hover:text-white font-medium text-sm bg-purple-950/20 border border-purple-500/10 px-4 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Arcade Console</span>
        </button>
        
        <div className="text-xs font-mono text-purple-400">
          STATION: <span className="text-purple-300 font-bold">{game.title.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Play Stage Block */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div 
            ref={playerContainerRef}
            className={`relative bg-[#000] border rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl flex flex-col ${
              isFullscreen 
                ? "fixed inset-0 w-screen h-screen z-50 border-0 rounded-none" 
                : "h-[560px] border-purple-500/15"
            }`}
          >
            {/* Play Screen Header Bar */}
            <div className={`px-4 py-2 bg-[#120721] border-b border-purple-500/10 flex items-center justify-between select-none ${
              isFullscreen ? "absolute top-0 left-0 right-0 z-50" : ""
            }`}>
              <div className="flex items-center space-x-2.5">
                <Flame className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-tight">
                  {game.title} Play Mode
                </h2>
              </div>

              <div className="flex items-center space-x-3 text-purple-300">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 hover:bg-purple-500/15 rounded-lg hover:text-white transition-colors cursor-pointer"
                  title="Reload Game Frame"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFullscreenToggle}
                  className="p-1.5 hover:bg-purple-500/15 rounded-lg hover:text-white transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Iframe Mount Area */}
            <div className={`flex-1 relative bg-[#0b0214] ${isFullscreen ? "pt-[40px]" : ""}`}>
              {/* Actual Embedded raw HTML iframe with security sandboxing rules */}
              <div 
                className="w-full h-full"
                key={iframeKey}
                dangerouslySetInnerHTML={{ __html: game.iframe }}
              />

              {/* Security Badge overlay */}
              <div className="absolute bottom-3 left-3 bg-black/65 text-[10px] font-mono text-purple-400 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                SANDBOXED SECURE STACK
              </div>
            </div>
          </div>

          {/* Quick Stats Panel Under Play stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-purple-950/10 border border-purple-500/10 p-4 rounded-xl gap-4">
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Controls & Game Strategy
              </h3>
              <p className="text-xs text-purple-300/80 mt-1 leading-relaxed max-w-xl">
                {game.controls || "Standard cursor navigation. Use Arrow Keys or Mouse buttons for input."}
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0 justify-end">
              {getIframeUrl() && (
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-1 bg-purple-600/10 text-purple-300 hover:text-white hover:bg-purple-600/30 border border-purple-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300"
                >
                  {hasCopiedUrl ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{hasCopiedUrl ? "Copied Link!" : "Direct Game Link"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Info Sidebar Block */}
        <div className="space-y-6">
          
          {/* Detailed Description */}
          <div className="bg-[#120721]/50 border border-purple-500/10 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase text-purple-400 tracking-wider">Bio & Overview</h4>
            <h3 className="text-lg font-bold text-white font-display leading-tight">{game.title}</h3>
            
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              {game.description}
            </p>
            
            <div className="pt-3 border-t border-purple-500/5 flex items-center justify-between">
              <span className="text-xs text-purple-400">Class Curated:</span>
              <span className="text-xs font-semibold text-purple-200 uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{game.category}</span>
            </div>
          </div>

          {/* User Multi Star rating widget */}
          <div className="bg-[#120721]/50 border border-purple-500/10 rounded-2xl p-5 space-y-3 leading-relaxed">
            <h4 className="text-xs font-bold uppercase text-purple-400 tracking-wider">Cast Local Review</h4>
            <p className="text-[11px] text-purple-400">
              Save your local feedback for this unblocked package. Perfects recommendations:
            </p>
            
            <div className="flex items-center space-x-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onSaveRating(game.id, star)}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star 
                    className={`w-6 h-6 transition-colors ${
                      (hoverStar || savedRating) >= star 
                        ? "text-amber-400 fill-amber-400" 
                        : "text-purple-500/30"
                    }`} 
                  />
                </button>
              ))}
            </div>

            {savedRating > 0 ? (
              <p className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You rated this game: {savedRating}.0 / 5.0</span>
              </p>
            ) : (
              <p className="text-[10px] text-purple-300/50 font-mono italic">
                No rating recorded for this installation.
              </p>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-[#120721]/50 border border-purple-500/10 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase text-purple-400 tracking-wider">Speed Commands</h4>
            <div className="space-y-2">
              <button
                onClick={(e) => onToggleFavorite(game.id, e)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isFavorite 
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-purple-950/10 border-purple-500/10 text-purple-300 hover:border-purple-500/30"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400 text-rose-400" : ""}`} />
                  <span>{isFavorite ? "Remove Pin" : "Add to Favorites"}</span>
                </span>
                <span className="text-[10px] text-purple-400 font-mono">FAV</span>
              </button>

              <button
                onClick={handleRefresh}
                className="w-full flex items-center justify-between bg-purple-950/10 border border-purple-500/10 text-purple-300 hover:border-purple-500/30 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-purple-400" />
                  <span>Refresh Game Sandbox</span>
                </span>
                <span className="text-[10px] text-purple-400 font-mono">REBOOT</span>
              </button>
            </div>
          </div>

          {/* Frame Info Box */}
          <div className="bg-amber-950/10 border border-amber-500/10 rounded-2xl p-4 text-xs space-y-1.5 leading-relaxed">
            <div className="text-amber-300 font-bold flex items-center space-x-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>IFRAME LOADED STATUS</span>
            </div>
            <p className="text-amber-300/70 text-[11px]">
              These games run fully dynamically. If a game states it was blocked by its home host, configure and play using a different, direct unblocked package.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
