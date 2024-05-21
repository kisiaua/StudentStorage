import React from "react";
import HamburgerIcon from "../../icons/HamburgerIcon";
import CrossIcon from "../../icons/CrossIcon";

interface ToggleMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const ToggleMenuButton: React.FC<ToggleMenuButtonProps> = ({
  isMenuOpen,
  toggleMenu,
}) => {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="font-medium hover:text-blue-700 md:hidden"
    >
      {isMenuOpen ? (
        <CrossIcon strokeWidth={1.5} />
      ) : (
        <HamburgerIcon strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ToggleMenuButton;
