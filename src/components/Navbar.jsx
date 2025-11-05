export default function Navbar() {
  return (
    <header className="h-[50px] w-full bg-white/70 backdrop-blur-sm shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-lg font-extrabold tracking-tight text-gray-800">
          Color Palette Generator
        </div>
        <div className="text-sm text-gray-600">
          Functional, fast — copy & save palettes
        </div>
      </div>
    </header>
  );
}
