import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Heart, User, Sparkles, ShieldAlert, Search, Tv, BookOpen, Users, ShieldX, Wind, HelpCircle, Star } from "lucide-react";

export function LGBTQAssessments() {
  const navigate = useNavigate();
  
  const assessments = [
    { id: "aromantic", icon: Heart, iconColor: "#F472B6", iconBg: "bg-pink-50", title: "Am I Aromantic?", description: "Explore your experiences with romantic attraction and where you might fall on the spectrum.", link: "https://forms.mantracare.org/am-i-aromantic/" },
    { id: "cisgender", icon: User, iconColor: "#3B82F6", iconBg: "bg-blue-50", title: "Am I Cisgender?", description: "Reflect on your gender identity and how it relates to the sex you were assigned at birth.", link: "https://forms.mantracare.org/am-i-cisgender/" },
    { id: "gay", icon: Sparkles, iconColor: "#A855F7", iconBg: "bg-purple-50", title: "Am I Gay?", description: "A gentle space to explore your attractions and feelings towards the same gender.", link: "https://forms.mantracare.org/am-i-gay/" },
    { id: "homophobic", icon: ShieldAlert, iconColor: "#EF4444", iconBg: "bg-red-50", title: "Are You Homophobic?", description: "An honest self-reflection tool to identify and unlearn internalized or external biases.", link: "https://forms.mantracare.org/are-you-homophobic/" },
    { id: "community-part", icon: Search, iconColor: "#10B981", iconBg: "bg-emerald-50", title: "What Part Of The LGBT Community Am I?", description: "Discover the diverse labels and identities that might resonate with your journey.", link: "https://forms.mantracare.org/what-part-of-the-lgbt-community-am-i/" },
    { id: "tv-trope", icon: Tv, iconColor: "#F59E0B", iconBg: "bg-amber-50", title: "Which LGBT Tv Trope Are You?", description: "A fun way to see which common (or rare) media representation fits your personality.", link: "https://forms.mantracare.org/which-lgbt-tv-trope-are-you/" },
    { id: "tarot", icon: BookOpen, iconColor: "#6366F1", iconBg: "bg-indigo-50", title: "Which Queer Tarot Deck Should You Try?", description: "Find the perfect artistic and spiritual tool that speaks to your unique queer soul.", link: "https://forms.mantracare.org/which-queer-tarot-deck-should-you-try/" },
    { id: "member-ally", icon: Users, iconColor: "#EC4899", iconBg: "bg-rose-50", title: "LGBTQ+ Are you a member, ally, enemy?", description: "Understand your stance and role within the global movement for equality.", link: "https://forms.mantracare.org/lgbtq-are-you-a-member-ally-enemy/" },
    { id: "transphobic", icon: ShieldX, iconColor: "#475569", iconBg: "bg-slate-100", title: "Are You Transphobic?", description: "Examine your perceptions of gender identity and help build a more inclusive world.", link: "https://forms.mantracare.org/are-you-transphobic/" },
    { id: "dysphoria", icon: Wind, iconColor: "#0EA5E9", iconBg: "bg-sky-50", title: "Gender Dysphoria", description: "Understand the complex feelings of disconnect between your body and gender identity.", link: "https://forms.mantracare.org/gender-dysphoria/" },
    { id: "sexuality", icon: HelpCircle, iconColor: "#8B5CF6", iconBg: "bg-violet-50", title: "What Am I Sexually?", description: "Navigate the beautiful complexity of sexual orientation and find what feels right.", link: "https://forms.mantracare.org/what-am-i-sexually/" },
  ];

  const handleAssessmentClick = (link: string) => {
    if (link.startsWith('http')) {
      window.location.href = link;
    } else if (link !== "#") {
      navigate(link);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="activity-root bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#F1F5F9]">
      <main className="activity-container-lg py-4 md:py-8 pt-[72px] md:pt-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-start gap-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/lgbtq-hub')}
                className="mt-1 text-[#64748B] hover:text-[#020817] transition-colors"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </motion.button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <Star size={18} className="text-[#64748B]" />
                  </div>
                  <h1 className="text-3xl md:text-4xl text-[#020817] font-bold tracking-tight leading-tight">
                    Self-Discovery Tests
                  </h1>
                </div>
                <p className="text-base md:text-lg text-[#64748B] max-w-2xl">
                  Explore your identity through our guided assessments and interactive quizzes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Assessments List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {assessments.map((assessment) => {
              const IconComponent = assessment.icon;
              return (
                <motion.button
                  key={assessment.id}
                  variants={item}
                  whileHover={{ y: -4, scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => handleAssessmentClick(assessment.link)}
                  className="w-full bg-white rounded-3xl p-5 md:p-6 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all duration-300 group text-left relative overflow-hidden border border-gray-100"
                >
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon Box */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 ${assessment.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 relative z-10`}>
                    <IconComponent style={{ color: assessment.iconColor }} size={28} strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative z-10 pr-4">
                    <h3 className="text-lg md:text-xl font-bold text-[#020817] mb-1 transition-colors duration-300 group-hover:text-black">
                      {assessment.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#64748B] leading-relaxed line-clamp-2">
                      {assessment.description}
                    </p>
                  </div>

                  {/* Begin Test Button (Right Side) */}
                  <div className="flex-shrink-0 relative z-10 hidden sm:block">
                    <div className="flex items-center gap-2 text-[#F59E0B] font-extrabold text-xs uppercase tracking-widest transition-all duration-300 group-hover:translate-x-1">
                      <span>BEGIN TEST</span>
                      <ArrowRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                  
                  {/* Mobile Arrow */}
                  <div className="sm:hidden flex-shrink-0 relative z-10">
                    <ArrowRight className="text-[#F59E0B]" size={20} strokeWidth={3} />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#94A3B8] text-sm font-medium">
              Take your time. There are no wrong answers.
            </p>
          </motion.div>
        </main>
      </div>

      {/* Very subtle blobs to match the premium feel without being distracting */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-purple-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}
