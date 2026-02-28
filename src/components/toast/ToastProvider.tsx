"use client";

import { useState, useContext, createContext, useMemo, useRef, useCallback } from "react";

type TostVariant = 'success' | 'error' | 'info';

type Tost = { 
    id: string; 
    title: string; 
    message?: string; 
    variant: TostVariant;
};


type TostInput = Omit<Tost, 'id'>;

type TostCtx = { 
    push: (t: TostInput) => void;
    dismiss: (id: string) => void;
    clear: () => void;
};

const ToastContext = createContext<TostCtx | null>(null);

export function ToastProvider({children}: {children: React.ReactNode}) {
    const [toasts, setToasts] = useState<Tost[]>([]);
    const timerRef = useRef<Record<string, number>>({});

    const dismiss = useCallback((id: string) => {
        // clear timer if it exists
        const timerId = timerRef.current?.[id];
        if (timerId) {
            clearTimeout(timerId);
            delete timerRef.current?.[id];
        }
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const clear = useCallback(() => {
        for (const id in timerRef.current) {
            clearTimeout(timerRef.current[id]);
        }
        timerRef.current = {};
        setToasts([]);
    }, []);

    const push = useCallback((t: TostInput) => {
        const id = crypto?.randomUUID?.() ?? `toast-${Date.now()}_${Math.random()}`;
        const toast : Tost = {id, ...t};
        setToasts((prev) => [...prev, toast]);
        const timerId = setTimeout(() => {
            dismiss(id);
        }, 3000);
        timerRef.current[id] = timerId;
    }, [dismiss]);

    const value = useMemo(() => ({push, dismiss, clear}), [toasts, dismiss, clear]);
    return <ToastContext.Provider value={value}>
        {children}
        <div className="fixed bottom-0 right-0 p-4">
            {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "rounded-2xl border bg-white p-3 shadow-sm",
              t.variant === "success" ? "border-green-200" : "",
              t.variant === "error" ? "border-red-200" : "",
              t.variant === "info" ? "border-gray-200" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{t.title}</div>
                {t.message && <div className="mt-0.5 text-xs text-gray-600">{t.message}</div>}
              </div>

              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        </div>
    </ToastContext.Provider>
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
}