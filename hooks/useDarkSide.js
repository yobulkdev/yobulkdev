import { useState, useEffect } from "react";

export default function useDarkSide() {
    const [theme, setTheme] = useState(
        typeof window !== "undefined" ? localStorage.theme : "light"
    );
    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}
