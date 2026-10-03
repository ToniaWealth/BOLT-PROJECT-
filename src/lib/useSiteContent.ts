import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import hotelConfig from '@/config/hotelConfig';
import { setDynamicWhatsappNumber } from '@/utils/whatsapp';
import type { SiteContentRow, SiteContentInput } from '@/lib/types';

type SiteContent = {
  hotel_name: string;
  tagline: string;
  logo_text: string;
  logo_subtext: string;
  phone: string;
  phone_raw: string;
  whatsapp_number: string;
  email: string;
  address_line1: string;
  address_line2: string;
  about_title: string;
  about_paragraphs: string[];
  about_image: string;
  about_stat_1_value: string;
  about_stat_1_label: string;
  about_stat_2_value: string;
  about_stat_2_label: string;
  about_stat_3_value: string;
  about_stat_3_label: string;
  about_stat_4_value: string;
  about_stat_4_label: string;
};

function configToContent(): SiteContent {
  const c = hotelConfig;
  return {
    hotel_name: c.name,
    tagline: c.tagline,
    logo_text: c.logoText,
    logo_subtext: c.logoSubtext,
    phone: c.contact.phone,
    phone_raw: c.contact.phoneRaw,
    whatsapp_number: c.contact.whatsappNumber,
    email: c.contact.email,
    address_line1: c.contact.address.line1,
    address_line2: c.contact.address.line2,
    about_title: c.about.title,
    about_paragraphs: c.about.paragraphs,
    about_image: c.about.image,
    about_stat_1_value: c.about.stats[0]?.value || '',
    about_stat_1_label: c.about.stats[0]?.label || '',
    about_stat_2_value: c.about.stats[1]?.value || '',
    about_stat_2_label: c.about.stats[1]?.label || '',
    about_stat_3_value: c.about.stats[2]?.value || '',
    about_stat_3_label: c.about.stats[2]?.label || '',
    about_stat_4_value: c.about.stats[3]?.value || '',
    about_stat_4_label: c.about.stats[3]?.label || '',
  };
}

function rowToContent(row: SiteContentRow, fallback: SiteContent): SiteContent {
  return {
    hotel_name: row.hotel_name ?? fallback.hotel_name,
    tagline: row.tagline ?? fallback.tagline,
    logo_text: row.logo_text ?? fallback.logo_text,
    logo_subtext: row.logo_subtext ?? fallback.logo_subtext,
    phone: row.phone ?? fallback.phone,
    phone_raw: row.phone_raw ?? fallback.phone_raw,
    whatsapp_number: row.whatsapp_number ?? fallback.whatsapp_number,
    email: row.email ?? fallback.email,
    address_line1: row.address_line1 ?? fallback.address_line1,
    address_line2: row.address_line2 ?? fallback.address_line2,
    about_title: row.about_title ?? fallback.about_title,
    about_paragraphs: row.about_paragraphs ?? fallback.about_paragraphs,
    about_image: row.about_image ?? fallback.about_image,
    about_stat_1_value: row.about_stat_1_value ?? fallback.about_stat_1_value,
    about_stat_1_label: row.about_stat_1_label ?? fallback.about_stat_1_label,
    about_stat_2_value: row.about_stat_2_value ?? fallback.about_stat_2_value,
    about_stat_2_label: row.about_stat_2_label ?? fallback.about_stat_2_label,
    about_stat_3_value: row.about_stat_3_value ?? fallback.about_stat_3_value,
    about_stat_3_label: row.about_stat_3_label ?? fallback.about_stat_3_label,
    about_stat_4_value: row.about_stat_4_value ?? fallback.about_stat_4_value,
    about_stat_4_label: row.about_stat_4_label ?? fallback.about_stat_4_label,
  };
}

const fallbackContent = configToContent();

export function useSiteContent(): { content: SiteContent; loading: boolean } {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('id', 'singleton')
          .maybeSingle();

        if (cancelled) return;

        if (error || !data) {
          setContent(fallbackContent);
        } else {
          setContent(rowToContent(data as SiteContentRow, fallbackContent));
        }
      } catch {
        if (!cancelled) setContent(fallbackContent);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setDynamicWhatsappNumber(content.whatsapp_number);
  }, [content.whatsapp_number]);

  return { content, loading };
}

export function useAdminSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'singleton')
      .maybeSingle();

    if (err) {
      setError(err.message);
    } else if (data) {
      setContent(rowToContent(data as SiteContentRow, fallbackContent));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refetch: fetchContent };
}

export async function saveSiteContent(input: SiteContentInput) {
  const { data, error } = await supabase
    .from('site_content')
    .upsert({ id: 'singleton', ...input, updated_at: new Date().toISOString() })
    .select()
    .single();
  return { data, error };
}
