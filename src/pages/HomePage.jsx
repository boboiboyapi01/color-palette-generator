import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ColorBox from "../components/ColorBox";
import { generatePalette } from "../utils/colorUtils";
import MainComponent from "../components/MainComponent";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-600">
      <Navbar />
      <main className="px-6">
        <MainComponent 

        />
      </main>
    </div>
  );
}
