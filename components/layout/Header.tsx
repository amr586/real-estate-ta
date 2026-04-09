'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, Sparkles, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isLoggedIn?: boolean;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function Header({ isLoggedIn = false, user }: HeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-800/30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-600/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white hidden sm:inline">Real Estate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: '/', label: 'الرئيسية' },
              { href: '/properties', label: 'العقارات' },
              { href: '/request-property', label: 'طلب عقار' },
              { href: '/ai-chat', label: 'مساعد ذكي' },
              { href: '/about', label: 'من نحن' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Auth & Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white font-medium hover:bg-purple-900/50">
                    {user.firstName} {user.lastName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-purple-950 border-purple-800">
                  <div className="px-3 py-2 text-sm text-purple-300">
                    <p>{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem asChild className="cursor-pointer text-purple-200 hover:text-white focus:text-white focus:bg-purple-900">
                    <Link href="/dashboard">لوحة التحكم</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-purple-200 hover:text-white focus:text-white focus:bg-purple-900">
                    <Link href="/profile">الملف الشخصي</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-purple-900">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="text-purple-200 hover:text-white hover:bg-purple-900/50"
                >
                  <Link href="/login">دخول</Link>
                </Button>
                <Button
                  asChild
                  className="bg-purple-600 text-white hover:bg-purple-700 btn-hover-effect"
                >
                  <Link href="/register">تسجيل</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-purple-900/50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-6 space-y-3 animate-slide-in-down">
            {[
              { href: '/', label: 'الرئيسية', icon: null },
              { href: '/properties', label: 'العقارات', icon: null },
              { href: '/request-property', label: 'طلب عقار', icon: null },
              { href: '/ai-chat', label: 'مساعد ذكي', icon: <Sparkles className="w-4 h-4" /> },
              { href: '/about', label: 'من نحن', icon: null },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
