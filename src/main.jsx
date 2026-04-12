import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GuestUMKM from "./Pertemuan4/data/GuestUMKM";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GuestUMKM />
  </StrictMode>
);