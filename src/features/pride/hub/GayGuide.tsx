import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Lightbulb, MessageSquare, TrendingUp, BookOpen, Smile, User, Users, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";

interface InteractiveTool {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

export function GayGuide() {
  const navigate = useNavigate();
  const { t } = useTranslation("guides");
  const [expandedSection, setExpandedSection] = useState<'tips' | 'myths' | null>(null);

  const interactiveTools: InteractiveTool[] = [
    { id: "celebrate-identity", icon: Sparkles, label: t("Celebrate your Identity"), bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/content/gay-and-proud" },
    { id: "confidence-mirror", icon: Smile, label: t("Confidence Mirror"), bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/content/confidence-mirror" },
    { id: "masculinity", icon: Sparkles, label: t("Masculinity on your own terms"), bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/content/masculinity-on-your-own-terms" },
    { id: "coming-out", icon: Users, label: t("Coming out"), bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "/content/gay-coming-out" },
    { id: "handle-reactions", icon: Heart, label: t("Handle Reactions of Others"), bgColor: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", link: "/content/when-they-react" },
    { id: "dealing-homophobia", icon: BookOpen, label: t("Dealing with Homophobia"), bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "/content/dealing-with-homophobia" },
  ];

  interface Tip {
    id: string;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }

  const tips: Tip[] = [
    {
      id: "embrace-authentic-self",
      title: t("Embrace Your Authentic Self"),
      description: t("Allow yourself to exist without filtering or hiding who you are. Authenticity builds confidence and reduces internal stress over time."),
      bgColor: "#D1F4E0",
      iconColor: "#059669"
    },
    {
      id: "find-affirming-spaces",
      title: t("Find Affirming Spaces"),
      description: t("Engage in communities where you feel accepted and celebrated. Safe spaces help build belonging and emotional security."),
      bgColor: "#D4E4F7",
      iconColor: "#2563EB"
    },
    {
      id: "manage-external-negativity",
      title: t("Manage External Negativity"),
      description: t("Limit exposure to homophobic environments or content. Protecting your mental space is essential for long-term well-being."),
      bgColor: "#FFE0EC",
      iconColor: "#DB2777"
    },
    {
      id: "prioritize-emotional-expression",
      title: t("Prioritize Emotional Expression"),
      description: t("Talk about your feelings with trusted people or through journaling. Emotional openness strengthens mental health."),
      bgColor: "#FFF4D6",
      iconColor: "#D97706"
    }
  ];

  interface Myth {
    id: string;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }

  const myths: Myth[] = [
    {
      id: "lifestyle-choice",
      title: t("Myth: Being Gay is a Lifestyle Choice"),
      description: t("Sexual orientation is not a choice but an inherent part of identity."),
      bgColor: "#FFE0EC",
      iconColor: "#DB2777"
    },
    {
      id: "less-serious",
      title: t("Myth: Gay Relationships Are Less Serious"),
      description: t("Gay relationships are just as committed and meaningful as any other."),
      bgColor: "#FFF4D6",
      iconColor: "#D97706"
    },
    {
      id: "certain-way",
      title: t("Myth: All Gay Men Act a Certain Way"),
      description: t("There is no single personality or behavior that defines being gay."),
      bgColor: "#D4E4F7",
      iconColor: "#2563EB"
    },
    {
      id: "always-confident",
      title: t("Myth: Gay People Are Always Confident"),
      description: t("Many still face internal struggles despite outward confidence."),
      bgColor: "#FFE0EC",
      iconColor: "#DB2777"
    }
  ];

  const handleToolClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else {
        navigate(link);
      }
    }
  };

  return (
    <div className="activity-root bg-[#F0F9FF] py-8">
      <PrideFloatingOrbs />
      
      <main className="activity-container-lg relative">
        <PrideActivityHeader 
          title={t("Gay Guide")} 
          subtitle={t("Resources and support for your journey")}
          onBack={() => navigate('/lgbtq-hub' + window.location.search)}
        />

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')}
            className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white hover:shadow-xl transition-all duration-300 text-left flex items-center gap-5 shadow-sm group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#A855F7] flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-100">
              <Lightbulb className="text-white" size={28} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#020817] mb-1">{t("Tips")}</h2>
              <p className="text-[#64748B] text-sm font-medium">{t("Daily wisdom for your wellbeing")}</p>
            </div>
            <ChevronDown
              className={`text-[#64748B] transition-all duration-300 flex-shrink-0 ${
                expandedSection === 'tips' ? "rotate-180" : ""
              }`}
              size={24}
              strokeWidth={2.5}
            />
          </button>
          
          {expandedSection === 'tips' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4 px-2"
            >
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl p-6 border border-white bg-white/60 backdrop-blur-sm shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="text-[#A855F7]" size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-[#020817] leading-tight pt-1">{tip.title}</h3>
                  </div>
                  <p className="text-[#64748B] leading-relaxed text-sm ml-14">
                    {tip.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Myths Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === 'myths' ? null : 'myths')}
            className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white hover:shadow-xl transition-all duration-300 text-left flex items-center gap-5 shadow-sm group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-100">
              <MessageSquare className="text-white" size={28} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#020817] mb-1">{t("Myths")}</h2>
              <p className="text-[#64748B] text-sm font-medium">{t("Debunking harmful stereotypes")}</p>
            </div>
            <ChevronDown
              className={`text-[#64748B] transition-all duration-300 flex-shrink-0 ${
                expandedSection === 'myths' ? "rotate-180" : ""
              }`}
              size={24}
              strokeWidth={2.5}
            />
          </button>

          {expandedSection === 'myths' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4 px-2"
            >
              {myths.map((myth, index) => (
                <motion.div
                  key={myth.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl p-6 border border-white bg-white/60 backdrop-blur-sm shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="text-[#3B82F6]" size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-[#020817] leading-tight pt-1">{myth.title}</h3>
                  </div>
                  <p className="text-[#64748B] leading-relaxed text-sm ml-14">
                    {myth.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Interactive Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-8 ml-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316] flex items-center justify-center shadow-lg shadow-orange-100">
              <TrendingUp className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#020817]">{t("Interactive Tools")}</h2>
              <p className="text-[#64748B] text-sm font-medium">{t("Exercises for recovery and wellness")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {interactiveTools.map((tool, index) => {
              const IconComponent = tool.icon;
              const bgColors = ['#FFF4ED', '#EFF6FF', '#F0FDF4', '#FAF5FF', '#FFF1F2', '#F5F3FF'];
              const iconColors = ['#F97316', '#3B82F6', '#10B981', '#A855F7', '#EC4899', '#8B5CF6'];
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + 0.05 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToolClick(tool.link)}
                  className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/0 via-white/40 to-white/0" />
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: bgColors[index] }}
                  >
                    <IconComponent style={{ color: iconColors[index] }} size={32} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-bold text-[#020817] text-center leading-tight relative z-10">
                    {tool.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
