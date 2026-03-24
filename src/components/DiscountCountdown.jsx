import { useState, useEffect } from "react";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const KEY = "discount_ends_at_v2"; // bumped version clears old 24h value

export default function DiscountCountdown() {
  const getTarget = () => {
    let stored = sessionStorage.getItem(KEY);
    if (!stored) {
      stored = String(Date.now() + WEEK_MS);
      sessionStorage.setItem(KEY, stored);
    }
    return Number(stored);
  };

  const [target] = useState(getTarget);
  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(target - Date.now()), 1000);
    return () => clearInterval(tick);
  }, [target]);

  if (timeLeft <= 0) return null;

  const totalSecs = Math.floor(timeLeft / 1000);
  const d = String(Math.floor(totalSecs / 86400)).padStart(2, "0");
  const h = String(Math.floor((totalSecs % 86400) / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, "0");
  const s = String(totalSecs % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="text-xs font-inter text-gray-500">⏳ Offer ends in:</span>
      <div className="flex items-center gap-1 font-mono text-sm font-bold">
        <span className="bg-primary text-white px-2 py-0.5 rounded-lg">{d}d</span>
        <span className="text-primary">:</span>
        <span className="bg-primary text-white px-2 py-0.5 rounded-lg">{h}</span>
        <span className="text-primary">:</span>
        <span className="bg-primary text-white px-2 py-0.5 rounded-lg">{m}</span>
        <span className="text-primary">:</span>
        <span className="bg-primary text-white px-2 py-0.5 rounded-lg">{s}</span>
      </div>
    </div>
  );
}
