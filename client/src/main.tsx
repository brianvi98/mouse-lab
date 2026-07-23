import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";

import { Provider } from "react-redux";
import { store } from "./api/store.ts";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPublishableKey} appearance={{ theme: dark }}>
        <Provider store={store}>
          <App />
        </Provider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
