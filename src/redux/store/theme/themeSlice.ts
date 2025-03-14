import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(savedTheme);
      return savedTheme as Theme;
    }
    const initialTheme = "light";
    localStorage.setItem("theme", initialTheme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);
    return initialTheme;
  })(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(state.theme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
