import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronLeft, CheckSquare, BookOpen, Compass, Lightbulb, Info, FileText, Target, HeartPulse, Smile, Moon, Sparkles, Activity, Heart, Users2, Star, Shield, Languages, Check } from "lucide-react";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";

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
  const { t, i18n } = useTranslation("hub");

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
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Resources")}</h2>
                <p className="text-sm text-muted-foreground">{t("Essential tools and information")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {resources.map((resource) => (
                <motion.button
                  key={resource.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(resource.link)}
                  className="group relative bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center gap-4 transition-all hover:shadow-2xl hover:border-pride-purple/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`w-14 h-14 rounded-2xl ${resource.bgColor} flex items-center justify-center text-white shadow-lg relative z-10`}>
                    <resource.icon size={28} />
                  </div>
                  <span className="text-sm font-bold text-foreground relative z-10">{t(resource.label)}</span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Trackers Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 rounded-full bg-pride-purple shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Trackers")}</h2>
                <p className="text-sm text-muted-foreground">{t("Monitor your wellness journey")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {trackers.map((tracker) => (
                <motion.button
                  key={tracker.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(tracker.link)}
                  className="group relative bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center gap-4 transition-all hover:shadow-2xl hover:border-pride-purple/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`w-14 h-14 rounded-2xl ${tracker.bgColor} flex items-center justify-center text-white shadow-lg relative z-10`}>
                    <tracker.icon size={28} />
                  </div>
                  <span className="text-sm font-bold text-foreground relative z-10">{t(tracker.label)}</span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Wellness Guides Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t("Wellness Guides")}</h2>
                <p className="text-sm text-muted-foreground">{t("Identity-specific support and resources")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {guides.map((guide) => (
                <motion.button
                  key={guide.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(guide.link)}
                  className="group relative bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center gap-6 transition-all hover:shadow-2xl hover:border-pride-purple/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`w-16 h-16 rounded-3xl ${guide.bgColor} flex items-center justify-center text-white shadow-lg relative z-10`}>
                    <guide.icon size={32} />
                  </div>
                  <span className="text-lg font-bold text-foreground relative z-10">
                    {t("{{label}} Guide", { label: t(guide.label) })}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
