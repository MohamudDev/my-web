"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, History } from "lucide-react";

// Safe math expression evaluator
const evaluateExpression = (expr, currentScore) => {
  if (!expr) return null;
  let clean = expr.replace(/\s+/g, "");
  if (clean === "") return null;

  if (clean.startsWith("+") || clean.startsWith("-")) {
    clean = currentScore.toString() + clean;
  }

  const validPattern = /^[+\-]?\d+(?:[+\-]\d+)*$/;
  if (!validPattern.test(clean)) return null;

  try {
    const tokens = clean.match(/([+\-]?\d+)/g);
    if (!tokens) return null;
    return tokens.reduce((acc, token) => acc + parseInt(token), 0);
  } catch (e) {
    return null;
  }
};

function TeamCard({ teamName, score, input, setInput, preview, history, isGameOver, isWinner, isLoser, onKeyDown }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col justify-between glass-card ${
        isWinner ? "border-primary shadow-[0_0_30px_rgba(234,180,100,0.25)] bg-primary/5" : ""
      } ${isLoser ? "opacity-40" : ""}`}
    >
      <div className="text-center">
        <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-text-main">{teamName}</h3>
        <div className="my-4">
          <span className="text-7xl font-black tracking-tight text-primary block">{score}</span>
          <span className="text-xs text-text-secondary block mt-1">/ 101</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center p-3 rounded-xl border bg-white/5 border-white/10 focus-within:border-primary/50 transition-all">
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. +16 or 28+16"
            disabled={isGameOver}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="bg-transparent font-bold text-center w-full focus:outline-none text-lg text-white placeholder-white/20"
          />
        </div>
        <div className="min-h-[24px] text-center">
          {preview !== null && (
            <span className="text-xs font-semibold text-primary animate-pulse">
              Preview: {score} → {preview}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 mb-2 text-text-secondary">
          <History size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">History</span>
        </div>
        <div className="rounded-xl p-3 h-32 overflow-y-auto flex flex-col gap-1.5 bg-white/5">
          {history.length === 0 ? (
            <span className="text-[11px] text-text-secondary italic my-auto text-center">No changes yet</span>
          ) : (
            history.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-medium pb-1 border-b border-white/5">
                <span className={item.op === "+" ? "text-green-500" : "text-red-500"}>{item.expr}</span>
                <span className="text-text-secondary">{item.prev} → {item.next}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScoreBoard() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);

  const winner = team1Score >= 101 ? "Team 1" : team2Score >= 101 ? "Team 2" : null;
  const isGameOver = !!winner;

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
          setHistory1((prev) => [...prev, { prev: score, op, val, next: boundedNext, expr: inputVal }]);
          setInput1("");
        } else {
          setTeam2Score(boundedNext);
          setHistory2((prev) => [...prev, { prev: score, op, val, next: boundedNext, expr: inputVal }]);
          setInput2("");
        }
      }
    }
  };

  const getPreview = (inputVal, currentScore) => {
    const res = evaluateExpression(inputVal, currentScore);
    if (res === null) return null;
    return Math.min(101, Math.max(0, res));
  };

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
    <section id="scoreboard" className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Live Game
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Score Board</h3>
          <p className="text-text-secondary max-w-md mx-auto">
            Enter any number or expression (e.g. <span className="text-primary font-semibold">28+16</span>) and press{" "}
            <span className="text-primary font-semibold">Enter</span> to update the score. First to 101 wins!
          </p>
        </motion.div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TeamCard
            teamName="Team 1"
            score={team1Score}
            input={input1}
            setInput={setInput1}
            preview={preview1}
            history={history1}
            isGameOver={isGameOver}
            isWinner={winner === "Team 1"}
            isLoser={isGameOver && winner !== "Team 1"}
            onKeyDown={(e) => handleKeyDown(1, e)}
          />
          <TeamCard
            teamName="Team 2"
            score={team2Score}
            input={input2}
            setInput={setInput2}
            preview={preview2}
            history={history2}
            isGameOver={isGameOver}
            isWinner={winner === "Team 2"}
            isLoser={isGameOver && winner !== "Team 2"}
            onKeyDown={(e) => handleKeyDown(2, e)}
          />
        </div>

        {/* Reset Match */}
        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="px-8 py-3.5 font-bold rounded-xl transition-all flex items-center gap-2 glass border border-white/10 text-text-secondary hover:text-white hover:border-white/20"
          >
            <RotateCcw size={18} />
            <span>Reset Match</span>
          </button>
        </div>
      </div>

      {/* Winner Modal */}
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
              className="w-full max-w-sm p-8 rounded-[32px] border text-center relative overflow-hidden glass-card"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="inline-block p-5 bg-primary/20 rounded-full text-primary mb-6"
              >
                <Trophy size={56} />
              </motion.div>
              <h2 className="text-3xl font-black tracking-wide uppercase mb-2 text-white">
                🏆 {winner} Winner
              </h2>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-6">
                Score of 101 Reached!
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
    </section>
  );
}
