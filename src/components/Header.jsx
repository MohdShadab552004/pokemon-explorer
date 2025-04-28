import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";

export default function Header({ searchTerm, setSearchTerm, types, selectedType, setSelectedType }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('CHALA');
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-yellow-300 shadow-md">
      <h1 className="text-3xl font-bold text-red-600 tracking-wider">Pokémon Explorer</h1>

      {/* Mobile Menu Toggle Button */}
      <button
        className={`lg:hidden p-2 text-red-600 ${(isSidebarOpen ? 'hidden' : 'block')}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar Menu for Mobile (Right side) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-yellow-300 shadow-md transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform lg:hidden`}
      >
        <button
          className="p-2 text-red-600"
          onClick={toggleSidebar}
        >
          ✖
        </button>
        <div className="flex flex-col gap-4 px-4 py-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TypeFilter types={types} selectedType={selectedType} setSelectedType={setSelectedType} />
        </div>
      </div>

      {/* Show Search and Filter on larger screens (desktop and up) */}
      <div
        className="container flex gap-5 h-full w-auto items-center justify-end"
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter types={types} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>
    </header>
  );
}
