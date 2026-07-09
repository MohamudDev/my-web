"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw, Trophy, Award, Users } from "lucide-react";

export default function Projects() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [increment1, setIncrement1] = useState(1);
  const [increment2, setIncrement2] = useState(1);
  
  const winner = team1Score >= 100 ? "Team 1" : team2Score >= 100 ? "Team 2" : null;
  const isGameOver = !!winner;

  const handleScoreChange = (team, amount) => {
    if (isGameOver) return;
    
    const parsedAmount = parseInt(amount) || 1;
    if (team === 1) {
      setTeam1Score((prev) => Math.min(prev + parsedAmount, 100));
    } else {
      setTeam2Score((prev) => Math.min(prev + parsedAmount, 100));
    }
  };

  const handleReset = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setIncrement1(1);
    setIncrement2(1);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="text-primary">Score Counter</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Track and manage real-time scores for two teams. The first team to reach 100 points wins!
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Team 1 Card */}
          <motion.div
            whileHover={!isGameOver ? { y: -5 } : {}}
            className={`glass-card p-8 flex flex-col items-center relative overflow-hidden transition-all duration-300 ${
              winner === "Team 1" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.2)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 1" ? "opacity-50" : ""}`}
          >
            {winner === "Team 1" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            <div className="p-3 bg-white/5 rounded-full mb-4 text-text-secondary">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Team 1</h3>
            
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

            {/* Score Controls */}
            <div className="w-full mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                <span className="text-xs text-text-secondary pl-2 font-medium">Add points:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  disabled={isGameOver}
                  value={increment1}
                  onChange={(e) => setIncrement1(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-transparent text-white font-bold text-center w-16 ml-auto focus:outline-none border-b border-primary/30 focus:border-primary px-1"
                />
              </div>

              <button
                disabled={isGameOver}
                onClick={() => handleScoreChange(1, increment1)}
                className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-bg-main disabled:opacity-30 disabled:hover:bg-primary/10 disabled:hover:text-primary transition-all duration-300 rounded-xl font-bold border border-primary/20 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span>Add {increment1} Points</span>
              </button>

              {/* Quick Add buttons */}
              <div className="flex gap-2">
                {[1, 5, 10].map((num) => (
                  <button
                    key={num}
                    disabled={isGameOver}
                    onClick={() => handleScoreChange(1, num)}
                    className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs font-semibold rounded-lg text-text-secondary hover:text-white border border-white/5 transition-colors"
                  >
                    +{num}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team 2 Card */}
          <motion.div
            whileHover={!isGameOver ? { y: -5 } : {}}
            className={`glass-card p-8 flex flex-col items-center relative overflow-hidden transition-all duration-300 ${
              winner === "Team 2" ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.2)] bg-primary/5" : ""
            } ${isGameOver && winner !== "Team 2" ? "opacity-50" : ""}`}
          >
            {winner === "Team 2" && (
              <span className="absolute top-4 right-4 text-primary flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
                <Award size={14} /> Winner
              </span>
            )}
            <div className="p-3 bg-white/5 rounded-full mb-4 text-text-secondary">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Team 2</h3>
            
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

            {/* Score Controls */}
            <div className="w-full mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                <span className="text-xs text-text-secondary pl-2 font-medium">Add points:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  disabled={isGameOver}
                  value={increment2}
                  onChange={(e) => setIncrement2(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-transparent text-white font-bold text-center w-16 ml-auto focus:outline-none border-b border-primary/30 focus:border-primary px-1"
                />
              </div>

              <button
                disabled={isGameOver}
                onClick={() => handleScoreChange(2, increment2)}
                className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-bg-main disabled:opacity-30 disabled:hover:bg-primary/10 disabled:hover:text-primary transition-all duration-300 rounded-xl font-bold border border-primary/20 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span>Add {increment2} Points</span>
              </button>

              {/* Quick Add buttons */}
              <div className="flex gap-2">
                {[1, 5, 10].map((num) => (
                  <button
                    key={num}
                    disabled={isGameOver}
                    onClick={() => handleScoreChange(2, num)}
                    className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs font-semibold rounded-lg text-text-secondary hover:text-white border border-white/5 transition-colors"
                  >
                    +{num}
                  </button>
                ))}
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
