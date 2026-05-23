import React, { useState } from "react";
import { 
  FileText, Share2, HelpCircle, History, MessageSquare, 
  Video, Lock, Search, Bold, Italic, Underline, AlignLeft, 
  AlignCenter, AlignRight, List, Printer, CheckSquare, Undo, Redo
} from "lucide-react";

export default function PanicScreen({ onDisable, preset }) {
  const [essayContent, setEssayContent] = useState(
    `Topic: Analysis of Quantum Superposition in Classical Thermodynamics\n\nQuantum superposition remains one of the cornerstone principles of modern quantum mechanics. Historically, macro-systems have been evaluated through traditional statistical models, neglecting coherent states of atomic arrays.\n\nRecent experimental implementations suggest that nanoscale silicon-vacuum interfaces can maintain coherent states for several nanoseconds under low-temperature conditions. This breakthrough paves the way for hybrid computing systems that blend silicon-carbide components with standard logic arrays...\n\nEdit these notes to prepare for the upcoming examination...`
  );

  const [wikiSearch, setWikiSearch] = useState("Microeconomics");

  if (preset === "docs") {
    return (
      <div 
        id="panic-docs-screen" 
        className="w-screen h-screen bg-[#F9FBFD] text-gray-800 flex flex-col font-sans select-text overflow-hidden z-[9999] fixed inset-0"
      >
        {/* Google Docs Top Header */}
        <header className="flex items-center justify-between p-2 pb-0 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600 p-1 bg-blue-50 rounded" title="Exit Panic (Double Click)">
              <FileText className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  defaultValue="AP Chemistry - Term Lab Report & Field Notes"
                  className="font-medium text-lg text-gray-700 bg-transparent hover:border-gray-300 border border-transparent px-1 rounded focus:border-blue-500 focus:outline-none w-80"
                />
                <button
                  onClick={onDisable}
                  className="text-xs text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 px-1.5 py-0.5 rounded cursor-pointer"
                  title="Return to unblocked games"
                >
                  Unlock Arcade (Esc)
                </button>
              </div>
              
              <nav className="flex space-x-3 text-xs text-gray-600 mt-1 pb-1">
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">File</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Edit</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">View</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Insert</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Format</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Tools</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Extensions</span>
                <span className="hover:bg-gray-100 px-1 py-0.5 rounded cursor-pointer">Help</span>
                <span className="text-gray-400 italic">Saving to Google Drive...</span>
              </nav>
            </div>
          </div>

          <div className="flex items-center space-x-4 pr-3">
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 cursor-pointer">
              <History className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 cursor-pointer">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 cursor-pointer">
              <Video className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer">
              <Lock className="w-4 h-4 text-blue-700" />
              <span>Share</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
              S
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-[#EDF2FA] py-1 px-4 flex items-center space-x-2 border-b border-gray-300">
          <Undo className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Redo className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Printer className="w-4 h-4 text-gray-600 cursor-pointer" />
          <CheckSquare className="w-4 h-4 text-gray-600 cursor-pointer" />
          <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>
          <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-300 rounded cursor-pointer">100%</span>
          <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>
          <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-300 rounded cursor-pointer">Normal text</span>
          <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-300 rounded cursor-pointer">Arial</span>
          <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>
          <Bold className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Italic className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Underline className="w-4 h-4 text-gray-600 cursor-pointer" />
          <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>
          <AlignLeft className="w-4 h-4 text-gray-600 cursor-pointer" />
          <AlignCenter className="w-4 h-4 text-gray-600 cursor-pointer" />
          <AlignRight className="w-4 h-4 text-gray-600 cursor-pointer" />
          <List className="w-4 h-4 text-gray-600 cursor-pointer" />
        </div>

        {/* Workspace Canvas (Simulation of Page) */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#F2F3F5]">
          <div className="w-[816px] h-[1056px] min-h-[1056px] bg-white border border-gray-300 shadow-sm p-24 font-serif text-[15px] leading-relaxed relative flex flex-col">
            <div className="text-right text-gray-400 text-xs mb-8">Page 1 of 1</div>
            
            {/* Real editable area so typing looks genuine */}
            <textarea
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              className="w-full flex-1 bg-transparent border-0 resize-none font-serif text-gray-800 text-[16px] leading-8 focus:ring-0 focus:outline-none focus:border-0"
              placeholder="Start drafting your comprehensive research project here..."
            />

            <div className="absolute bottom-6 right-6 text-xs text-gray-300 select-none">
              Word Count: 184
            </div>
            
            <div 
              onDoubleClick={onDisable}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-300 text-[10px] select-none cursor-pointer"
            >
              Double Click to exit panic mode safely
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Wikipedia Mock
    return (
      <div 
        id="panic-wikipedia-screen" 
        className="w-screen h-screen bg-white text-[#202122] flex flex-col font-sans select-text overflow-y-auto z-[9999] fixed inset-0"
      >
        {/* Wiki Bar */}
        <header className="border-b border-gray-300 py-3 px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-serif text-[24px] italic font-bold tracking-tight text-gray-900 border-r border-gray-300 pr-4">
              WIKIPEDIA
            </span>
            <span className="text-xs text-gray-500">The Free Encyclopedia</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative w-80">
              <input
                type="text"
                value={wikiSearch}
                onChange={(e) => setWikiSearch(e.target.value)}
                className="w-full border border-gray-300 pl-8 pr-4 py-1.5 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                placeholder="Search Wikipedia..."
              />
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={onDisable}
              className="text-xs text-blue-600 hover:underline border border-blue-400 rounded px-2 py-1 font-semibold"
            >
              Back to Wiki Index (Esc)
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto w-full px-8 py-6 flex">
          {/* Main article Content */}
          <div className="flex-1 pr-8">
            <h1 className="font-serif text-[40px] border-b border-gray-300 pb-2 mb-4 tracking-normal">
              Cellular Respiration
            </h1>
            <p className="text-[14px] leading-7 mb-4">
              From Wikipedia, the free internet encyclopedia.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-6 text-sm text-amber-900">
              <strong>Academic Review:</strong> This article contains details aligned with the AP Biology and Biochemistry curricular frameworks. Clean logs are synchronized.
            </div>

            <p className="text-[15px] leading-7 mb-4">
              <strong>Cellular respiration</strong> is a set of metabolic reactions and processes that take place in the cells of organisms to convert chemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products.
            </p>

            <p className="text-[15px] leading-7 mb-4 font-serif">
              The reactions involved in cellular respiration are catabolic reactions, which break large molecules into smaller ones, releasing energy because weak, high-energy bonds in biochemical reactants are replaced by stronger bonds in the chemical products.
            </p>

            <h2 className="font-serif text-[24px] border-b border-gray-200 pb-1 mt-6 mb-3">
              Aerobic Respiration
            </h2>
            <p className="text-[15px] leading-7 mb-4">
              Aerobic respiration requires oxygen (O<sub>2</sub>) in order to create ATP. It is the preferred method of pyruvate breakdown in glycolysis and requires that pyruvate enter the mitochondrion to be fully oxidized by the Krebs cycle.
            </p>

            <h3 className="font-semibold text-lg mt-4 mb-2">1. Glycolysis</h3>
            <p className="text-[15px] leading-7 mb-4">
              Glycolysis is a metabolic pathway that takes place in the cytosol of cells in all living organisms. This pathway can function with or without the presence of gaseous oxygen. In humans, glycolysis produces two molecules of pyruvate, two molecules of ATP, and two molecules of NADH.
            </p>
            
            <button
              onClick={onDisable}
              className="text-xs text-gray-300 hover:text-gray-500 mt-12 cursor-pointer pb-12"
            >
              Double-click anywhere or press ESC to unlock
            </button>
          </div>

          {/* Quick Info Box Sidebar */}
          <div className="w-80 border border-gray-300 bg-[#f8f9fa] p-4 text-xs select-none">
            <h4 className="font-bold text-center border-b border-gray-300 pb-2 mb-2 text-sm bg-gray-100 p-1">
              Cellular Respiration Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Chemical Eq:</span>
                <span className="text-right">C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Reactants:</span>
                <span className="text-right">Glucose, Oxygen</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Products:</span>
                <span className="text-right">ATP, Carbon Dioxide, Water</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">ATP Yield:</span>
                <span className="text-right">30 to 32 ATP molecules</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Major Pathways:</span>
                <span className="text-right">Glycolysis, Citric Acid Cycle, Oxidative Phosphorylation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
