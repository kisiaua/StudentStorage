import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleMenuButton from "./ToggleMenuButton";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white">
      <div className="flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-semibold">StudentStorage</span>
        </Link>
        <ToggleMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <NavLinks isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
}
