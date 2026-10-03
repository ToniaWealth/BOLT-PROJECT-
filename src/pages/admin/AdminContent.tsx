import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Pencil, X, AlertCircle, Building2, FileText, Waves } from 'lucide-react';
import { useAdminSiteContent, saveSiteContent } from '@/lib/useSiteContent';
import { useAllFacilities, createFacility, updateFacility, deleteFacility } from '@/lib/useFacilities';
import type { FacilityRow, FacilityInput } from '@/lib/types';

type Tab = 'info' | 'about' | 'facilities';

const FACILITY_ICONS = [
  'Waves', 'Flower2', 'UtensilsCrossed', 'Dumbbell', 'Palmtree', 'Wine',
  'Plane', 'ConciergeBell', 'Car', 'Sparkles', 'Dog', 'Wifi',
];

const emptyFacilityForm: FacilityInput = {
  icon: 'Waves',
  title: '',
  description: '',
  sort_order: 0,
};

export default function AdminContent() {
  const [tab, setTab] = useState<Tab>('info');

  const tabs: { id: Tab; label: string; icon: typeof Building2 }[] = [
    { id: 'info', label: 'Hotel Information', icon: Building2 },
    { id: 'about', label: 'About Section', icon: FileText },
    { id: 'facilities', label: 'Facilities', icon: Waves },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">Website Content</h1>
        <p className="mt-2 text-sm font-sans font-light text-ivory-200/40">
          Edit hotel information, about section, and facilities
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-charcoal-700 pb-px">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-medium transition-all duration-200 border-b-2 -mb-px ${
                active
                  ? 'text-gold-400 border-gold-500'
                  : 'text-ivory-200/40 border-transparent hover:text-ivory-100'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'info' && <HotelInfoTab />}
      {tab === 'about' && <AboutTab />}
      {tab === 'facilities' && <FacilitiesTab />}
    </div>
  );
}

function HotelInfoTab() {
  const { content, loading, refetch } = useAdminSiteContent();
  const [form, setForm] = useState(content);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(content);
  }, [content]);

  if (loading && form.hotel_name === '') {
    return <div className="text-ivory-200/40 font-sans text-sm animate-pulse">Loading content...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: err } = await saveSiteContent({
      hotel_name: form.hotel_name,
      tagline: form.tagline,
      logo_text: form.logo_text,
      logo_subtext: form.logo_subtext,
      phone: form.phone,
      phone_raw: form.phone_raw,
      whatsapp_number: form.whatsapp_number,
      email: form.email,
      address_line1: form.address_line1,
      address_line2: form.address_line2,
      about_title: content.about_title,
      about_paragraphs: content.about_paragraphs,
      about_image: content.about_image,
      about_stat_1_value: content.about_stat_1_value,
      about_stat_1_label: content.about_stat_1_label,
      about_stat_2_value: content.about_stat_2_value,
      about_stat_2_label: content.about_stat_2_label,
      about_stat_3_value: content.about_stat_3_value,
      about_stat_3_label: content.about_stat_3_label,
      about_stat_4_value: content.about_stat_4_value,
      about_stat_4_label: content.about_stat_4_label,
    });

    setSaving(false);

    if (err) {
      setError(err.message);
    } else {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
      refetch();
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {savedMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-green-500/10 border border-green-500/20 text-sm font-sans text-green-400">
          <Save size={16} />
          Changes saved successfully
        </div>
      )}

      <SectionLabel>Hotel Name</SectionLabel>
      <Input value={form.hotel_name} onChange={(v) => setForm({ ...form, hotel_name: v })} placeholder="Hotel name" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <SectionLabel>Logo Text</SectionLabel>
          <Input value={form.logo_text} onChange={(v) => setForm({ ...form, logo_text: v })} placeholder="HOTEL NAME" />
        </div>
        <div>
          <SectionLabel>Logo Subtext</SectionLabel>
          <Input value={form.logo_subtext} onChange={(v) => setForm({ ...form, logo_subtext: v })} placeholder="RESORT & SPA" />
        </div>
      </div>

      <SectionLabel>Tagline</SectionLabel>
      <Input value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} placeholder="Short tagline" />

      <div className="border-t border-charcoal-700 pt-6 mt-8">
        <h3 className="text-xs font-sans font-medium uppercase tracking-wide-lg text-gold-400 mb-5">Contact Information</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <SectionLabel>Phone (display)</SectionLabel>
            <Input value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+1 234 567 8900" />
          </div>
          <div>
            <SectionLabel>Phone (raw, for tel: links)</SectionLabel>
            <Input value={form.phone_raw} onChange={(v) => setForm({ ...form, phone_raw: v })} placeholder="+12345678900" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <SectionLabel>WhatsApp Number</SectionLabel>
            <Input value={form.whatsapp_number} onChange={(v) => setForm({ ...form, whatsapp_number: v })} placeholder="12345678900" />
          </div>
          <div>
            <SectionLabel>Email Address</SectionLabel>
            <Input value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="info@hotel.com" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel>Address Line 1</SectionLabel>
            <Input value={form.address_line1} onChange={(v) => setForm({ ...form, address_line1: v })} placeholder="Street address" />
          </div>
          <div>
            <SectionLabel>Address Line 2</SectionLabel>
            <Input value={form.address_line2} onChange={(v) => setForm({ ...form, address_line2: v })} placeholder="City, State ZIP" />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

