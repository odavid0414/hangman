import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { persistor, store } from "./store/store.ts";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <MantineProvider
        defaultColorScheme="light"
        colorSchemeManager={localStorageColorSchemeManager({ key: "hangman-color-scheme" })}
      >
        <App />
      </MantineProvider>
    </PersistGate>
  </ReduxProvider>
)
