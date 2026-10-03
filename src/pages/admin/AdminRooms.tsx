import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAllRooms, createRoom, updateRoom, deleteRoom } from '@/lib/useRooms';
import type { RoomRow, RoomInput } from '@/lib/types';
import { formatPrice } from '@/utils/whatsapp';

const emptyForm: RoomInput = {
  name: '',
  description: '',
  price: 0,
  price_unit: 'night',
  capacity: '2 Guests',
  size: '',
  bed: '',
  image: '',
  amenities: [],
  sort_order: 0,
  is_published: true,
};

export default function AdminRooms() {
  const { rooms, loading, error, refetch } = useAllRooms();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RoomInput>(emptyForm);
  const [amenityInput, setAmenityInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setForm({ ...emptyForm, sort_order: rooms.length });
    setEditingId(null);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (room: RoomRow) => {
    setForm({
      name: room.name,
      description: room.description || '',
      price: room.price,
      price_unit: room.price_unit,
      capacity: room.capacity,
      size: room.size,
      bed: room.bed,
      image: room.image,
      amenities: room.amenities || [],
      sort_order: room.sort_order,
      is_published: room.is_published,
    });
    setEditingId(room.id);
    setFormError(null);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    if (!form.name.trim()) {
      setFormError('Room name is required');
      setSaving(false);
      return;
    }

    const payload = {
      ...form,
      amenities: form.amenities.filter((a) => a.trim()),
    };

    if (editingId) {
      const { error: err } = await updateRoom(editingId, payload);
      if (err) {
        setFormError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await createRoom(payload);
      if (err) {
        setFormError(err.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setShowForm(false);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error: err } = await deleteRoom(deleteId);
    if (!err) {
      refetch();
    }
    setDeleteId(null);
  };

  const addAmenity = () => {
    const val = amenityInput.trim();
    if (val && !form.amenities.includes(val)) {
      setForm({ ...form, amenities: [...form.amenities, val] });
    }
    setAmenityInput('');
  };

  const removeAmenity = (idx: number) => {
    setForm({ ...form, amenities: form.amenities.filter((_, i) => i !== idx) });
  };

  const roomToDelete = rooms.find((r) => r.id === deleteId);

  if (loading) {
    return (
      <div className="text-ivory-200/40 font-sans text-sm animate-pulse">Loading rooms...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">Rooms</h1>
          <p className="mt-2 text-sm font-sans font-light text-ivory-200/40">
            {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} in total
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300"
        >
          <Plus size={18} />
          Add Room
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="bg-charcoal-900 rounded-sm p-12 border border-charcoal-700 text-center">
          <p className="text-ivory-200/40 font-sans font-light text-sm">
            No rooms yet. Click "Add Room" to create your first listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col sm:flex-row gap-4 bg-charcoal-900 rounded-sm p-4 border border-charcoal-700 hover:border-charcoal-600 transition-colors"
            >
              {/* Image */}
              <div className="w-full sm:w-40 h-32 sm:h-28 rounded-sm overflow-hidden bg-charcoal-800 shrink-0">
                {room.image ? (
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-ivory-200/20 text-xs">No image</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans font-medium text-ivory-50 text-sm">{room.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs font-sans font-light text-ivory-200/40">
                      <span className="font-numeric text-gold-400">{formatPrice(room.price)}</span>
                      <span>/ {room.price_unit}</span>
                      <span>·</span>
                      <span>{room.capacity}</span>
                      <span>·</span>
                      <span>{room.bed}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[0.625rem] font-sans font-medium uppercase tracking-wide-lg ${
                      room.is_published
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-charcoal-700 text-ivory-200/40 border border-charcoal-600'
                    }`}
                  >
                    {room.is_published ? <Eye size={11} /> : <EyeOff size={11} />}
                    {room.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {room.description && (
                  <p className="mt-2 text-xs font-sans font-light text-ivory-200/40 line-clamp-2">
                    {room.description}
                  </p>
                )}

                {room.amenities && room.amenities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 4).map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-sm bg-charcoal-800 text-[0.625rem] font-sans font-light text-ivory-200/30"
                      >
                        {a}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="px-2 py-0.5 text-[0.625rem] font-sans font-light text-ivory-200/30">
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(room)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-sans font-medium text-ivory-200/60 hover:text-gold-400 hover:bg-charcoal-800 transition-all duration-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(room.id)}
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-6">
            <div className="relative w-full max-w-2xl bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl my-8">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-charcoal-700 sticky top-0 bg-charcoal-900 z-10 rounded-t-sm">
                <h2 className="font-serif text-xl font-light text-ivory-50 tracking-wide">
                  {editingId ? 'Edit Room' : 'Add New Room'}
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

                {/* Name */}
                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ocean Crest Suite"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Price + Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Price Unit
                    </label>
                    <input
                      type="text"
                      value={form.price_unit}
                      onChange={(e) => setForm({ ...form, price_unit: e.target.value })}
                      placeholder="night"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Capacity + Size + Bed */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Capacity
                    </label>
                    <input
                      type="text"
                      value={form.capacity}
                      onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                      placeholder="2 Guests"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Size
                    </label>
                    <input
                      type="text"
                      value={form.size}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      placeholder="750 sq ft"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Bed
                    </label>
                    <input
                      type="text"
                      value={form.bed}
                      onChange={(e) => setForm({ ...form, bed: e.target.value })}
                      placeholder="King Bed"
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  {form.image && (
                    <div className="mt-3 w-full h-32 rounded-sm overflow-hidden bg-charcoal-800">
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the room..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Amenities
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={amenityInput}
                      onChange={(e) => setAmenityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAmenity();
                        }
                      }}
                      placeholder="Type an amenity and press Enter"
                      className="flex-1 px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={addAmenity}
                      className="px-4 py-3 bg-charcoal-700 text-ivory-200/60 rounded-sm hover:bg-charcoal-600 transition-colors text-sm font-sans font-medium"
                    >
                      Add
                    </button>
                  </div>
                  {form.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-800 rounded-sm text-xs font-sans font-light text-ivory-200/60"
                        >
                          {a}
                          <button type="button" onClick={() => removeAmenity(i)} className="text-ivory-200/30 hover:text-red-400 transition-colors">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort order + Published */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Status
                    </label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_published: !form.is_published })}
                      className={`w-full px-4 py-3 rounded-sm text-sm font-sans font-medium transition-colors ${
                        form.is_published
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-charcoal-800 text-ivory-200/40 border border-charcoal-700'
                      }`}
                    >
                      {form.is_published ? 'Published' : 'Draft'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
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
                    className="px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Room'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-md bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-red-500/10 flex items-center justify-center">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="font-sans font-medium text-ivory-50">Delete Room</h3>
            </div>
            <p className="text-sm font-sans font-light text-ivory-200/50 mb-6">
              Are you sure you want to delete <span className="text-ivory-50 font-medium">{roomToDelete.name}</span>? This action cannot be undone.
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