function AboutTab() {
  const { content, loading, refetch } = useAdminSiteContent();
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [aboutTitle, setAboutTitle] = useState(content.about_title);
  const [aboutImage, setAboutImage] = useState(content.about_image);
  const [paragraphs, setParagraphs] = useState<string[]>(content.about_paragraphs);
  const [stats, setStats] = useState([
    { value: content.about_stat_1_value, label: content.about_stat_1_label },
    { value: content.about_stat_2_value, label: content.about_stat_2_label },
    { value: content.about_stat_3_value, label: content.about_stat_3_label },
    { value: content.about_stat_4_value, label: content.about_stat_4_label },
  ]);

  useEffect(() => {
    setAboutTitle(content.about_title);
    setAboutImage(content.about_image);
    setParagraphs(content.about_paragraphs);
    setStats([
      { value: content.about_stat_1_value, label: content.about_stat_1_label },
      { value: content.about_stat_2_value, label: content.about_stat_2_label },
      { value: content.about_stat_3_value, label: content.about_stat_3_label },
      { value: content.about_stat_4_value, label: content.about_stat_4_label },
    ]);
  }, [content]);

  if (loading && aboutTitle === '') {
    return <div className="text-ivory-200/40 font-sans text-sm animate-pulse">Loading content...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: err } = await saveSiteContent({
      hotel_name: content.hotel_name,
      tagline: content.tagline,
      logo_text: content.logo_text,
      logo_subtext: content.logo_subtext,
      phone: content.phone,
      phone_raw: content.phone_raw,
      whatsapp_number: content.whatsapp_number,
      email: content.email,
      address_line1: content.address_line1,
      address_line2: content.address_line2,
      about_title: aboutTitle,
      about_paragraphs: paragraphs.filter((p) => p.trim()),
      about_image: aboutImage,
      about_stat_1_value: stats[0].value,
      about_stat_1_label: stats[0].label,
      about_stat_2_value: stats[1].value,
      about_stat_2_label: stats[1].label,
      about_stat_3_value: stats[2].value,
      about_stat_3_label: stats[2].label,
      about_stat_4_value: stats[3].value,
      about_stat_4_label: stats[3].label,
    });

    setSaving(false);

    if (err) {
      setError(err.message);
    } else {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
      refetch();
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {savedMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-green-500/10 border border-green-500/20 text-sm font-sans text-green-400">
          <Save size={16} />
          About section saved successfully
        </div>
      )}

      <SectionLabel>About Title</SectionLabel>
      <Input value={aboutTitle} onChange={setAboutTitle} placeholder="A Sanctuary Built on Stillness" />

      <SectionLabel>About Image URL</SectionLabel>
      <Input value={aboutImage} onChange={setAboutImage} placeholder="https://images.pexels.com/..." />
      {aboutImage && (
        <div className="w-full h-32 rounded-sm overflow-hidden bg-charcoal-800">
          <img src={aboutImage} alt="About preview" className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Paragraphs</SectionLabel>
          <button
            type="button"
            onClick={() => setParagraphs([...paragraphs, ''])}
            className="flex items-center gap-1 text-xs font-sans font-medium text-gold-400 hover:text-gold-300 transition-colors"
          >
            <Plus size={14} />
            Add paragraph
          </button>
        </div>
        <div className="space-y-3">
          {paragraphs.map((para, idx) => (
            <div key={idx} className="flex gap-2">
              <textarea
                rows={3}
                value={para}
                onChange={(e) => {
                  const next = [...paragraphs];
                  next[idx] = e.target.value;
                  setParagraphs(next);
                }}
                placeholder={`Paragraph ${idx + 1}`}
                className="flex-1 px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
              <button
                type="button"
                onClick={() => setParagraphs(paragraphs.filter((_, i) => i !== idx))}
                className="px-3 text-ivory-200/30 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Statistics (4 items)</SectionLabel>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-charcoal-800 rounded-sm p-4 border border-charcoal-700">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], value: e.target.value };
                  setStats(next);
                }}
                placeholder="Value (e.g. 7)"
                className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors mb-2"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setStats(next);
                }}
                placeholder="Label (e.g. Acres of Oceanfront)"
                className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

