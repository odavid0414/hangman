import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { store } from "./store/store.ts";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <MantineProvider
      defaultColorScheme="light"
      colorSchemeManager={localStorageColorSchemeManager({ key: "hangman-color-scheme" })}
    >
      <App />
    </MantineProvider>
  </ReduxProvider>
)
