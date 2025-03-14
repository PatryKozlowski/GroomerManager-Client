import HamburgerMenu from "@/components/HamburgerMenu";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background w-full p-4 h-[65px]">
      <div className="flex gap-2 justify-between">
        <div className="flex items-start">
          <HamburgerMenu />
        </div>
        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
