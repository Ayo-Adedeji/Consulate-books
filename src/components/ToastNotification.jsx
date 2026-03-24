import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function ToastNotification() {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(hideToast, 3000);
    return () => clearTimeout(timer);
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn bg-green-600 text-white px-5 py-3 rounded-xl shadow-soft flex items-center gap-2">
      <span className="text-lg">✓</span>
      <span className="font-inter text-sm">{toast.message}</span>
    </div>
  );
}
