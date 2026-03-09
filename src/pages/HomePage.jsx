import Navbar from "../components/Navbar";
import MainComponent from "../components/MainComponent";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-8">
        <MainComponent />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-[var(--text-muted)] text-xs border-t border-white/5">
        Built with ❤️ · Color Palette Generator
      </footer>
    </div>
  );
}
