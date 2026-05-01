import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CheckSquare, BookOpen, Compass, Lightbulb, Info, FileText, Target, HeartPulse, Smile, Moon, Sparkles, Activity, Heart, Users2, Star, Shield } from "lucide-react";

interface ResourceCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

interface TrackerCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

interface GuideCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

const resources: ResourceCard[] = [
  { id: "assessments", icon: CheckSquare, label: "Assessments", bgColor: "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)", link: "/lgbtq-assessments" },
  { id: "stories", icon: BookOpen, label: "Stories", bgColor: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)", link: "/content/lgbtq-stories" },
  { id: "identity", icon: Compass, label: "Identity Exploration", bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "/identity-exploration" },
  { id: "tips", icon: Lightbulb, label: "Tips", bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/lgbtq-tips" },
  { id: "myths", icon: Info, label: "Myths & Facts", bgColor: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", link: "/lgbtq-myths-facts" },
  { id: "articles", icon: FileText, label: "Articles", bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "/lgbtq-articles" },
];

const trackers: TrackerCard[] = [
  { id: "identity-journey", icon: Target, label: "Identity Journey", bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "/identity-reflection" },
  { id: "daily-care", icon: HeartPulse, label: "Daily Care", bgColor: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", link: "/trackers/daily-care" },
  { id: "mood", icon: Smile, label: "Mood", bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/trackers/mood" },
  { id: "sleep", icon: Moon, label: "Sleep", bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/trackers/sleep" },
  { id: "gratitude", icon: Sparkles, label: "Gratitude", bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/trackers/gratitude" },
  { id: "vibe", icon: Activity, label: "Vibe", bgColor: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", link: "/trackers/vibe" },
];

const guides: GuideCard[] = [
  { id: "lesbian", icon: Heart, label: "Lesbian", bgColor: "linear-gradient(135deg, #FF3D00 0%, #FF9100 100%)", link: "/lesbian-guide" },
  { id: "gay", icon: Users2, label: "Gay", bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/gay-guide" },
  { id: "bisexual", icon: Star, label: "Bi-sexual", bgColor: "linear-gradient(135deg, #D946EF 0%, #8B5CF6 50%, #3B82F6 100%)", link: "/bisexual-guide" },
  { id: "trans", icon: Shield, label: "Trans", bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/trans-guide" },
];

export function LGBTQSelfCare() {
  const navigate = useNavigate();

  const handleCardClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('http')) {
        window.location.href = link;
      } else {
        navigate(link);
      }
    }
  };

  return (
    <div 
      className="activity-root" 
      style={{ background: 'linear-gradient(135deg, #FDFCFE 0%, #F8F7FF 50%, #FFF5F7 100%)' }}
    >
      {/* Decorative Background Blobs */}
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-purple-200/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-32 -left-32 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50/10 pointer-events-none z-0"></div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10 w-full">
        <main className="activity-container-lg py-4 md:py-8 pt-[72px] md:pt-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                navigate(-1);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100 mb-6"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>

            <div className="relative">
              <div className="absolute -left-2 top-0 w-1 h-14 bg-gradient-to-b from-[#EC4899] via-[#A855F7] to-[#3B82F6] rounded-full"></div>
              <div className="pl-5">
                <h1 className="text-3xl md:text-4xl font-bold text-[#020817] mb-2 bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                  LGBTQ+ Self-Care
                </h1>
                <p className="text-[#64748B] text-base md:text-lg">
                  Explore resources, track your journey, and embrace your authentic self
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#14B8A6] to-[#0D9488]"></div>
              <div>
                <h2 className="text-xl font-bold text-[#020817] tracking-tight">Resources</h2>
                <p className="text-[#64748B] text-xs font-medium">Essential tools and information</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <motion.button
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + 0.05 * index, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -6, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(resource.link)}
                    className="bg-white/90 backdrop-blur-md rounded-[28px] p-4 flex flex-col items-center gap-2 shadow-md hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-white/50"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: resource.bgColor }}
                    >
                      <IconComponent className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#020817] text-center leading-tight relative z-10">
                      {resource.label}
                    </span>
                    <div className="w-full h-0.5 rounded-full relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: resource.bgColor }}
                    ></div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Trackers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#A855F7] to-[#9333EA]"></div>
              <div>
                <h2 className="text-xl font-bold text-[#020817] tracking-tight">Trackers</h2>
                <p className="text-[#64748B] text-xs font-medium">Monitor your wellness journey</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {trackers.map((tracker, index) => {
                const IconComponent = tracker.icon;
                return (
                  <motion.button
                    key={tracker.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.05 * index, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -6, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(tracker.link)}
                    className="bg-white/90 backdrop-blur-md rounded-[28px] p-4 flex flex-col items-center gap-2 shadow-md hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-white/50"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: tracker.bgColor }}
                    >
                      <IconComponent className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#020817] text-center leading-tight relative z-10">
                      {tracker.label}
                    </span>
                    <div className="w-full h-0.5 rounded-full relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: tracker.bgColor }}
                    ></div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Wellness Guides Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#EC4899] to-[#D946EF]"></div>
              <div>
                <h2 className="text-xl font-bold text-[#020817] tracking-tight">Wellness Guides</h2>
                <p className="text-[#64748B] text-xs font-medium">Identity-specific support and resources</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guides.map((guide, index) => {
                const IconComponent = guide.icon;
                return (
                  <motion.button
                    key={guide.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + 0.08 * index, type: "spring", stiffness: 180 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(guide.link)}
                    className="bg-white/90 backdrop-blur-md rounded-[32px] p-5 flex flex-col items-center gap-3 shadow-md hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-white/50"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                      style={{ background: guide.bgColor }}
                    >
                      <IconComponent className="text-white" size={28} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-[#020817] text-center leading-tight relative z-10">
                      {guide.label}
                    </span>
                    <div className="w-full h-0.5 rounded-full relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: guide.bgColor }}
                    ></div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-80 h-80 bg-gradient-to-br from-[#EC4899]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#A855F7]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
    </div>
  );
}
