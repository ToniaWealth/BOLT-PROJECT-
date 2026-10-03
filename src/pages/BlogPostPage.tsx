import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import { usePostBySlug, usePublishedPosts } from '@/lib/useBlog';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = usePostBySlug(slug);
  const { posts } = usePublishedPosts();

  const { hero } = hotelConfig;
  const heroImage = post?.cover_image || hero.fallbackImage;

  const relatedPosts = posts
    .filter((p) => p.id !== post?.id)
    .slice(0, 2);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-sm font-sans font-light text-charcoal-400 animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${hero.fallbackImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/40 to-charcoal-950/75" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ivory-50">Article Not Found</h1>
            <p className="mt-4 text-sm font-sans font-light text-ivory-100/80">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide rounded-sm hover:bg-gold-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={formatDate(post.published_at) || 'Article'}
        title={post.title}
        subtitle={post.excerpt || undefined}
        image={heroImage}
      />

      {/* Article body */}
      <section className="py-20 md:py-28 bg-ivory-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-sans font-medium uppercase tracking-wide-lg text-gold-500 mb-8">
              <Calendar size={14} />
              {formatDate(post.published_at)}
            </div>

            {post.content && (
              <div className="prose-content">
                {post.content.split('\n').map((paragraph, idx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  return (
                    <p
                      key={idx}
                      className="text-base md:text-lg font-sans font-light text-charcoal-600 leading-[1.8] mb-6"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-ivory-200">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium text-charcoal-800 hover:text-gold-500 transition-colors duration-300 group"
              >
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to All Articles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-ivory-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal-900 text-center mb-12">
                Continue Reading
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {relatedPosts.map((rp, idx) => (
                <Reveal key={rp.id} delay={((idx % 2) + 1) as 1 | 2} className="group">
                  <Link
                    to={`/blog/${rp.slug}`}
                    className="block bg-ivory-50 rounded-sm overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.10)] transition-all duration-700"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-ivory-200">
                      {rp.cover_image && (
                        <img
                          src={rp.cover_image}
                          alt={rp.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-gold-500 mb-3">
                        <Calendar size={12} />
                        {formatDate(rp.published_at)}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal-900 leading-tight mb-3">
                        {rp.title}
                      </h3>
                      {rp.excerpt && (
                        <p className="text-sm font-sans font-light text-charcoal-500 leading-relaxed line-clamp-2">
                          {rp.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-sans font-medium text-charcoal-800 group-hover:text-gold-500 transition-colors duration-300">
                        Read More
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
