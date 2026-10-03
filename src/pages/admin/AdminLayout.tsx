import { type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BedDouble, FileText, Settings as SettingsIcon, Globe, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Rooms', href: '/admin/rooms', icon: BedDouble },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Website Content', href: '/admin/content', icon: Globe },
  { label: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal-900 border-r border-charcoal-700 fixed h-full">
        <SidebarContent isActive={isActive} onSignOut={handleSignOut} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-charcoal-900 border-r border-charcoal-700 flex flex-col">
            <SidebarContent isActive={isActive} onSignOut={handleSignOut} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-6 h-16 bg-charcoal-900 border-b border-charcoal-700 sticky top-0 z-40">
          <button onClick={() => setMobileOpen(true)} className="text-ivory-200" aria-label="Open menu">
            <Menu size={22} />
          </button>
          <span className="font-serif text-lg font-light text-ivory-50 tracking-wide">Admin</span>
          <button onClick={handleSignOut} className="text-ivory-200/50" aria-label="Sign out">
            <LogOut size={18} />
          </button>
        </header>

        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  isActive,
  onSignOut,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  onSignOut: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="px-6 py-8 border-b border-charcoal-700">
        <Link to="/admin" onClick={onNavigate} className="flex flex-col leading-none">
          <span className="font-serif text-xl font-light tracking-[0.15em] text-ivory-50">
            PROLIFICWEALTH
          </span>
          <span className="text-[0.5rem] font-sans font-medium tracking-[0.3em] uppercase mt-1.5 text-gold-400">
            Admin Panel
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-sans font-medium transition-all duration-200 ${
                active
                  ? 'bg-gold-500/10 text-gold-400 border-l-2 border-gold-500'
                  : 'text-ivory-200/50 hover:text-ivory-50 hover:bg-charcoal-800 border-l-2 border-transparent'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-charcoal-700">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-sans font-medium text-ivory-200/50 hover:text-red-400 hover:bg-charcoal-800 transition-all duration-200 w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-sans font-medium text-ivory-200/50 hover:text-ivory-50 hover:bg-charcoal-800 transition-all duration-200 w-full"
        >
          <X size={18} />
          Close Admin
        </Link>
      </div>
    </>
  );
}
