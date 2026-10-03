import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import hotelConfig from '@/config/hotelConfig';
import type { FacilityRow, FacilityInput } from '@/lib/types';

type Facility = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

function configFacilities(): Facility[] {
  return hotelConfig.facilities.map((f, idx) => ({
    id: `config-${idx}`,
    icon: f.icon,
    title: f.title,
    description: f.description,
  }));
}

export function usePublicFacilities(): { facilities: Facility[]; loading: boolean } {
  const [facilities, setFacilities] = useState<Facility[]>(configFacilities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchFacilities() {
      try {
        const { data, error } = await supabase
          .from('facilities')
          .select('*')
          .order('sort_order', { ascending: true });

        if (cancelled) return;

        if (error || !data || data.length === 0) {
          setFacilities(configFacilities());
        } else {
          setFacilities(
            (data as FacilityRow[]).map((row) => ({
              id: row.id,
              icon: row.icon,
              title: row.title,
              description: row.description,
            }))
          );
        }
      } catch {
        if (!cancelled) setFacilities(configFacilities());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFacilities();
    return () => {
      cancelled = true;
    };
  }, []);

  return { facilities, loading };
}

export function useAllFacilities() {
  const [facilities, setFacilities] = useState<FacilityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacilities = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('facilities')
      .select('*')
      .order('sort_order', { ascending: true });

    if (err) {
      setError(err.message);
    } else if (data) {
      setFacilities(data as FacilityRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  return { facilities, loading, error, refetch: fetchFacilities };
}

export async function createFacility(input: FacilityInput) {
  const { data, error } = await supabase
    .from('facilities')
    .insert(input)
    .select()
    .single();
  return { data, error };
}

export async function updateFacility(id: string, input: Partial<FacilityInput>) {
  const { data, error } = await supabase
    .from('facilities')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteFacility(id: string) {
  const { error } = await supabase.from('facilities').delete().eq('id', id);
  return { error };
}
