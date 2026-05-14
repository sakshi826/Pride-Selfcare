import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, User, Sparkles, ShieldAlert, Search, Tv, BookOpen, Users, ShieldX, Wind, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";

export function LGBTQAssessments() {
  const navigate = useNavigate();
  const { t } = useTranslation("hub");
  
  const assessments = [
    { id: "aromantic", icon: Heart, iconColor: "#F472B6", iconBg: "bg-pink-50", title: t("Am I Aromantic?"), description: t("Explore your experiences with romantic attraction and where you might fall on the spectrum."), link: "https://forms.mantracare.org/am-i-aromantic/" },
    { id: "cisgender", icon: User, iconColor: "#3B82F6", iconBg: "bg-blue-50", title: t("Am I Cisgender?"), description: t("Reflect on your gender identity and how it relates to the sex you were assigned at birth."), link: "https://forms.mantracare.org/am-i-cisgender/" },
    { id: "gay", icon: Sparkles, iconColor: "#A855F7", iconBg: "bg-purple-50", title: t("Am I Gay?"), description: t("A gentle space to explore your attractions and feelings towards the same gender."), link: "https://forms.mantracare.org/am-i-gay/" },
    { id: "homophobic", icon: ShieldAlert, iconColor: "#EF4444", iconBg: "bg-red-50", title: t("Are You Homophobic?"), description: t("An honest self-reflection tool to identify and unlearn internalized or external biases."), link: "https://forms.mantracare.org/are-you-homophobic/" },
    { id: "community-part", icon: Search, iconColor: "#10B981", iconBg: "bg-emerald-50", title: t("What Part Of The LGBT Community Am I?"), description: t("Discover the diverse labels and identities that might resonate with your journey."), link: "https://forms.mantracare.org/what-part-of-the-lgbt-community-am-i/" },
    { id: "tv-trope", icon: Tv, iconColor: "#F59E0B", iconBg: "bg-amber-50", title: t("Which LGBT Tv Trope Are You?"), description: t("A fun way to see which common (or rare) media representation fits your personality."), link: "https://forms.mantracare.org/which-lgbt-tv-trope-are-you/" },
    { id: "tarot", icon: BookOpen, iconColor: "#6366F1", iconBg: "bg-indigo-50", title: t("Which Queer Tarot Deck Should You Try?"), description: t("Find the perfect artistic and spiritual tool that speaks to your unique queer soul."), link: "https://forms.mantracare.org/which-queer-tarot-deck-should-you-try/" },
    { id: "member-ally", icon: Users, iconColor: "#EC4899", iconBg: "bg-rose-50", title: t("LGBTQ+ Are you a member, ally, enemy?"), description: t("Understand your stance and role within the global movement for equality."), link: "https://forms.mantracare.org/lgbtq-are-you-a-member-ally-enemy/" },
    { id: "transphobic", icon: ShieldX, iconColor: "#475569", iconBg: "bg-slate-100", title: t("Are You Transphobic?"), description: t("Examine your perceptions of gender identity and help build a more inclusive world."), link: "https://forms.mantracare.org/are-you-transphobic/" },
    { id: "dysphoria", icon: Wind, iconColor: "#0EA5E9", iconBg: "bg-sky-50", title: t("Gender Dysphoria"), description: t("Understand the complex feelings of disconnect between your body and gender identity."), link: "https://forms.mantracare.org/gender-dysphoria/" },
    { id: "sexuality", icon: HelpCircle, iconColor: "#8B5CF6", iconBg: "bg-violet-50", title: t("What Am I Sexually?"), description: t("Navigate the beautiful complexity of sexual orientation and find what feels right."), link: "https://forms.mantracare.org/what-am-i-sexually/" },
  ];

  const handleAssessmentClick = (link: string) => {
    if (link.startsWith('http')) {
      window.location.href = link;
    } else if (link !== "#") {
      navigate(link + window.location.search);
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
    <div className="activity-root">
      <PrideFloatingOrbs />
      
      <main className="activity-container-lg py-8 relative z-10">
        <PrideActivityHeader 
          title={t("Self-Discovery Tests")} 
          subtitle={t("Explore your identity through guided assessments")}
          onBack={() => navigate('/lgbtq-hub' + window.location.search)}
          className="mb-12"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {assessments.map((assessment) => {
            const IconComponent = assessment.icon;
            return (
              <motion.button
                key={assessment.id}
                variants={item}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAssessmentClick(assessment.link)}
                className="premium-card p-6 md:p-8 flex items-center gap-6 group transition-all duration-300 hover:border-pride-purple/20"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${assessment.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-sm`}>
                  <IconComponent style={{ color: assessment.iconColor }} size={32} />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                    {assessment.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2 text-lg">
                    {assessment.description}
                  </p>
                </div>

                <div className="flex-shrink-0 hidden sm:flex items-center gap-2 text-pride-purple font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <span>{t("Take Test")}</span>
                  <ArrowRight size={18} />
                </div>
                
                <div className="sm:hidden text-pride-purple">
                  <ArrowRight size={24} />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg font-medium italic opacity-60">
            {t("Take your time. These assessments are tools for reflection, not labels.")}
          </p>
        </div>
      </main>
    </div>
  );
}
