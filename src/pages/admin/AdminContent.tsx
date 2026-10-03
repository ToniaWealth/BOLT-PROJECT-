import { Globe } from 'lucide-react';

export default function AdminContent() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">Website Content</h1>
        <p className="mt-2 text-sm font-sans font-light text-ivory-200/40">
          Edit text, images, and sections across your website
        </p>
      </div>

      <div className="bg-charcoal-900 rounded-sm p-16 border border-charcoal-700 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-charcoal-800 mb-6">
          <Globe size={28} className="text-ivory-200/20" />
        </div>
        <h3 className="font-sans font-medium text-ivory-50 text-sm mb-2">Content editor coming soon</h3>
        <p className="text-sm font-sans font-light text-ivory-200/40 max-w-sm mx-auto">
          This section will let you edit hero text, gallery images, testimonials, facilities, and other website content directly from the admin panel.
        </p>
      </div>
    </div>
  );
}
