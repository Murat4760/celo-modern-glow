import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { href: "/#menu", label: t.nav.menu },
    { href: "/menu", label: t.menuPage.label },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.slice(1); // e.g. "#menu"
      if (location.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + hash);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 backdrop-blur-md bg-background/60 border-b border-copper/20">
      <a href="/" className="text-copper-gradient text-xl font-bold font-display">
        CELO
      </a>

      {/* Desktop nav */}
      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-md md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-copper/20 w-72">
            <SheetHeader>
              <SheetTitle className="text-copper-gradient text-xl font-bold font-display">
                CELO
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-lg px-4 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
