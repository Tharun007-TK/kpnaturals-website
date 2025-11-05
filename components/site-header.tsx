"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/public/locales/en/common.json";
import taCommon from "@/public/locales/ta/common.json";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

// Initialize i18next if not already initialized
if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ta"],
    defaultNS: "common",
    ns: ["common"],
    resources: {
      en: { common: enCommon as any },
      ta: { common: taCommon as any },
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

// ----------------------
// NAV ITEMS
// ----------------------
function useNavItems() {
  const { t } = useTranslation("common");
  return [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "/#benefits", label: t("nav.benefits") },
    { href: "/reviews", label: t("nav.reviews") },
    { href: "/#contact", label: t("nav.contact") },
  ] as { href: string; label: string }[];
}

// ----------------------
// NAV LINKS COMPONENT (FIXED)
// ----------------------
function NavLinks({
  orientation = "row",
  onNavigate,
}: {
  orientation?: "row" | "col";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const NAV_ITEMS = useNavItems();
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    handleHashChange(); // set initial hash
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex gap-1",
        orientation === "col" ? "flex-col p-2" : "items-center"
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isHashLink = item.href.startsWith("/#");

        // Determine if link is active
        const active = isHashLink
          ? pathname === "/" && hash === item.href.replace("/", "")
          : pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "bg-green-700 text-white shadow-sm"
                : "text-foreground/70 hover:text-foreground hover:bg-green-700/50 hover:shadow-sm"
            )}
          >
            <span className="relative z-10">{item.label}</span>
            {!active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// ----------------------
// SITE HEADER COMPONENT
// ----------------------
export function SiteHeader() {
  const { t } = useTranslation("common");
  const { language } = useLanguage();

  React.useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t("button.whatsappMessage"));
    window.open(`https://wa.me/916381248615?text=${message}`, "_blank");
  };

  return (
    <header className="sticky top-0 z-[100] border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-2">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg px-1 -ml-1"
            aria-label="Go to home"
          >
            <span className="relative block">
              <img
                src="/kp-header-logo.png"
                alt="KP Natural Hairoils Logo"
                className="h-8 w-8 md:h-10 md:w-10 object-cover rounded-full dark:brightness-110 dark:contrast-110 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
            </span>
            <span className="font-serif font-black text-base md:text-xl text-foreground whitespace-nowrap transition-colors duration-300 group-hover:text-primary">
              KP Natural Hairoils
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2 relative z-[110]">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            onClick={handleWhatsAppClick}
            className="hidden lg:flex bg-green-600 hover:bg-green-700 text-white border-0 text-sm px-4 py-2 rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 group"
          >
            <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="font-medium">{t("button.whatsapp")}</span>
          </Button>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center gap-1 relative z-[110]">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="hover:bg-accent/50 hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 z-[120]">
              <div className="p-4 border-b bg-gradient-to-r from-background to-accent/10">
                <Link
                  href="/"
                  className="font-serif font-black text-lg hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md inline-block"
                  aria-label="Go to home"
                >
                  KP Natural Hairoils
                </Link>
              </div>
              <nav aria-label="Mobile" className="flex flex-col p-2 space-y-1">
                {useNavItems().map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative px-4 py-3 rounded-lg text-sm font-medium text-foreground/90 hover:bg-accent/50 hover:text-foreground hover:pl-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-8 transition-all duration-300 rounded-full" />
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild></SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
