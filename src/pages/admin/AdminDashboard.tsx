import { Link } from 'react-router-dom';
import { BedDouble, FileText, Globe, Settings as SettingsIcon, ArrowRight, TrendingUp } from 'lucide-react';
import { useAllRooms } from '@/lib/useRooms';

export default function AdminDashboard() {
  const { rooms, loading } = useAllRooms();
  const publishedCount = rooms.filter((r) => r.is_published).length;

  const stats = [
    { label: 'Total Rooms', value: loading ? '—' : rooms.length, icon: BedDouble, href: '/admin/rooms' },
    { label: 'Published', value: loading ? '—' : publishedCount, icon: TrendingUp, href: '/admin/rooms' },
    { label: 'Blog Posts', value: '0', icon: FileText, href: '/admin/blog' },
    { label: 'Settings', value: 'Manage', icon: SettingsIcon, href: '/admin/settings' },
  ];

  const quickActions = [
    { label: 'Manage Rooms', description: 'Add, edit, or remove room listings', icon: BedDouble, href: '/admin/rooms' },
    { label: 'Write a Blog Post', description: 'Create articles and announcements', icon: FileText, href: '/admin/blog' },
    { label: 'Edit Website Content', description: 'Update text, images, and sections', icon: Globe, href: '/admin/content' },
    { label: 'Site Settings', description: 'Configure contact info and branding', icon: SettingsIcon, href: '/admin/settings' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">Dashboard</h1>
        <p className="mt-2 text-sm font-sans font-light text-ivory-200/40">
          Overview of your hotel website content
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.href}
              className="bg-charcoal-900 rounded-sm p-6 border border-charcoal-700 hover:border-gold-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-sm bg-gold-500/10 flex items-center justify-center">
                  <Icon size={18} className="text-gold-500" />
                </div>
              </div>
              <div className="font-numeric text-2xl font-medium text-ivory-50">{stat.value}</div>
              <div className="text-xs font-sans font-light text-ivory-200/40 uppercase tracking-wide-lg mt-1">
                {stat.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-4 bg-charcoal-900 rounded-sm p-6 border border-charcoal-700 hover:border-gold-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-sm bg-gold-500/10 flex items-center justify-center shrink-0">
                <Icon size={22} className="text-gold-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-sans font-medium text-ivory-50">{action.label}</h3>
                <p className="text-xs font-sans font-light text-ivory-200/40 mt-1">{action.description}</p>
              </div>
              <ArrowRight size={18} className="text-ivory-200/20 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
