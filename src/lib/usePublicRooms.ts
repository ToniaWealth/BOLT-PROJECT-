import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import hotelConfig from '@/config/hotelConfig';
import type { Room } from '@/config/hotelConfig';

type SupabaseRoom = Room & { _fromSupabase: boolean };

const configRooms: Room[] = hotelConfig.rooms.map((r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  price: r.price,
  priceUnit: r.priceUnit,
  capacity: r.capacity,
  size: r.size,
  bed: r.bed,
  image: r.image,
  amenities: r.amenities,
}));

export function usePublicRooms(): { rooms: Room[]; loading: boolean } {
  const [rooms, setRooms] = useState<Room[]>(configRooms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRooms() {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (cancelled) return;

        if (error || !data || data.length === 0) {
          setRooms(configRooms);
        } else {
          const mapped: Room[] = data.map((row) => ({
            id: row.id,
            name: row.name,
            description: row.description || '',
            price: row.price,
            priceUnit: row.price_unit,
            capacity: row.capacity,
            size: row.size,
            bed: row.bed,
            image: row.image,
            amenities: row.amenities || [],
          }));
          setRooms(mapped);
        }
      } catch {
        if (!cancelled) setRooms(configRooms);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  return { rooms, loading };
}
