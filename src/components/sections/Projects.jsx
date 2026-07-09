"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw, Trophy, Award, Users, Trash2, Delete, CornerDownLeft } from "lucide-react";

export default function Projects() {
  const [team1History, setTeam1History] = useState([]);
  const [team2History, setTeam2History] = useState([]);
  const [team1Input, setTeam1Input] = useState("");
  const [team2Input, setTeam2Input] = useState("");

  const team1Score = team1History.reduce((sum, val) => sum + val, 0);
  const team2Score = team2History.reduce((sum, val) => sum + val, 0);

  const winner = team1Score >= 100 ? "Team 1" : team2Score >= 100 ? "Team 2" : null;
  const isGameOver = !!winner;

  const handleKeypadPress = (team, val) => {
    if (isGameOver) return;
    
    if (team === 1) {
      if (val === "clear") {
        setTeam1Input("");
      } else if (val === "backspace") {
        setTeam1Input((prev) => prev.slice(0, -1));
      } else {
        // Prevent extremely large numbers
        if (team1Input.length >= 3) return;
        setTeam1Input((prev) => {
          const next = prev + val;
          // Don't allow multiple leading zeros
          if (next === "0") return "";
          return next;
        });
      }
    } else {
      if (val === "clear") {
        setTeam2Input("");
      } else if (val === "backspace") {
        setTeam2Input((prev) => prev.slice(0, -1));
      } else {
        if (team2Input.length >= 3) return;
        setTeam2Input((prev) => {
          const next = prev + val;
          if (next === "0") return "";
          return next;
        });
      }
    }
  };

  const handleAddPoints = (team) => {
    if (isGameOver) return;

    if (team === 1) {
      const points = parseInt(team1Input);
      if (points > 0) {
        // Limit total added score to prevent overflowing 100 by too much
        const currentTotal = team1Score;
        const finalPoints = Math.min(points, 100 - currentTotal);
        setTeam1History((prev) => [...prev, finalPoints]);
        setTeam1Input("");
      }
    } else {
      const points = parseInt(team2Input);
      if (points > 0) {
        const currentTotal = team2Score;
        const finalPoints = Math.min(points, 100 - currentTotal);
        setTeam2History((prev) => [...prev, finalPoints]);
        setTeam2Input("");
      }
    }
  };

  const handleDeleteHistoryItem = (team, index) => {
    if (isGameOver) return; // Keep scores locked if game is already won, or allow modifying history to unlock?
    // Let's allow modifying history to unlock the game if they made a mistake, that's even better!
    // But if we want to allow undoing to unlock the game, we calculate winner dynamically so it naturally unlocks.
    if (team === 1) {
      setTeam1History((prev) => prev.filter((_, i) => i !== index));
    } else {
      setTeam2History((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleReset = () => {
    setTeam1History([]);
    setTeam2History([]);
    setTeam1Input("");
    setTeam2Input("");
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="text-primary">Calculator Score Counter</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Input points using the keypad. View history logs and delete individual entries to correct mistakes. First to 100 wins!
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
                Congratulations! The game has ended.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-primary text-bg-main font-bold rounded-full hover:bg-primary-hover transition-all flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(234,180,100,0.3)]"
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Team 1 Card */}
          <motion.div
            className={`glass-card p-8 flex flex-col relative overflow-hidden transition-all duration-300 ${
              winner === "Team 1" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.2)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 1" ? "opacity-50" : ""}`}
          >
            {winner === "Team 1" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white/5 rounded-full text-text-secondary">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Team 1</h3>
            </div>

            {/* Score Display */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total Score</span>
                <motion.span
                  key={team1Score}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-extrabold text-primary block mt-1"
                >
                  {team1Score} <span className="text-sm font-normal text-text-secondary">/ 100</span>
                </motion.span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider block">Input Screen</span>
                <span className="text-3xl font-mono font-bold text-white block mt-1 min-h-[40px] tracking-widest bg-black/20 px-3 py-1 rounded-lg border border-white/5">
                  {team1Input || "0"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Keypad */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1">Calculator Keypad</span>
                <div className="grid grid-cols-3 gap-2">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      disabled={isGameOver}
                      onClick={() => handleKeypadPress(1, num.toString())}
                      className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all text-lg disabled:opacity-30 disabled:scale-100"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(1, "clear")}
                    className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl border border-red-500/20 active:scale-95 transition-all text-xs uppercase disabled:opacity-30 disabled:scale-100"
                  >
                    Clear
                  </button>
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(1, "0")}
                    className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all text-lg disabled:opacity-30 disabled:scale-100"
                  >
                    0
                  </button>
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(1, "backspace")}
                    className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all flex items-center justify-center disabled:opacity-30 disabled:scale-100"
                  >
                    <Delete size={20} />
                  </button>
                </div>
                <button
                  disabled={isGameOver || !team1Input}
                  onClick={() => handleAddPoints(1)}
                  className="w-full mt-2 py-3 bg-primary hover:bg-primary-hover text-bg-main disabled:opacity-30 disabled:hover:bg-primary transition-all duration-300 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <CornerDownLeft size={18} />
                  <span>Add Points</span>
                </button>
              </div>

              {/* History / Logs */}
              <div className="flex flex-col h-full min-h-[220px]">
                <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-2">Score History</span>
                <div className="bg-black/20 rounded-xl border border-white/5 p-4 flex-grow overflow-y-auto max-h-[210px] custom-scrollbar flex flex-col gap-2">
                  {team1History.length === 0 ? (
                    <div className="text-center text-text-secondary text-sm my-auto italic">
                      No points added yet
                    </div>
                  ) : (
                    <AnimatePresence>
                      {team1History.map((points, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/5 group"
                        >
                          <span className="font-semibold text-sm text-text-secondary">
                            Entry #{idx + 1}: <span className="text-primary text-base font-bold">+{points}</span>
                          </span>
                          <button
                            onClick={() => handleDeleteHistoryItem(1, idx)}
                            className="p-1 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete this score entry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team 2 Card */}
          <motion.div
            className={`glass-card p-8 flex flex-col relative overflow-hidden transition-all duration-300 ${
              winner === "Team 2" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.2)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 2" ? "opacity-50" : ""}`}
          >
            {winner === "Team 2" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white/5 rounded-full text-text-secondary">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Team 2</h3>
            </div>

            {/* Score Display */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total Score</span>
                <motion.span
                  key={team2Score}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-extrabold text-primary block mt-1"
                >
                  {team2Score} <span className="text-sm font-normal text-text-secondary">/ 100</span>
                </motion.span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider block">Input Screen</span>
                <span className="text-3xl font-mono font-bold text-white block mt-1 min-h-[40px] tracking-widest bg-black/20 px-3 py-1 rounded-lg border border-white/5">
                  {team2Input || "0"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Keypad */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1">Calculator Keypad</span>
                <div className="grid grid-cols-3 gap-2">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      disabled={isGameOver}
                      onClick={() => handleKeypadPress(2, num.toString())}
                      className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all text-lg disabled:opacity-30 disabled:scale-100"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(2, "clear")}
                    className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl border border-red-500/20 active:scale-95 transition-all text-xs uppercase disabled:opacity-30 disabled:scale-100"
                  >
                    Clear
                  </button>
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(2, "0")}
                    className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all text-lg disabled:opacity-30 disabled:scale-100"
                  >
                    0
                  </button>
                  <button
                    disabled={isGameOver}
                    onClick={() => handleKeypadPress(2, "backspace")}
                    className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 active:scale-95 transition-all flex items-center justify-center disabled:opacity-30 disabled:scale-100"
                  >
                    <Delete size={20} />
                  </button>
                </div>
                <button
                  disabled={isGameOver || !team2Input}
                  onClick={() => handleAddPoints(2)}
                  className="w-full mt-2 py-3 bg-primary hover:bg-primary-hover text-bg-main disabled:opacity-30 disabled:hover:bg-primary transition-all duration-300 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <CornerDownLeft size={18} />
                  <span>Add Points</span>
                </button>
              </div>

              {/* History / Logs */}
              <div className="flex flex-col h-full min-h-[220px]">
                <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-2">Score History</span>
                <div className="bg-black/20 rounded-xl border border-white/5 p-4 flex-grow overflow-y-auto max-h-[210px] custom-scrollbar flex flex-col gap-2">
                  {team2History.length === 0 ? (
                    <div className="text-center text-text-secondary text-sm my-auto italic">
                      No points added yet
                    </div>
                  ) : (
                    <AnimatePresence>
                      {team2History.map((points, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/5 group"
                        >
                          <span className="font-semibold text-sm text-text-secondary">
                            Entry #{idx + 1}: <span className="text-primary text-base font-bold">+{points}</span>
                          </span>
                          <button
                            onClick={() => handleDeleteHistoryItem(2, idx)}
                            className="p-1 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete this score entry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Controls */}
        <div className="flex justify-center">
          <button
            onClick={handleReset}
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
