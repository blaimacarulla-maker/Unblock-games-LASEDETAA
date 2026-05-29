import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, Compass, AlertCircle, Trash2, Heart, 
  PlusCircle, LayoutGrid, Info, HelpCircle, Sparkles
} from "lucide-react";

import defaultGamesData from "./data/games.json";

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import GameCard from "./components/GameCard";
import ArcadePlayer from "./components/ArcadePlayer";
import PanicScreen from "./components/PanicScreen";
import CustomGameModal from "./components/CustomGameModal";

export default function App() {
  const [games, setGames] = useState(defaultGamesData);
  const [customGames, setCustomGames] = useState(() => {
    try {
      const data = localStorage.getItem("unblocked_custom_games");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [panicActive, setPanicActive] = useState(false);
  const [cloakPreset, setCloakPreset] = useState("docs");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Persistent stats
  const [favorites, setFavorites] = useState(() => {
    try {
      const data = localStorage.getItem("unblocked_favs");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [ratings, setRatings] = useState(() => {
    try {
      const data = localStorage.getItem("unblocked_ratings");
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  const [totalPlays, setTotalPlays] = useState(() => {
    try {
      const data = localStorage.getItem("unblocked_total_plays");
      return data ? parseInt(data, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Keep state synchronized to LocalStorage
  useEffect(() => {
    localStorage.setItem("unblocked_custom_games", JSON.stringify(customGames));
  }, [customGames]);

  useEffect(() => {
    localStorage.setItem("unblocked_favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("unblocked_ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("unblocked_total_plays", totalPlays.toString());
  }, [totalPlays]);

useEffect(() => {

  const changeFavicon = (icon) => {
    let link = document.querySelector("link[rel='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = icon;
  };
const handleKeyDown = (e) => {
  if (e.key !== "Escape") return;

  e.preventDefault();

  setPanicActive((prev) => {
    const next = !prev;

    if (next) {
      if (cloakPreset === "docs") {
        document.title = "Google Docs";

        changeFavicon(
          "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
        );
      } else {
        document.title = "Wikipedia";

        changeFavicon(
          "https://en.wikipedia.org/static/favicon/wikipedia.ico"
        );
      }
    } else {
      document.title = "Unblocked Games | Clean Arcade";

      changeFavicon("/logo.png");
    }

    return next;
  });
};

window.addEventListener("keydown", handleKeyDown, true);
document.addEventListener("keydown", handleKeyDown, true);

return () => {
  window.removeEventListener("keydown", handleKeyDown, true);
  document.removeEventListener("keydown", handleKeyDown, true);
};

}, [cloakPreset]);
  // Map custom games nicely into list format
  const mapCustomToGame = (cg) => {
    const userRating = ratings[cg.id] || 5.0;
    return {
      id: cg.id,
      title: cg.title,
      description: cg.description,
      category: cg.category,
      controls: cg.controls,
      iframe: cg.iframe,
      icon: "Sparkles",
      color: "from-pink-500 to-rose-600",
      rating: userRating,
    };
  };

  const allVisibleGames = [
    ...games.map(g => ({ ...g, rating: ratings[g.id] || g.rating })),
    ...customGames.map(cg => mapCustomToGame(cg)),
  ];

  // Filtering Logic
  const filteredGames = allVisibleGames.filter((game) => {
    // 1. Search Query filter
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchesTitle = game.title.toLowerCase().includes(query);
      const matchesDesc = game.description.toLowerCase().includes(query);
      const matchesCat = game.category.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc && !matchesCat) return false;
    }

    // 2. Favorites only toggle
    if (showFavoritesOnly && !favorites.includes(game.id)) {
      return false;
    }

    // 3. Category selectors
    if (activeCategory === "custom") {
      // Must be a custom game
      return customGames.some((cg) => cg.id === game.id);
    } else if (activeCategory !== "all") {
      if (game.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setTotalPlays((prev) => prev + 1);
  };

  const handleSaveRating = (id, score) => {
    setRatings((prev) => ({
      ...prev,
      [id]: score,
    }));
  };

  const handleAddCustomGame = (newGame) => {
    setCustomGames((prev) => [newGame, ...prev]);
  };

  const handleResetStats = () => {
    if (window.confirm("Are you sure you want to clear your playing statistics and custom games?")) {
      setCustomGames([]);
      setFavorites([]);
      setRatings({});
      setTotalPlays(0);
      setSelectedGame(null);
    }
  };

  const handleRemoveCustomGame = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Remove this custom embedded game from your library?")) {
      setCustomGames((prev) => prev.filter((cg) => cg.id !== id));
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      if (selectedGame?.id === id) {
        setSelectedGame(null);
      }
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#0b0214] text-gray-100 font-sans flex flex-col selection:bg-purple-500 selection:text-white pb-12 antialiased">
      
      {/* Dynamic Panic Hide Screen overlay with AnimatePresence */}
      <AnimatePresence>
        {panicActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9999]"
          >
            <PanicScreen 
              onDisable={() => setPanicActive(false)} 
              preset={cloakPreset} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header navigation */}
      <Navigation
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        panicActive={panicActive}
        onTogglePanic={() => setPanicActive(!panicActive)}
        cloakPreset={cloakPreset}
        setCloakPreset={setCloakPreset}
        customGamesCount={customGames.length}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onCustomizeCloak={() => {}}
      />

          {/* Website Logo */}
      <div className="w-full flex justify-center pt-6 pb-4">
        <img
          src="/Unblock-games-LASEDETAA/myweb.png"
          alt="Website Logo"
          className="w-72 md:w-[500px] h-auto drop-shadow-2xl"
        />
      </div>

      {/* Layout Grid container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-2 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar filtering pane - Hide when playing a game in fullscreen theater */}
        {!selectedGame && (
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setShowFavoritesOnly(false); // Reset fav filter to focus on category clicked
            }}
            favoritesCount={favorites.length}
            customGamesCount={customGames.length}
            totalPlays={totalPlays}
            onResetStats={handleResetStats}
          />
        )}

        {/* Dynamic Center Stage view */}
        <main className="flex-1 flex flex-col space-y-6 min-w-0">
          
          <AnimatePresence mode="wait">
            {selectedGame ? (
              // Playing Screen View
              <motion.div
                key="arcade-theater"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <ArcadePlayer
                  game={selectedGame}
                  onBack={() => setSelectedGame(null)}
                  isFavorite={favorites.includes(selectedGame.id)}
                  onToggleFavorite={handleToggleFavorite}
                  savedRating={ratings[selectedGame.id] || 0}
                  onSaveRating={handleSaveRating}
                />
              </motion.div>
            ) : (
              // Browser Catalog Grid View
              <motion.div
                key="catalog-explorer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Heading details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-purple-500/10">
                  <div>
                    <h2 className="text-xl font-black text-white font-display uppercase tracking-tight flex items-center space-x-2">
                      <LayoutGrid className="w-5 h-5 text-purple-400" />
                      <span>
                        {activeCategory === "all" ? "All Unblocked Files" : 
                         activeCategory === "custom" ? "Your Custom Integrations" : 
                         `${activeCategory} Catalogue`}
                      </span>
                    </h2>
                    <p className="text-xs text-purple-400/75 mt-1 font-mono">
                      FOUND {filteredGames.length} SECURE GAMES UNDER TARGET PRESETS
                    </p>
                  </div>

                  {/* Quick Filters Info */}
                  {showFavoritesOnly && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 self-start select-none">
                      <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
                      <span>FAVORITES ONLY ENABLED</span>
                    </div>
                  )}
                </div>

                {/* Empty Catalog Fallback */}
                {filteredGames.length === 0 ? (
                  <div className="bg-[#120721]/40 border border-dashed border-purple-500/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
                    <div className="p-4 bg-purple-950/20 rounded-full text-purple-400">
                      <AlertCircle className="w-10 h-10 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white font-display">No matches found in database</h4>
                      <p className="text-xs text-purple-300/70 leading-relaxed max-w-md">
                        We couldn't locate any games Matching your current query or category filter. Try refining the search keywords, changing active filters, or add your own custom embedded URL code!
                      </p>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                          setShowFavoritesOnly(false);
                        }}
                        className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-500 font-semibold text-xs rounded-xl cursor-pointer transition-all duration-300"
                      >
                        Reset All Filters
                      </button>
                      <button
                        onClick={() => setIsCustomModalOpen(true)}
                        className="px-4 py-2 bg-[#1c0d30] border border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-400 font-semibold text-xs rounded-xl cursor-pointer transition-all duration-300"
                      >
                        Add Custom Link
                      </button>
                    </div>
                  </div>
                ) : (
                  // Cards Grid
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => {
                      const isCustom = customGames.some((cg) => cg.id === game.id);
                      return (
                        <div key={game.id} className="relative">
                          <GameCard
                            game={game}
                            isFavorite={favorites.includes(game.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onSelect={handleSelectGame}
                            isCustom={isCustom}
                          />
                          {isCustom && (
                            <button
                              onClick={(e) => handleRemoveCustomGame(game.id, e)}
                              className="absolute top-3.5 left-3.5 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 z-20 cursor-pointer shadow shadow-black"
                              title="Delete this custom game integration"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* Submit Custom Game Modal Dialog */}
      <AnimatePresence>
        {isCustomModalOpen && (
          <CustomGameModal
            onClose={() => setIsCustomModalOpen(false)}
            onAdd={handleAddCustomGame}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
