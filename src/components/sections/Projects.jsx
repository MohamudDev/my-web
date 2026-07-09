"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Undo, RotateCcw, Trophy, Award, History } from "lucide-react";

export default function Projects() {
  const [team1History, setTeam1History] = useState([]);
  const [team2History, setTeam2History] = useState([]);
  
  const [input1, setInput1] = useState("1");
  const [input2, setInput2] = useState("1");

  // Calculate score sequentially
  const calculateScore = (history) => {
    let score = 0;
    for (const val of history) {
      score = Math.max(0, score + val);
    }
    return Math.min(100, score);
  };

  const team1Score = calculateScore(team1History);
  const team2Score = calculateScore(team2History);

  const winner = team1Score >= 100 ? "Team 1" : team2Score >= 100 ? "Team 2" : null;
  const isGameOver = !!winner;

  const handleAction = (team, type) => {
    if (isGameOver) return;

    const valueStr = team === 1 ? input1 : input2;
    const value = Math.max(1, parseInt(valueStr) || 1);

    if (type === "plus") {
      if (team === 1) {
        setTeam1History((prev) => [...prev, value]);
      } else {
        setTeam2History((prev) => [...prev, value]);
      }
    } else if (type === "minus") {
      if (team === 1) {
        setTeam1History((prev) => [...prev, -value]);
      } else {
        setTeam2History((prev) => [...prev, -value]);
      }
    }
  };

  const handleBackspace = (team) => {
    if (team === 1) {
      setTeam1History((prev) => prev.slice(0, -1));
    } else {
      setTeam2History((prev) => prev.slice(0, -1));
    }
  };

  const handleResetTeam = (team) => {
    if (team === 1) {
      setTeam1History([]);
      setInput1("1");
    } else {
      setTeam2History([]);
      setInput2("1");
    }
  };

  const handleResetAll = () => {
    setTeam1History([]);
    setTeam2History([]);
    setInput1("1");
    setInput2("1");
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="text-primary">Score Calculator</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Add or subtract custom values. Keep track of the score history. First team to reach 100 wins!
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Winner Banner */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="glass-card border-primary/30 p-8 mb-10 text-center relative overflow-hidden bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block p-4 bg-primary/20 rounded-full text-primary mb-4"
              >
                <Trophy size={48} />
              </motion.div>
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide uppercase">
                {winner} Wins!
              </h3>
              <p className="text-primary font-medium mb-4">
                Congratulations! The winning score of 100 has been reached.
              </p>
              <button
                onClick={handleResetAll}
                className="px-6 py-2.5 bg-primary text-bg-main font-bold rounded-full hover:bg-primary-hover transition-all flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(234,180,100,0.3)]"
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Team 1 Card */}
          <motion.div
            className={`glass-card p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 ${
              winner === "Team 1" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.25)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 1" ? "opacity-50" : ""}`}
          >
            {winner === "Team 1" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Team 1</h3>
              
              {/* Score Display */}
              <div className="my-6 relative">
                <motion.span
                  key={team1Score}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-7xl font-extrabold text-primary block text-center tracking-tight"
                >
                  {team1Score}
                </motion.span>
                <span className="text-xs text-text-secondary text-center block mt-1">/ 100</span>
              </div>
            </div>

            {/* Calculator Controls */}
            <div className="w-full mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-xs text-text-secondary pl-2 font-medium">Enter Points:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  disabled={isGameOver}
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  className="bg-transparent text-white font-bold text-right w-full pr-2 focus:outline-none border-b border-primary/30 focus:border-primary"
                />
              </div>

              {/* Plus & Minus buttons */}
              <div className="flex gap-4">
                <button
                  disabled={isGameOver}
                  onClick={() => handleAction(1, "plus")}
                  className="flex-1 py-3 bg-primary text-bg-main hover:bg-primary-hover disabled:opacity-30 disabled:hover:bg-primary transition-all duration-300 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus size={20} />
                  <span>Plus</span>
                </button>
                <button
                  disabled={isGameOver || team1Score === 0}
                  onClick={() => handleAction(1, "minus")}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-300 rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2"
                >
                  <Minus size={20} />
                  <span>Minus</span>
                </button>
              </div>

              {/* Backspace & Reset buttons */}
              <div className="flex gap-4">
                <button
                  disabled={team1History.length === 0}
                  onClick={() => handleBackspace(1)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-300 rounded-xl font-semibold border border-white/5 flex items-center justify-center gap-1.5 text-sm"
                  title="Remove last action"
                >
                  <Undo size={16} />
                  <span>Backspace</span>
                </button>
                <button
                  disabled={team1History.length === 0 && input1 === "1"}
                  onClick={() => handleResetTeam(1)}
                  className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 disabled:hover:bg-red-500/10 transition-all duration-300 rounded-xl font-semibold border border-red-500/20 flex items-center justify-center gap-1.5 text-sm"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* History section */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 mb-3 text-text-secondary">
                <History size={16} />
                <h4 className="text-xs font-semibold uppercase tracking-wider">Score History</h4>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 h-32 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                {team1History.length === 0 ? (
                  <span className="text-xs text-text-secondary italic text-center my-auto">No history yet</span>
                ) : (
                  team1History.map((val, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-1">
                      <span className="text-xs text-text-secondary">Action #{idx + 1}</span>
                      <span className={val > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                        {val > 0 ? `+${val}` : `${val}`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Team 2 Card */}
          <motion.div
            className={`glass-card p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 ${
              winner === "Team 2" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.25)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 2" ? "opacity-50" : ""}`}
          >
            {winner === "Team 2" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Team 2</h3>
              
              {/* Score Display */}
              <div className="my-6 relative">
                <motion.span
                  key={team2Score}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-7xl font-extrabold text-primary block text-center tracking-tight"
                >
                  {team2Score}
                </motion.span>
                <span className="text-xs text-text-secondary text-center block mt-1">/ 100</span>
              </div>
            </div>

            {/* Calculator Controls */}
            <div className="w-full mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-xs text-text-secondary pl-2 font-medium">Enter Points:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  disabled={isGameOver}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className="bg-transparent text-white font-bold text-right w-full pr-2 focus:outline-none border-b border-primary/30 focus:border-primary"
                />
              </div>

              {/* Plus & Minus buttons */}
              <div className="flex gap-4">
                <button
                  disabled={isGameOver}
                  onClick={() => handleAction(2, "plus")}
                  className="flex-1 py-3 bg-primary text-bg-main hover:bg-primary-hover disabled:opacity-30 disabled:hover:bg-primary transition-all duration-300 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus size={20} />
                  <span>Plus</span>
                </button>
                <button
                  disabled={isGameOver || team2Score === 0}
                  onClick={() => handleAction(2, "minus")}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-300 rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2"
                >
                  <Minus size={20} />
                  <span>Minus</span>
                </button>
              </div>

              {/* Backspace & Reset buttons */}
              <div className="flex gap-4">
                <button
                  disabled={team2History.length === 0}
                  onClick={() => handleBackspace(2)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-300 rounded-xl font-semibold border border-white/5 flex items-center justify-center gap-1.5 text-sm"
                  title="Remove last action"
                >
                  <Undo size={16} />
                  <span>Backspace</span>
                </button>
                <button
                  disabled={team2History.length === 0 && input2 === "1"}
                  onClick={() => handleResetTeam(2)}
                  className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 disabled:hover:bg-red-500/10 transition-all duration-300 rounded-xl font-semibold border border-red-500/20 flex items-center justify-center gap-1.5 text-sm"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* History section */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 mb-3 text-text-secondary">
                <History size={16} />
                <h4 className="text-xs font-semibold uppercase tracking-wider">Score History</h4>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 h-32 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                {team2History.length === 0 ? (
                  <span className="text-xs text-text-secondary italic text-center my-auto">No history yet</span>
                ) : (
                  team2History.map((val, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-1">
                      <span className="text-xs text-text-secondary">Action #{idx + 1}</span>
                      <span className={val > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                        {val > 0 ? `+${val}` : `${val}`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Controls */}
        <div className="flex justify-center">
          <button
            onClick={handleResetAll}
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 hover:text-white text-text-secondary font-bold rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 shadow-sm"
          >
            <RotateCcw size={18} />
            <span>Reset Match</span>
          </button>
        </div>
      </div>
    </section>
  );
}
