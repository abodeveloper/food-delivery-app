'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { get } from 'lodash';
import { MapPin, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../ui/button';
import { Container } from '../ui/container';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/branches', label: 'Branches' },
    { href: '/contacts', label: 'Contacts' },
  ];

  return (
    <>
      <header className="bg-white dark:bg-black shadow fixed top-0 left-0 right-0 z-50">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">
              E<span className="text-primary">Food</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="color-primary text-xl"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Button variant="default" onClick={handleLogout}>
                  Chiqish
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={() => router.push("/sign-in")}
                >
                  Kirish
                </Button>
              )}
              <ThemeToggle />
              <Link
                href={user ? "/profile" : "/sign-in"}
                className="text-brand hover:text-primary"
              >
                <User className="h-6 w-6" />
              </Link>
              <Link
                href={user ? "/profile" : "/sign-in"}
                className="text-gray-600 hover:text-primary"
              >
                {get(user, "username", "")}
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      toggleMenu();
                    }}
                    className="text-gray-600 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  {/* <span>{nearestBranch ? nearestBranch.name : 'Manzilingiz'}</span> */}
                </Button>
                <Link
                  href={user ? "/profile" : "/sign-in"}
                  className="text-gray-600 hover:text-primary flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <User className="h-6 w-6" />
                  <span>Profil</span>
                </Link>
              </div>
            </nav>
          )}
        </Container>
      </header>
    </>
  );
}
