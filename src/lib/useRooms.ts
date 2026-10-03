import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { RoomRow, RoomInput } from '@/lib/types';

export function useAllRooms() {
  const [rooms, setRooms] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('rooms')
      .select('*')
      .order('sort_order', { ascending: true });

    if (err) {
      setError(err.message);
    } else if (data) {
      setRooms(data as RoomRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, loading, error, refetch: fetchRooms };
}

export async function createRoom(input: RoomInput) {
  const { data, error } = await supabase
    .from('rooms')
    .insert(input)
    .select()
    .single();
  return { data, error };
}

export async function updateRoom(id: string, input: Partial<RoomInput>) {
  const { data, error } = await supabase
    .from('rooms')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteRoom(id: string) {
  const { error } = await supabase.from('rooms').delete().eq('id', id);
  return { error };
}
