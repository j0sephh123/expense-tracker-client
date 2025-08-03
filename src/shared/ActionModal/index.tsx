import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ActionModalProps {
  open: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode; // for custom content
  loading?: boolean;
  variant?: "confirm" | "custom"; // confirm shows title/description, custom renders children
  className?: string; // extra wrapper styling
}

const FocusGuard: FC<{
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}> = ({ children, isOpen, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = ref.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    focusable?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const focusableEls = ref.current?.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusableEls || focusableEls.length === 0) return;
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);
  return (
    <div
      ref={(el) => {
        ref.current = el;
      }}
    >
      {children}
    </div>
  );
};

export const ActionModal: FC<ActionModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  loading = false,
  variant = "confirm",
  className = "",
}) => {
  // Disable background scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
      />
      <div
        className={`relative w-full max-w-lg mx-auto transform transition-all duration-200 scale-100 ${className}`}
      >
        <FocusGuard isOpen={open} onClose={onCancel}>
          <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="p-6">
              {variant === "confirm" ? (
                <div className="space-y-4">
                  {title && <h2 className="text-xl font-semibold">{title}</h2>}
                  {description && (
                    <p className="text-sm leading-relaxed">{description}</p>
                  )}
                </div>
              ) : (
                <div>{children}</div>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row-reverse gap-3 border-t border-gray-800 px-6 py-4">
              <button
                onClick={onCancel}
                type="button"
                className="flex-1 sm:flex-none rounded-lg px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                {cancelText}
              </button>
              {(variant === "confirm" ||
                (variant === "custom" && onConfirm)) && (
                <button
                  onClick={onConfirm}
                  type="button"
                  disabled={loading}
                  className="flex-1 sm:flex-none rounded-lg px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
                >
                  {loading ? "Processing..." : confirmText}
                </button>
              )}
            </div>
          </div>
        </FocusGuard>
      </div>
    </div>,
    document.body
  );
};

export { EditResourceButton } from "./EditResourceButton";
export { DeleteResourceButton } from "./DeleteResourceButton";
