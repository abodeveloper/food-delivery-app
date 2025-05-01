'use client';

import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Button from '@/components/common/Button';
import { MapPin, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../common/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Asosiy' },
    { href: '/about', label: 'Biz Haqimizda' },
    { href: '/branches', label: 'Filiallar' },
    { href: '/contacts', label: 'Kontaktlar' },
    { href: '/order', label: 'Buyurtma Berish' },
    user
      ? { href: '#', label: 'Chiqish', onClick: handleLogout }
      : { href: '/sign-in', label: 'Kirish' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Restoran
        </Link>
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.onClick}
              className="text-gray-600 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            {/* <span>{nearestBranch ? nearestBranch.name : 'Manzilingiz'}</span> */}
          </Button>
          <ThemeToggle />
          <Link
            href={user ? "/profile" : "/sign-in"}
            className="text-gray-600 hover:text-primary"
          >
            <User className="h-6 w-6" />
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
                  if (link.onClick) link.onClick();
                }}
                className="text-gray-600 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" className="flex items-center space-x-2">
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
    </header>
  );
}
