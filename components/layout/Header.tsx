'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Activity, Menu, X, Search } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Symptoms', href: '/symptoms' },
    { name: 'Conditions', href: '/conditions' },
    { name: 'Topics', href: '/topics' },
    { name: 'Providers', href: '/providers' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-amber-500" />
            <div>
              <div className="text-xl font-bold text-slate-50">
                Body<span className="text-amber-500">Signals</span>
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Independent health research digest
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-slate-50 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/symptoms"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-50 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-slate-50"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-slate-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
