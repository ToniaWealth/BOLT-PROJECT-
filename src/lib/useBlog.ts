import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { BlogRow, BlogInput } from '@/lib/types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
}

export function usePublishedPosts() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        const { data, error: err } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (cancelled) return;

        if (err) {
          setError(err.message);
          setPosts([]);
        } else if (data) {
          setPosts(data as BlogRow[]);
        }
      } catch {
        if (!cancelled) {
          setPosts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}

export function usePostBySlug(slug: string | undefined) {
  const [post, setPost] = useState<BlogRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: err } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (cancelled) return;

        if (err) {
          setError(err.message);
        } else if (data) {
          setPost(data as BlogRow);
        }
      } catch {
        if (!cancelled) setError('Failed to load post');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading, error };
}

export function useAllPosts() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      setError(err.message);
    } else if (data) {
      setPosts(data as BlogRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

export async function createPost(input: BlogInput) {
  const payload = {
    ...input,
    slug: input.slug || slugify(input.title),
  };
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function updatePost(id: string, input: Partial<BlogInput>) {
  const payload = { ...input, updated_at: new Date().toISOString() };
  if (input.title && !input.slug) {
    payload.slug = slugify(input.title);
  }
  const { data, error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deletePost(id: string) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  return { error };
}

export { slugify };
