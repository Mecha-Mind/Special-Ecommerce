"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection(options?: {
    hideAfter?: number;
    showAfter?: number;
}) {
    const hideAfter = options?.hideAfter ?? 80;
    const showAfter = options?.showAfter ?? 50;
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(()=>{
        lastY.current = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            const diff = y-lastY.current;

            if(diff > 0 && y > hideAfter && !hidden) {
                setHidden(true);
            }
            if(diff < 0 && y < showAfter && hidden) {
                setHidden(false);
            }

            lastY.current = y;
        }
        window.addEventListener('scroll', onScroll, {passive: true});

        return () => window.removeEventListener('scroll', onScroll);
    }, [hidden, hideAfter, showAfter]);
    return {hidden};
}