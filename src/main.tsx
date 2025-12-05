import { QueryProvider } from "@app/providers/query.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProvider>
);
