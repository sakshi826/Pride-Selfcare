import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, CheckSquare, BookOpen, Compass, Lightbulb, Info, FileText, Target, HeartPulse, Smile, Moon, Sparkles, Activity, Heart, Users2, Star, Shield } from "lucide-react";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

interface ResourceCard {
  id: string;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  link: string | null;
}

interface TrackerCard {
  id: string;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  link: string | null;
}

interface GuideCard {
  id: string;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  link: string | null;
}

const t = (s: string) => s;

const resources: ResourceCard[] = [
  { id: "assessments", icon: CheckSquare, label: t("Assessments"), bgColor: "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)", link: "/lgbtq-assessments" },
  { id: "stories", icon: BookOpen, label: t("Stories"), bgColor: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)", link: "/content/lgbtq-stories" },
  { id: "identity", icon: Compass, label: t("Identity Exploration"), bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "/identity-exploration" },
  { id: "tips", icon: Lightbulb, label: t("Tips"), bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/lgbtq-tips" },
  { id: "myths", icon: Info, label: t("Myths & Facts"), bgColor: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", link: "/lgbtq-myths-facts" },
  { id: "articles", icon: FileText, label: t("Articles"), bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "/lgbtq-articles" },
];

const trackers: TrackerCard[] = [
  { id: "identity-journey", icon: Target, label: t("Identity Journey"), bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "/identity-journey" },
  { id: "daily-care", icon: HeartPulse, label: t("Daily Care"), bgColor: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", link: "/trackers/daily-care" },
  { id: "mood", icon: Smile, label: t("Mood"), bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/trackers/mood" },
  { id: "sleep", icon: Moon, label: t("Sleep"), bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/trackers/sleep" },
  { id: "gratitude", icon: Sparkles, label: t("Gratitude"), bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/trackers/gratitude" },
  { id: "vibe", icon: Activity, label: t("Vibe"), bgColor: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", link: "/trackers/vibe" },
];

const guides: GuideCard[] = [
  { id: "lesbian", icon: Heart, label: t("Lesbian"), bgColor: "linear-gradient(135deg, #FF3D00 0%, #FF9100 100%)", link: "/lesbian-guide" },
  { id: "gay", icon: Users2, label: t("Gay"), bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/gay-guide" },
  { id: "bisexual", icon: Star, label: t("Bi-sexual"), bgColor: "linear-gradient(135deg, #D946EF 0%, #8B5CF6 50%, #3B82F6 100%)", link: "/bisexual-guide" },
  { id: "trans", icon: Shield, label: t("Trans"), bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/trans-guide" },
];

export function LGBTQSelfCare() {
  const navigate = useNavigate();
  const { t } = useTranslation("hub");

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
    <div className="activity-root">
      <PrideFloatingOrbs />

      <div className="flex-1 flex flex-col min-w-0 relative z-10 w-full">
        <main className="activity-container-lg py-8 pt-[72px] md:pt-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                window.parent.postMessage("exit_activity", "*");
                navigate(-1);
              }}
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-foreground border border-white/10 shadow-lg mb-8"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                {t("LGBTQ+")} <span className="text-pride-purple text-glow">{t("Self-Care")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("Explore resources, track your journey, and embrace your authentic self in a safe space.")}
              </p>
            </div>
          </motion.div>

          {/* Resources Section */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 rounded-full bg-pride-green shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Resources")}</h2>
                <p className="text-sm text-muted-foreground font-medium">{t("Essential tools and information")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <motion.button
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(resource.link)}
                    className="premium-card p-6 flex flex-col items-center gap-4 group transition-all duration-300 hover:border-pride-purple/20"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"
                      style={{ background: resource.bgColor }}
                    >
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <span className="text-sm font-black text-foreground text-center leading-tight">
                      {t(resource.label)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Trackers Section */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 rounded-full bg-pride-purple shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Trackers")}</h2>
                <p className="text-sm text-muted-foreground font-medium">{t("Monitor your wellness journey")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trackers.map((tracker, index) => {
                const IconComponent = tracker.icon;
                return (
                  <motion.button
                    key={tracker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(tracker.link)}
                    className="premium-card p-6 flex flex-col items-center gap-4 group transition-all duration-300 hover:border-pride-blue/20"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"
                      style={{ background: tracker.bgColor }}
                    >
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <span className="text-sm font-black text-foreground text-center leading-tight">
                      {t(tracker.label)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Wellness Guides Section */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 rounded-full bg-pride-red shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Wellness Guides")}</h2>
                <p className="text-sm text-muted-foreground font-medium">{t("Identity-specific support and resources")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {guides.map((guide, index) => {
                const IconComponent = guide.icon;
                return (
                  <motion.button
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(guide.link)}
                    className="premium-card p-8 flex flex-col items-center gap-6 group transition-all duration-300 hover:border-pride-red/20"
                  >
                    <div
                      className="w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      style={{ background: guide.bgColor }}
                    >
                      <IconComponent className="text-white" size={36} />
                    </div>
                    <span className="text-lg font-black text-foreground text-center leading-tight">
                      {t("{{label}} Guide", { label: t(guide.label) })}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
