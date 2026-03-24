import { useState } from "react";

const SESSION_KEY = "announcementDismissed";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );

  if (dismissed) return null;

  function handleDismiss() {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDismissed(true);
  }

  return (
    <div
      className="bg-azure text-white text-sm font-inter text-center py-2 px-4 sticky top-0 z-50 flex items-center justify-center gap-4 transition-all duration-300"
    >
      <span>You can now add multiple books to your cart and pay once.</span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="ml-auto text-white hover:text-white/70 transition-colors text-lg leading-none font-bold"
      >
        &times;
      </button>
    </div>
  );
}
