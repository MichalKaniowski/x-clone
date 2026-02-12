"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Logo } from "./logo";
import { ProfileButton } from "./profile-button";
import { Input } from "./ui/primitives/input";

export const Navbar = () => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchInputRef.current?.value}`);
  };

  return (
    <header className="top-0 z-10 sticky bg-card shadow-sm">
      <div className="flex justify-between items-center gap-5 mx-auto p-3 sm:px-6 max-w-7xl">
        <div className="flex justify-between sm:justify-normal items-center gap-5 w-full">
          <Link href="/">
            <Logo className="size-8 sm:size-9" />
          </Link>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              className="rounded-xl w-[250px] sm:h-10"
              placeholder="Search"
              ref={searchInputRef}
            />
            <Search className="top-1/2 right-2 absolute size-5 text-muted-foreground -translate-y-1/2 transform" />
          </form>
        </div>
        <ProfileButton size={34} className="hidden sm:block" />
      </div>
    </header>
  );
};
