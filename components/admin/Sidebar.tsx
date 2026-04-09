'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Home,
  Building2,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  {
    label: 'لوحة التحكم',
    href: '/admin',
    icon: Home,
    roles: ['super_admin', 'admin_properties', 'admin_analytics', 'admin_data'],
  },
  {
    label: 'إدارة العقارات',
    href: '/admin/properties',
    icon: Building2,
    roles: ['super_admin', 'admin_properties'],
  },
  {
    label: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: Users,
    roles: ['super_admin'],
  },
  {
    label: 'التحليلات والمراجعة',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'admin_analytics'],
  },
  {
    label: 'الإعدادات',
    href: '/admin/settings',
    icon: Settings,
    roles: ['super_admin'],
  },
];

interface SidebarProps {
  userRole: string;
}

export function AdminSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const filteredItems = adminMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-white border rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 right-0 h-screen w-64 bg-slate-900 text-white border-l border-slate-800 flex flex-col z-40 transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🏠</span>
            </div>
            <span className="font-bold text-lg">منصة العقارات</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">لوحة تحكم الإدارة</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="outline"
            className="w-full text-slate-300 border-slate-700 hover:bg-slate-800"
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>
    </>
  );
}
