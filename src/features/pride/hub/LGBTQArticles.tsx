import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";

export function LGBTQArticles() {
  const navigate = useNavigate();
  const featuredArticle = {
    id: "come-into-identity",
    category: "IDENTITY",
    categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
    title: 'What Does It Actually Mean to "Come Into" Your Identity?',
    description: "Identity isn't a destination — it's a living, shifting thing. This piece explores why so many LGBTQ+ people feel pressure to have it all figured out, and why that pressure is worth letting go.",
    readTime: "6 min read",
  };

  const articles = [
    {
      id: "anxiety-rates",
      category: "MENTAL",
      categoryColor: "text-[#10B981] bg-[#ECFDF5]",
      title: "Why LGBTQ+ People Experience Higher Rates of Anxiety",
      description: "Minority stress, social rejection, and hiding — how chronic pressure shapes LGBTQ+ mental health and what helps.",
      readTime: "5 min read",
    },
    {
      id: "coming-out-later",
      category: "COMING OUT",
      categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
      title: "Coming Out Later in Life: You're Not Behind",
      description: "Many LGBTQ+ people discover or accept their identity in their 30s, 40s, or beyond. This is their story.",
      readTime: "7 min read",
    },
    {
      id: "before-stonewall",
      category: "HISTORY",
      categoryColor: "text-[#EF4444] bg-[#FEF2F2]",
      title: "Before Stonewall: LGBTQ+ Resistance Through the Ages",
      description: "Queer people have always existed, resisted, and thrived — long before modern movements gave it a name.",
      readTime: "8 min read",
    },
    {
      id: "chosen-family",
      category: "FAMILY",
      categoryColor: "text-[#3B82F6] bg-[#EFF6FF]",
      title: "Chosen Family: How Queer People Build Belonging",
      description: "When biological families fall short, LGBTQ+ people have long built their own. A look at what chosen family really means.",
      readTime: "6 min read",
    },
    {
      id: "affirming-healthcare",
      category: "HEALTH",
      categoryColor: "text-[#06B6D4] bg-[#ECFEFF]",
      title: "Finding Affirming Healthcare: A Practical Guide",
      description: "What to look for in a provider, questions to ask, and how to advocate for yourself in medical settings.",
      readTime: "5 min read",
    },
    {
      id: "non-binary-beyond",
      category: "IDENTITY",
      categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
      title: "Non-Binary & Beyond: Understanding Gender Outside the Binary",
      description: "An accessible guide to gender identity, expression, and why the binary doesn't capture the full picture.",
      readTime: "6 min read",
    },
    {
      id: "internalized-homophobia",
      category: "MENTAL",
      categoryColor: "text-[#10B981] bg-[#ECFDF5]",
      title: "Internalized Homophobia: What It Is and How to Heal",
      description: "Growing up with negative messages about LGBTQ+ people leaves marks. Understanding them is the first step to healing.",
      readTime: "7 min read",
    },
    {
      id: "family-rejection",
      category: "COMING OUT",
      categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
      title: "When Family Doesn't Accept You: What to Do Next",
      description: "Rejection from family is one of the hardest experiences. Here's how to navigate it with safety and self-compassion.",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="activity-root bg-gradient-to-br from-[#F5EBFF] via-[#F2F0FF] to-[#FFE8EC]">
      <main className="activity-container-lg py-4 md:py-8 pt-[72px] md:pt-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/lgbtq-hub')}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100 mb-6"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
            Articles
          </h1>
          <p className="text-[#64748B] text-lg md:text-xl">
            Stories, insights, and knowledge, written for and by the community
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate(`/lgbtq-article/${featuredArticle.id}`)}
          style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
            backgroundColor: '#8B5CF6' 
          }}
          className="relative w-full rounded-3xl p-8 md:p-10 mb-12 overflow-hidden group cursor-pointer text-left shadow-xl shadow-purple-500/40 hover:shadow-2xl transition-all border border-white/20"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0" style={{ opacity: 0.15 }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full transform translate-x-20 -translate-y-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full transform -translate-x-20 translate-y-20 blur-2xl"></div>
          </div>

          <div className="relative space-y-5">
            <div className="flex items-center gap-3">
              <span 
                className="px-4 py-1.5 rounded-full text-white text-[10px] md:text-xs font-black uppercase tracking-[0.1em] border border-white/40"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)' }}
              >
                ⭐ Featured
              </span>
              <span className="text-white/90 text-xs md:text-sm font-bold">
                {featuredArticle.readTime}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] drop-shadow-lg">
              {featuredArticle.title}
            </h2>
            
            <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-semibold opacity-100">
              {featuredArticle.description}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <span 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[#8B5CF6] text-sm md:text-base font-black shadow-2xl group-hover:scale-105 transition-all"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                Read Article
                <ArrowRight size={20} strokeWidth={3} />
              </span>
            </div>
          </div>
        </motion.button>

        {/* More to Read */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#020817] flex items-center gap-3">
            More to Read
            <span className="text-base font-normal text-[#94A3B8]">({articles.length} articles)</span>
          </h2>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
          {articles.map((article, idx) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              onClick={() => navigate(`/lgbtq-article/${article.id}`)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer group text-left h-full flex flex-col"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${article.categoryColor} border border-current/20`}>
                    {article.category}
                  </span>
                  <span className="text-[#94A3B8] text-xs">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#020817] leading-tight group-hover:text-[#8B5CF6] transition-colors">
                  {article.title}
                </h3>

                <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[#8B5CF6] text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  Read more
                  <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
