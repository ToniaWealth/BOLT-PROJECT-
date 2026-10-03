import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, AlertCircle, Calendar } from 'lucide-react';
import { useAllPosts, createPost, updatePost, deletePost, slugify } from '@/lib/useBlog';
import type { BlogRow } from '@/lib/types';

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published_at: string;
  status: 'published' | 'draft';
  sort_order: number;
};

const emptyForm: BlogFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  published_at: new Date().toISOString().split('T')[0],
  status: 'draft',
  sort_order: 0,
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AdminBlog() {
  const { posts, loading, error, refetch } = useAllPosts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setForm({ ...emptyForm, sort_order: posts.length });
    setEditingId(null);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (post: BlogRow) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image,
      published_at: post.published_at
        ? post.published_at.split('T')[0]
        : new Date().toISOString().split('T')[0],
      status: post.status,
      sort_order: post.sort_order,
    });
    setEditingId(post.id);
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

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image,
      published_at:
        form.status === 'published'
          ? new Date(form.published_at).toISOString()
          : form.published_at
            ? new Date(form.published_at).toISOString()
            : null,
      status: form.status,
      sort_order: form.sort_order,
    };

    if (editingId) {
      const { error: err } = await updatePost(editingId, payload);
      if (err) {
        setFormError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await createPost(payload);
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
    const { error: err } = await deletePost(deleteId);
    if (!err) refetch();
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="text-ivory-200/40 font-sans text-sm animate-pulse">Loading posts...</div>
    );
  }

  const postToDelete = posts.find((p) => p.id === deleteId);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">Blog</h1>
          <p className="mt-2 text-sm font-sans font-light text-ivory-200/40">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in total
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-charcoal-900 rounded-sm p-12 border border-charcoal-700 text-center">
          <p className="text-ivory-200/40 font-sans font-light text-sm">
            No posts yet. Click "New Post" to write your first article.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row gap-4 bg-charcoal-900 rounded-sm p-4 border border-charcoal-700 hover:border-charcoal-600 transition-colors"
            >
              <div className="w-full sm:w-40 h-32 sm:h-28 rounded-sm overflow-hidden bg-charcoal-800 shrink-0">
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-ivory-200/20 text-xs">No image</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans font-medium text-ivory-50 text-sm">{post.title}</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[0.625rem] font-sans font-medium uppercase tracking-wide-lg shrink-0 ${
                      post.status === 'published'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-charcoal-700 text-ivory-200/40 border border-charcoal-600'
                    }`}
                  >
                    {post.status === 'published' ? <Eye size={11} /> : <EyeOff size={11} />}
                    {post.status}
                  </span>
                </div>

                {post.excerpt && (
                  <p className="mt-2 text-xs font-sans font-light text-ivory-200/40 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-3 text-xs font-sans font-light text-ivory-200/30">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {formatDate(post.published_at)}
                  </span>
                  <span>·</span>
                  <span>/{post.slug}</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(post)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-sans font-medium text-ivory-200/60 hover:text-gold-400 hover:bg-charcoal-800 transition-all duration-200"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(post.id)}
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

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-6">
            <div className="relative w-full max-w-2xl bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl my-8">
              <div className="flex items-center justify-between px-8 py-6 border-b border-charcoal-700 sticky top-0 bg-charcoal-900 z-10 rounded-t-sm">
                <h2 className="font-serif text-xl font-light text-ivory-50 tracking-wide">
                  {editingId ? 'Edit Post' : 'New Blog Post'}
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
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm({
                        ...form,
                        title,
                        slug: editingId ? form.slug : slugify(title),
                      });
                    }}
                    placeholder="Post title"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-200/60 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <p className="mt-1.5 text-xs font-sans font-light text-ivory-200/30">
                    Public URL: /blog/{form.slug || 'your-post-title'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  {form.cover_image && (
                    <div className="mt-3 w-full h-32 rounded-sm overflow-hidden bg-charcoal-800">
                      <img src={form.cover_image} alt="Cover preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="A short summary shown on the blog listing page..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={10}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write your post content here..."
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors resize-y leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={form.published_at}
                      onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/40 mb-2">
                      Status
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          status: form.status === 'published' ? 'draft' : 'published',
                        })
                      }
                      className={`w-full px-4 py-3 rounded-sm text-sm font-sans font-medium transition-colors ${
                        form.status === 'published'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-charcoal-800 text-ivory-200/40 border border-charcoal-700'
                      }`}
                    >
                      {form.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </div>
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
                    className="px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteId && postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-md bg-charcoal-900 rounded-sm border border-charcoal-700 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-red-500/10 flex items-center justify-center">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="font-sans font-medium text-ivory-50">Delete Post</h3>
            </div>
            <p className="text-sm font-sans font-light text-ivory-200/50 mb-6">
              Are you sure you want to delete <span className="text-ivory-50 font-medium">{postToDelete.title}</span>? This action cannot be undone.
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
