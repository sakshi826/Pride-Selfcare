import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Users, Shield, Leaf, Sparkles, Home, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";

export function LGBTQTips() {
  const navigate = useNavigate();
  const { t } = useTranslation("tips");
  
  const tips = [
    { id: "community", icon: Users, iconBg: "from-[#A855F7] to-[#9333EA]", title: t("Find Your Community"), description: t("Connection with people who get it can ease loneliness and fear."), link: "/find-your-community" },
    { id: "boundaries", icon: Shield, iconBg: "from-[#3B82F6] to-[#2563EB]", title: t("Set Gentle Boundaries"), description: t("Protecting your energy isn't selfish — it's survival."), link: "/set-gentle-boundaries" },
    { id: "identity", icon: Leaf, iconBg: "from-[#10B981] to-[#059669]", title: t("Honor Your Identity"), description: t("Your identity is valid — even when the world questions it."), link: "/honor-your-identity" },
    { id: "self-talk", icon: Sparkles, iconBg: "from-[#F59E0B] to-[#D97706]", title: t("Affirming Self-Talk"), description: t("Replace internalized shame with words that actually fit you."), link: "/affirming-self-talk" },
    { id: "safe-spaces", icon: Home, iconBg: "from-[#EF4444] to-[#DC2626]", title: t("Create Safe Spaces"), description: t("Build small pockets of safety — physical and emotional."), link: "/create-safe-spaces" },
    { id: "grief", icon: Moon, iconBg: "from-[#06B6D4] to-[#0891B2]", title: t("Process Grief & Loss"), description: t("Rejection and coming-out losses are real grief. Tend to them."), link: "/process-grief-loss" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="activity-root bg-[#F5EBFF] py-8">
      <PrideFloatingOrbs />
      
      <main className="activity-container-lg relative">
        <PrideActivityHeader 
          title={t("LGBTQ+ Tips")} 
          subtitle={t("Advice and support for your journey")}
          onBack={() => navigate('/lgbtq-hub')}
          className="mb-8"
        />

        {/* Tips List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 mb-12"
        >
          {tips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <motion.button
                key={tip.id}
                variants={item}
                whileHover={{ scale: 1.01, x: 5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(tip.link)}
                className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-7 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all border border-white group relative overflow-hidden text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${tip.iconBg} rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-105 duration-500`}>
                  <IconComponent className="text-white" size={32} strokeWidth={2} />
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-lg md:text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#A855F7] transition-colors duration-300">
                    {tip.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <div className="relative flex-shrink-0 hidden sm:block">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ChevronRight 
                      className="text-[#A855F7] group-hover:translate-x-1 transition-transform duration-300" 
                      size={24}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50">
            <Sparkles className="text-[#A855F7]" size={20} />
            <p className="text-[#64748B] text-sm md:text-base font-medium italic">
              {t("You're doing great. Take your time.")}
            </p>
            <Sparkles className="text-[#EC4899]" size={20} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
