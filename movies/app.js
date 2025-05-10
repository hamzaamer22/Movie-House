import "@/styles/globals.css";

import { AppThemeProvider } from "@/components/Layout";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </ThemeContextProvider>
  );
}