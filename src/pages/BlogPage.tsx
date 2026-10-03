import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import { usePublishedPosts } from '@/lib/useBlog';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const { posts, loading, error } = usePublishedPosts();
  const { gallery, hero, sections } = hotelConfig;

  const heroImage = gallery[0]?.src || hero.fallbackImage;

  const blogSection = (sections as Record<string, { eyebrow?: string; title?: string; subtitle?: string }>).blog || {
    eyebrow: 'Journal',
    title: 'Blog & Stories',
    subtitle: 'Insights, stories, and updates from our corner of the coast.',
  };

  return (
    <>
      <PageHero
        eyebrow={blogSection.eyebrow || 'Journal'}
        title={blogSection.title || 'Blog & Stories'}
        subtitle={blogSection.subtitle}
        image={heroImage}
      />

      <section className="py-28 md:py-36 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-sm font-sans font-light text-charcoal-400 animate-pulse">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-sm font-sans font-light text-charcoal-400">Unable to load blog posts right now.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-ivory-200 mb-6">
                <FileText size={28} className="text-charcoal-300" />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal-900 mb-3">No Articles Yet</h3>
              <p className="text-sm font-sans font-light text-charcoal-400 max-w-md mx-auto">
                Blog posts will appear here once they are published. Check back soon for stories and updates.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post (first) */}
              {posts[0] && (
                <Reveal className="mb-16">
                  <Link
                    to={`/blog/${posts[0].slug}`}
                    className="group block bg-white rounded-sm overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.10)] transition-all duration-700"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-ivory-200">
                        {posts[0].cover_image && (
                          <img
                            src={posts[0].cover_image}
                            alt={posts[0].title}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-xs font-sans font-medium uppercase tracking-wide-lg text-gold-500 mb-4">
                          <Calendar size={14} />
                          {formatDate(posts[0].published_at)}
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal-900 leading-tight mb-4">
                          {posts[0].title}
                        </h2>
                        {posts[0].excerpt && (
                          <p className="text-sm md:text-base font-sans font-light text-charcoal-500 leading-relaxed mb-6">
                            {posts[0].excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-charcoal-800 group-hover:text-gold-500 transition-colors duration-300">
                          Read Article
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Rest of posts */}
              {posts.length > 1 && (
                <>
                  <Reveal>
                    <SectionHeading
                      eyebrow="More Articles"
                      title="Latest Stories"
                    />
                  </Reveal>
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {posts.slice(1).map((post, idx) => (
                      <Reveal
                        key={post.id}
                        delay={((idx % 3) + 1) as 1 | 2 | 3}
                        className="group"
                      >
                        <Link
                          to={`/blog/${post.slug}`}
                          className="block bg-white rounded-sm overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.10)] transition-all duration-700 h-full"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-ivory-200">
                            {post.cover_image && (
                              <img
                                src={post.cover_image}
                                alt={post.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                              />
                            )}
                          </div>
                          <div className="p-6 md:p-8">
                            <div className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-gold-500 mb-3">
                              <Calendar size={12} />
                              {formatDate(post.published_at)}
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal-900 leading-tight mb-3">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-sm font-sans font-light text-charcoal-500 leading-relaxed line-clamp-3">
                                {post.excerpt}
                              </p>
                            )}
                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-sans font-medium text-charcoal-800 group-hover:text-gold-500 transition-colors duration-300">
                              Read More
                              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