function FacilitiesTab() {
  const { facilities, loading, error, refetch } = useAllFacilities();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FacilityInput>(emptyFacilityForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setForm({ ...emptyFacilityForm, sort_order: facilities.length });
    setEditingId(null);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (facility: FacilityRow) => {
    setForm({
      icon: facility.icon,
      title: facility.title,
      description: facility.description,
      sort_order: facility.sort_order,
    });
    setEditingId(facility.id);
    setFormError(null);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    if (!form.title.trim()) {
      setFormError('Title is required');
      setSaving(false);
      return;
    }

    if (editingId) {
      const { error: err } = await updateFacility(editingId, form);
      if (err) setFormError(err.message);
      else {
        setShowForm(false);
        refetch();
      }
    } else {
      const { error: err } = await createFacility(form);
      if (err) setFormError(err.message);
      else {
        setShowForm(false);
        refetch();
      }
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error: err } = await deleteFacility(deleteId);
    if (!err) refetch();
    setDeleteId(null);
  };

  if (loading) {
    return <div className="text-ivory-200/40 font-sans text-sm animate-pulse">Loading facilities...</div>;
  }

  const facilityToDelete = facilities.find((f) => f.id === deleteId);

  return (
    <div>
      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-sans font-light text-ivory-200/40">
          {facilities.length} {facilities.length === 1 ? 'facility' : 'facilities'}
        </p>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300"
        >
          <Plus size={18} />
          Add Facility
        </button>
      </div>

      {facilities.length === 0 ? (
        <div className="bg-charcoal-900 rounded-sm p-12 border border-charcoal-700 text-center">
          <p className="text-ivory-200/40 font-sans font-light text-sm">
            No facilities yet. Click "Add Facility" to create your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="flex items-center gap-4 bg-charcoal-900 rounded-sm p-4 border border-charcoal-700 hover:border-charcoal-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-sm bg-charcoal-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-sans font-medium text-ivory-200/40">{facility.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-medium text-ivory-50 text-sm">{facility.title}</h3>
                <p className="text-xs font-sans font-light text-ivory-200/40 line-clamp-1 mt-1">{facility.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(facility)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-sans font-medium text-ivory-200/60 hover:text-gold-400 hover:bg-charcoal-800 transition-all duration-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(facility.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-sans font-medium text-ivory-200/60 hover:text-red-400 hover:bg-charcoal-800 transition-all duration-200"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-6">
            <div className="relative w-full max-w-lg bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl my-8">
              <div className="flex items-center justify-between px-8 py-6 border-b border-charcoal-700">
                <h2 className="font-serif text-xl font-light text-ivory-50 tracking-wide">
                  {editingId ? 'Edit Facility' : 'Add Facility'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-ivory-200/40 hover:text-ivory-50 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="px-8 py-6 space-y-5">
                {formError && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
                    <AlertCircle size={16} />
                    {formError}
                  </div>
                )}

                <div>
                  <SectionLabel>Icon</SectionLabel>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    {FACILITY_ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <SectionLabel>Title</SectionLabel>
                  <Input value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Infinity Pool" />
                </div>

                <div>
                  <SectionLabel>Description</SectionLabel>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A 40-meter oceanfront infinity pool..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <SectionLabel>Sort Order</SectionLabel>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal-700">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3 text-sm font-sans font-medium text-ivory-200/60 hover:text-ivory-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Facility'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && facilityToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-md bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-red-500/10 flex items-center justify-center">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="font-sans font-medium text-ivory-50">Delete Facility</h3>
            </div>
            <p className="text-sm font-sans font-light text-ivory-200/50 mb-6">
              Delete <span className="text-ivory-50 font-medium">{facilityToDelete.title}</span>? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 text-sm font-sans font-medium text-ivory-200/60 hover:text-ivory-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-500 text-white text-sm font-sans font-medium rounded-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
    />
  );
}
