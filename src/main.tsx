import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";


import "primeicons/primeicons.css";
import "./index.css";
import Root from "./pages/Root";
import { initializeDummyData } from "./usecase/usecase-feeds";
import { initializeDummyDataUser } from "./usecase/usecase-users";

initializeDummyDataUser();
initializeDummyData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <Root />
    </PrimeReactProvider>
  </StrictMode>
);
