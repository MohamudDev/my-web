"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sun, Moon, RotateCcw, Plus, Minus, Undo, History } from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);

  // Check if winner exists
  const winner = team1Score >= 100 ? "Team 1" : team2Score >= 100 ? "Team 2" : null;
  const isGameOver = !!winner;

  // Handle operations (+ / -)
  const handleOperation = (team, op) => {
    if (isGameOver) return;
    
    const inputVal = team === 1 ? input1 : input2;
    const value = parseInt(inputVal) || 0;
    if (value <= 0) return;

    if (team === 1) {
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
      setInput1(""); // clear input after action
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
      setInput2(""); // clear input after action
    }
  };

  // Handle Backspace / Undo last action
  const handleUndo = (team) => {
    if (team === 1) {
      if (history1.length === 0) return;
      const last = history1[history1.length - 1];
      setTeam1Score(last.prev);
      setHistory1((prev) => prev.slice(0, -1));
    } else {
      if (history2.length === 0) return;
      const last = history2[history2.length - 1];
      setTeam2Score(last.prev);
      setHistory2((prev) => prev.slice(0, -1));
    }
  };

  // Reset a specific team
  const handleResetTeam = (team) => {
    if (team === 1) {
      setTeam1Score(0);
      setHistory1([]);
      setInput1("");
    } else {
      setTeam2Score(0);
      setHistory2([]);
      setInput2("");
    }
  };

  // Reset all
  const handleRestart = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setInput1("");
    setInput2("");
    setHistory1([]);
    setHistory2([]);
  };

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
      <header className="w-full max-w-2xl flex items-center justify-between z-10 mb-6">
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
      <main className="w-full max-w-2xl flex-grow flex flex-col justify-center gap-6 z-10">
        {/* Scoreboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team 1 Card */}
          <motion.div
            className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col justify-between ${
              winner === "Team 1" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.25)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 1" ? "opacity-50" : ""} ${
              isDarkMode ? "bg-[#0A1A1F]/70 border-white/5 shadow-xl" : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <div className="text-center relative">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Team 1</h2>
              <div className="my-4">
                <span className="text-6xl md:text-7xl font-black tracking-tight text-primary block">
                  {team1Score}
                </span>
                <span className="text-xs text-text-secondary block mt-1">/ 100</span>
              </div>
            </div>

            {/* Input & Operations */}
            <div className="mt-4 flex flex-col gap-3">
              <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter score"
                  disabled={isGameOver}
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  className={`bg-transparent font-bold text-center w-full focus:outline-none text-lg ${
                    isDarkMode ? "text-white placeholder-white/30" : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Plus & Minus buttons */}
              <div className="flex gap-2">
                <button
                  disabled={isGameOver || input1 === ""}
                  onClick={() => handleOperation(1, "+")}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-bg-main font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm disabled:opacity-40"
                >
                  <Plus size={18} />
                  <span>Add</span>
                </button>
                <button
                  disabled={isGameOver || input1 === "" || team1Score === 0}
                  onClick={() => handleOperation(1, "-")}
                  className={`flex-1 py-3 font-bold rounded-xl transition-all active:scale-95 border flex items-center justify-center gap-1 disabled:opacity-40 ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <Minus size={18} />
                  <span>Sub</span>
                </button>
              </div>

              {/* Undo & Reset buttons */}
              <div className="flex gap-2">
                <button
                  disabled={history1.length === 0}
                  onClick={() => handleUndo(1)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all border flex items-center justify-center gap-1 disabled:opacity-35 ${
                    isDarkMode
                      ? "bg-white/5 border-white/5 text-text-secondary hover:text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Undo last action"
                >
                  <Undo size={14} />
                  <span>Undo</span>
                </button>
                <button
                  disabled={history1.length === 0 && input1 === ""}
                  onClick={() => handleResetTeam(1)}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1 disabled:opacity-35"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* History List */}
            <div className={`mt-6 border-t pt-4 ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
              <div className="flex items-center gap-2 mb-2 text-text-secondary">
                <History size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
              </div>
              <div className={`rounded-xl p-3 h-28 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin ${
                isDarkMode ? "bg-white/5" : "bg-gray-50 border border-gray-100"
              }`}>
                {history1.length === 0 ? (
                  <span className="text-[11px] text-text-secondary italic my-auto text-center">No changes yet</span>
                ) : (
                  history1.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center text-xs font-medium pb-1 border-b ${
                      isDarkMode ? "border-white/5" : "border-gray-200"
                    }`}>
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
          </motion.div>

          {/* Team 2 Card */}
          <motion.div
            className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col justify-between ${
              winner === "Team 2" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.25)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 2" ? "opacity-50" : ""} ${
              isDarkMode ? "bg-[#0A1A1F]/70 border-white/5 shadow-xl" : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <div className="text-center relative">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Team 2</h2>
              <div className="my-4">
                <span className="text-6xl md:text-7xl font-black tracking-tight text-primary block">
                  {team2Score}
                </span>
                <span className="text-xs text-text-secondary block mt-1">/ 100</span>
              </div>
            </div>

            {/* Input & Operations */}
            <div className="mt-4 flex flex-col gap-3">
              <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter score"
                  disabled={isGameOver}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className={`bg-transparent font-bold text-center w-full focus:outline-none text-lg ${
                    isDarkMode ? "text-white placeholder-white/30" : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Plus & Minus buttons */}
              <div className="flex gap-2">
                <button
                  disabled={isGameOver || input2 === ""}
                  onClick={() => handleOperation(2, "+")}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-bg-main font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm disabled:opacity-40"
                >
                  <Plus size={18} />
                  <span>Add</span>
                </button>
                <button
                  disabled={isGameOver || input2 === "" || team2Score === 0}
                  onClick={() => handleOperation(2, "-")}
                  className={`flex-1 py-3 font-bold rounded-xl transition-all active:scale-95 border flex items-center justify-center gap-1 disabled:opacity-40 ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <Minus size={18} />
                  <span>Sub</span>
                </button>
              </div>

              {/* Undo & Reset buttons */}
              <div className="flex gap-2">
                <button
                  disabled={history2.length === 0}
                  onClick={() => handleUndo(2)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all border flex items-center justify-center gap-1 disabled:opacity-35 ${
                    isDarkMode
                      ? "bg-white/5 border-white/5 text-text-secondary hover:text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Undo last action"
                >
                  <Undo size={14} />
                  <span>Undo</span>
                </button>
                <button
                  disabled={history2.length === 0 && input2 === ""}
                  onClick={() => handleResetTeam(2)}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1 disabled:opacity-35"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* History List */}
            <div className={`mt-6 border-t pt-4 ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
              <div className="flex items-center gap-2 mb-2 text-text-secondary">
                <History size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
              </div>
              <div className={`rounded-xl p-3 h-28 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin ${
                isDarkMode ? "bg-white/5" : "bg-gray-50 border border-gray-100"
              }`}>
                {history2.length === 0 ? (
                  <span className="text-[11px] text-text-secondary italic my-auto text-center">No changes yet</span>
                ) : (
                  history2.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center text-xs font-medium pb-1 border-b ${
                      isDarkMode ? "border-white/5" : "border-gray-200"
                    }`}>
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
          </motion.div>
        </div>

        {/* Global Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleRestart}
            className={`px-8 py-3.5 font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm border ${
              isDarkMode
                ? "bg-white/5 hover:bg-white/10 hover:text-white text-text-secondary border-white/10 hover:border-white/20"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <RotateCcw size={18} />
            <span>Reset Match</span>
          </button>
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
                isDarkMode ? "bg-[#0A1A1F] border-white/10" : "bg-white border-gray-200 shadow-2xl"
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="inline-block p-5 bg-primary/20 rounded-full text-primary mb-6"
              >
                <Trophy size={56} />
              </motion.div>

              <h2 className={`text-3xl font-black tracking-wide uppercase mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                🏆 {winner} Winner
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
