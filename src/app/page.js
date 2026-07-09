"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sun, Moon, RotateCcw, History, Calculator } from "lucide-react";

// Safe math expression evaluator
const evaluateExpression = (expr, currentScore) => {
  if (!expr) return null;
  // Trim all whitespace
  let clean = expr.replace(/\s+/g, "");
  if (clean === "") return null;

  // If it starts with + or -, prepend the currentScore
  if (clean.startsWith("+") || clean.startsWith("-")) {
    clean = currentScore.toString() + clean;
  }

  // Validate math expression containing only numbers separated by single + or -
  const validPattern = /^[+\-]?\d+(?:[+\-]\d+)*$/;
  if (!validPattern.test(clean)) {
    return null;
  }

  try {
    // Match signed numbers: e.g. "28+16-5" -> ["28", "+16", "-5"]
    const tokens = clean.match(/([+\-]?\d+)/g);
    if (!tokens) return null;
    return tokens.reduce((acc, token) => acc + parseInt(token), 0);
  } catch (e) {
    return null;
  }
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);

  // Check if winner exists (Updated to 101 threshold)
  const winner = team1Score >= 101 ? "Team 1" : team2Score >= 101 ? "Team 2" : null;
  const isGameOver = !!winner;

  // Handle expression submission on Enter
  const handleKeyDown = (team, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isGameOver) return;

      const inputVal = team === 1 ? input1 : input2;
      const score = team === 1 ? team1Score : team2Score;
      
      const next = evaluateExpression(inputVal, score);
      if (next !== null) {
        const boundedNext = Math.min(101, Math.max(0, next));
        const diff = boundedNext - score;
        const op = diff >= 0 ? "+" : "-";
        const val = Math.abs(diff);

        if (team === 1) {
          setTeam1Score(boundedNext);
          setHistory1((prevHist) => [
            ...prevHist,
            { prev: score, op, val, next: boundedNext, expr: inputVal },
          ]);
          setInput1("");
        } else {
          setTeam2Score(boundedNext);
          setHistory2((prevHist) => [
            ...prevHist,
            { prev: score, op, val, next: boundedNext, expr: inputVal },
          ]);
          setInput2("");
        }
      }
    }
  };

  // Get real-time preview of the expression
  const getPreview = (inputVal, currentScore) => {
    const res = evaluateExpression(inputVal, currentScore);
    if (res === null) return null;
    return Math.min(101, Math.max(0, res));
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

  const preview1 = getPreview(input1, team1Score);
  const preview2 = getPreview(input2, team2Score);

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
                <span className="text-xs text-text-secondary block mt-1">/ 101</span>
              </div>
            </div>

            {/* Input & Operations */}
            <div className="mt-4 flex flex-col gap-3">
              <div className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                isDarkMode ? "bg-white/5 border-white/10 focus-within:border-primary/50" : "bg-gray-50 border-gray-200 focus-within:border-primary/50"
              }`}>
                <input
                  type="text"
                  placeholder="e.g. +16 or 28+16"
                  disabled={isGameOver}
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(1, e)}
                  className={`bg-transparent font-bold text-center w-full focus:outline-none text-lg ${
                    isDarkMode ? "text-white placeholder-white/20" : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Real-time preview */}
              <div className="min-h-[24px] text-center">
                {preview1 !== null && (
                  <span className="text-xs font-semibold text-primary animate-pulse">
                    Preview: {team1Score} → {preview1}
                  </span>
                )}
              </div>

              {/* Reset button */}
              <button
                onClick={() => handleResetTeam(1)}
                className="w-full py-2.5 text-xs font-semibold rounded-lg transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1"
              >
                <RotateCcw size={14} />
                <span>Reset Team 1</span>
              </button>
            </div>

            {/* History List */}
            <div className={`mt-6 border-t pt-4 ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
              <div className="flex items-center gap-2 mb-2 text-text-secondary">
                <History size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
              </div>
              <div className={`rounded-xl p-3 h-32 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin ${
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
                        {item.expr.includes("+") || item.expr.includes("-") ? item.expr : `${item.op}${item.val}`}
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
                <span className="text-xs text-text-secondary block mt-1">/ 101</span>
              </div>
            </div>

            {/* Input & Operations */}
            <div className="mt-4 flex flex-col gap-3">
              <div className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                isDarkMode ? "bg-white/5 border-white/10 focus-within:border-primary/50" : "bg-gray-50 border-gray-200 focus-within:border-primary/50"
              }`}>
                <input
                  type="text"
                  placeholder="e.g. +16 or 28+16"
                  disabled={isGameOver}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(2, e)}
                  className={`bg-transparent font-bold text-center w-full focus:outline-none text-lg ${
                    isDarkMode ? "text-white placeholder-white/20" : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Real-time preview */}
              <div className="min-h-[24px] text-center">
                {preview2 !== null && (
                  <span className="text-xs font-semibold text-primary animate-pulse">
                    Preview: {team2Score} → {preview2}
                  </span>
                )}
              </div>

              {/* Reset button */}
              <button
                onClick={() => handleResetTeam(2)}
                className="w-full py-2.5 text-xs font-semibold rounded-lg transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1"
              >
                <RotateCcw size={14} />
                <span>Reset Team 2</span>
              </button>
            </div>

            {/* History List */}
            <div className={`mt-6 border-t pt-4 ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
              <div className="flex items-center gap-2 mb-2 text-text-secondary">
                <History size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
              </div>
              <div className={`rounded-xl p-3 h-32 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin ${
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
                        {item.expr.includes("+") || item.expr.includes("-") ? item.expr : `${item.op}${item.val}`}
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
                Score of 101+ Reached!
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
