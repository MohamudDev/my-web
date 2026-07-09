"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sun, Moon, RotateCcw, ArrowLeft } from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [currentInput, setCurrentInput] = useState("");
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);

  // Check if winner exists
  const winner = team1Score >= 100 ? "Team 1" : team2Score >= 100 ? "Team 2" : null;
  const isGameOver = !!winner;

  // Handle number click
  const handleNumClick = (num) => {
    if (isGameOver) return;
    // Prevent leading zeroes or input length > 3
    if (currentInput === "" && num === 0) return;
    if (currentInput.length >= 3) return;
    setCurrentInput((prev) => prev + num);
  };

  // Handle Backspace
  const handleBackspace = () => {
    if (isGameOver) return;
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  // Handle Clear
  const handleClear = () => {
    if (isGameOver) return;
    setCurrentInput("");
  };

  // Handle operations (+ / -)
  const handleOperation = (op) => {
    if (isGameOver) return;
    const value = parseInt(currentInput) || 0;
    if (value === 0) return;

    if (selectedTeam === 1) {
      const prev = team1Score;
      let next = prev;
      if (op === "+") {
        next = Math.min(100, prev + value);
        setTeam1Score(next);
        setHistory1((prevHist) => [
          ...prevHist,
          { prev, op: "+", val: value, next },
        ]);
      } else {
        next = Math.max(0, prev - value);
        setTeam1Score(next);
        setHistory1((prevHist) => [
          ...prevHist,
          { prev, op: "-", val: value, next },
        ]);
      }
    } else {
      const prev = team2Score;
      let next = prev;
      if (op === "+") {
        next = Math.min(100, prev + value);
        setTeam2Score(next);
        setHistory2((prevHist) => [
          ...prevHist,
          { prev, op: "+", val: value, next },
        ]);
      } else {
        next = Math.max(0, prev - value);
        setTeam2Score(next);
        setHistory2((prevHist) => [
          ...prevHist,
          { prev, op: "-", val: value, next },
        ]);
      }
    }
    setCurrentInput("");
  };

  // Reset all
  const handleRestart = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentInput("");
    setHistory1([]);
    setHistory2([]);
    setSelectedTeam(1);
  };

  // Active score for calculation preview
  const activeScore = selectedTeam === 1 ? team1Score : team2Score;
  const inputVal = parseInt(currentInput) || 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-between pb-8 pt-6 px-4 md:px-8 font-sans ${
        isDarkMode ? "bg-[#001011] text-white" : "bg-[#F3F4F6] text-gray-800"
      }`}
    >
      {/* Background decoration (Dark Mode only) */}
      {isDarkMode && (
        <>
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[80px] pointer-events-none z-0"></div>
          <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px] pointer-events-none z-0"></div>
        </>
      )}

      {/* Header */}
      <header className="w-full max-w-lg flex items-center justify-between z-10 mb-4">
        <h1 className="text-xl md:text-2xl font-black tracking-widest text-primary uppercase">
          Score Board
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-white/5 hover:bg-white/10 text-primary"
                : "bg-black/5 hover:bg-black/10 text-primary"
            }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleRestart}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white"
                : "bg-black/5 hover:bg-black/10 text-gray-500 hover:text-black"
            }`}
            aria-label="Reset Match"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-lg flex-grow flex flex-col justify-center gap-6 z-10">
        {/* Scores Card */}
        <div
          className={`p-6 rounded-[24px] border transition-all duration-300 ${
            isDarkMode
              ? "bg-[#0A1A1F]/70 border-white/5 shadow-2xl"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Team 1 Score */}
            <div
              onClick={() => !isGameOver && setSelectedTeam(1)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col items-center justify-center relative overflow-hidden ${
                selectedTeam === 1
                  ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(234,180,100,0.15)] scale-[1.02]"
                  : isDarkMode
                  ? "border-white/5 bg-white/5 hover:bg-white/10"
                  : "border-gray-100 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                selectedTeam === 1 ? "text-primary" : "text-text-secondary"
              }`}>
                Team 1
              </span>
              <span className="text-5xl md:text-6xl font-black tracking-tight text-white transition-transform duration-300">
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>{team1Score}</span>
              </span>
              {selectedTeam === 1 && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-ping"></div>
              )}
            </div>

            {/* Team 2 Score */}
            <div
              onClick={() => !isGameOver && setSelectedTeam(2)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col items-center justify-center relative overflow-hidden ${
                selectedTeam === 2
                  ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(234,180,100,0.15)] scale-[1.02]"
                  : isDarkMode
                  ? "border-white/5 bg-white/5 hover:bg-white/10"
                  : "border-gray-100 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                selectedTeam === 2 ? "text-primary" : "text-text-secondary"
              }`}>
                Team 2
              </span>
              <span className="text-5xl md:text-6xl font-black tracking-tight text-white transition-transform duration-300">
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>{team2Score}</span>
              </span>
              {selectedTeam === 2 && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-ping"></div>
              )}
            </div>
          </div>
        </div>

        {/* Input & Calculator Card */}
        <div
          className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col gap-4 ${
            isDarkMode
              ? "bg-[#0A1A1F]/70 border-white/5 shadow-2xl"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          {/* Enter Number display */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary mb-1">
              Enter Number
            </span>
            <div className="text-3xl font-black tracking-wider text-primary min-h-[40px] flex items-center justify-center">
              {currentInput || "0"}
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-3 gap-3">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <button
                key={num}
                disabled={isGameOver}
                onClick={() => handleNumClick(num)}
                className={`py-4 text-xl font-bold rounded-xl transition-all active:scale-95 ${
                  isDarkMode
                    ? "bg-white/5 hover:bg-white/10 text-white disabled:opacity-35"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-35"
                }`}
              >
                {num}
              </button>
            ))}
            {/* Clear Button */}
            <button
              disabled={isGameOver}
              onClick={handleClear}
              className={`py-4 text-xl font-black rounded-xl transition-all active:scale-95 ${
                isDarkMode
                  ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-35"
                  : "bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-35"
              }`}
            >
              C
            </button>
            {/* 0 Button */}
            <button
              disabled={isGameOver}
              onClick={() => handleNumClick(0)}
              className={`py-4 text-xl font-bold rounded-xl transition-all active:scale-95 ${
                isDarkMode
                  ? "bg-white/5 hover:bg-white/10 text-white disabled:opacity-35"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-35"
              }`}
            >
              0
            </button>
            {/* Backspace Button */}
            <button
              disabled={isGameOver}
              onClick={handleBackspace}
              className={`py-4 text-xl font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center ${
                isDarkMode
                  ? "bg-white/5 hover:bg-white/10 text-white disabled:opacity-35"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-35"
              }`}
              aria-label="Backspace"
            >
              ⌫
            </button>
          </div>

          {/* Plus / Minus Actions */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <button
              disabled={isGameOver || currentInput === ""}
              onClick={() => handleOperation("+")}
              className="py-4 bg-primary hover:bg-primary-hover text-bg-main font-black text-2xl rounded-xl transition-all active:scale-95 shadow-lg disabled:opacity-40"
            >
              +
            </button>
            <button
              disabled={isGameOver || currentInput === ""}
              onClick={() => handleOperation("-")}
              className={`py-4 font-black text-2xl rounded-xl transition-all active:scale-95 border disabled:opacity-40 ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
              }`}
            >
              -
            </button>
          </div>

          {/* Team Selectors */}
          <div className="flex items-center justify-between gap-3 mt-2 border-t border-white/5 pt-4">
            <span className="text-xs font-bold text-text-secondary">Select Team:</span>
            <div className="flex gap-2">
              <button
                disabled={isGameOver}
                onClick={() => setSelectedTeam(1)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedTeam === 1
                    ? "bg-primary text-bg-main shadow-md"
                    : isDarkMode
                    ? "bg-white/5 text-text-secondary hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Team 1
              </button>
              <button
                disabled={isGameOver}
                onClick={() => setSelectedTeam(2)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedTeam === 2
                    ? "bg-primary text-bg-main shadow-md"
                    : isDarkMode
                    ? "bg-white/5 text-text-secondary hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Team 2
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Preview */}
        {currentInput !== "" && (
          <div
            className={`p-4 rounded-xl border text-center transition-all duration-300 ${
              isDarkMode
                ? "bg-[#0A1A1F]/50 border-white/5"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <span className="text-xs font-bold text-text-secondary block mb-1">Calculation Preview</span>
            <div className="text-sm font-semibold tracking-wide text-primary">
              Team {selectedTeam}: {activeScore} + {inputVal} = {activeScore + inputVal} (or {activeScore} - {inputVal} = {Math.max(0, activeScore - inputVal)})
            </div>
          </div>
        )}

        {/* History System */}
        <div className="grid grid-cols-2 gap-4">
          {/* Team 1 History */}
          <div
            className={`p-4 rounded-[20px] border h-44 flex flex-col ${
              isDarkMode
                ? "bg-[#0A1A1F]/70 border-white/5"
                : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-white/5 pb-2 mb-2 block">
              Team 1 History
            </span>
            <div className="flex-grow overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
              {history1.length === 0 ? (
                <span className="text-xs text-text-secondary italic my-auto text-center">No history yet</span>
              ) : (
                history1.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-medium border-b border-white/5 pb-1">
                    <span className={item.op === "+" ? "text-green-500" : "text-red-500"}>
                      {item.op}{item.val}
                    </span>
                    <span className="text-text-secondary">
                      {item.prev} → {item.next}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Team 2 History */}
          <div
            className={`p-4 rounded-[20px] border h-44 flex flex-col ${
              isDarkMode
                ? "bg-[#0A1A1F]/70 border-white/5"
                : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-white/5 pb-2 mb-2 block">
              Team 2 History
            </span>
            <div className="flex-grow overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
              {history2.length === 0 ? (
                <span className="text-xs text-text-secondary italic my-auto text-center">No history yet</span>
              ) : (
                history2.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-medium border-b border-white/5 pb-1">
                    <span className={item.op === "+" ? "text-green-500" : "text-red-500"}>
                      {item.op}{item.val}
                    </span>
                    <span className="text-text-secondary">
                      {item.prev} → {item.next}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Winner Overlay Modal */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-sm p-8 rounded-[32px] border text-center relative overflow-hidden ${
                isDarkMode
                  ? "bg-[#0A1A1F] border-white/10"
                  : "bg-white border-gray-200 shadow-2xl"
              }`}
            >
              {/* Highlight Winner */}
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="inline-block p-5 bg-primary/20 rounded-full text-primary mb-6"
              >
                <Trophy size={56} />
              </motion.div>

              <h2 className="text-3xl font-black tracking-wide uppercase text-white mb-2">
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>{winner} Winner</span>
              </h2>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-6">
                Score of 100+ Reached!
              </p>

              <button
                onClick={handleRestart}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-bg-main font-black rounded-xl transition-all shadow-[0_0_20px_rgba(234,180,100,0.4)] flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                <span>Restart Match</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
