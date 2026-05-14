import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";

export function LGBTQMythsFacts() {
  const navigate = useNavigate();
  const { t } = useTranslation("hub");
  
  const mythsFacts = [
    {
      id: "phase",
      myth: t("Being LGBTQ+ is just a phase."),
      fact: t("Sexual orientation and gender identity are enduring, not temporary."),
    },
    {
      id: "mental-illness",
      myth: t("Being gay is a mental illness."),
      fact: t("Major health bodies worldwide declassified this decades ago."),
    },
    {
      id: "bisexual",
      myth: t("Bisexual people are just confused or going through a phase."),
      fact: t("Bisexuality is a real, stable, and well-documented orientation."),
    },
    {
      id: "parenting",
      myth: t("Same-sex couples can't raise healthy, happy children."),
      fact: t("Decades of research show children thrive with loving parents regardless of gender."),
    },
    {
      id: "trans-confusion",
      myth: t("Trans people are just confused about their gender."),
      fact: t("Gender identity is deeply held — trans identities are consistent over time."),
    },
    {
      id: "western-import",
      myth: t("LGBTQ+ identities are a Western import."),
      fact: t("Diverse gender and sexuality expressions have existed across all cultures through history."),
    },
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
    <div className="activity-root bg-[#F9F6FE] py-8">
      <PrideFloatingOrbs />
      
      <main className="activity-container-lg relative">
        <PrideActivityHeader 
          title={t("Myths & Facts")} 
          subtitle={t("Debunking misconceptions about the LGBTQ+ community")}
          onBack={() => navigate('/lgbtq-hub' + window.location.search)}
          className="mb-8"
        />

        {/* Myths & Facts List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 mb-12"
        >
          {mythsFacts.map((mythFact) => (
            <motion.button
              key={mythFact.id}
              variants={item}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate(`/lgbtq-myth/${mythFact.id}` + window.location.search)}
              className="w-full bg-white/80 backdrop-blur-md rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-white group text-left"
            >
              <div className="bg-red-50/50 p-6 border-b border-red-100 group-hover:bg-red-100/50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
                    {t("MYTH")}
                  </span>
                  <p className="flex-1 text-red-900 text-lg italic leading-relaxed pt-0.5">
                    {mythFact.myth}
                  </p>
                </div>
              </div>

              <div className="p-6 flex items-start gap-4 group-hover:bg-white/90 transition-colors">
                <div className="flex-1">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {mythFact.fact}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                  {t("Fact ✓")}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="max-w-2xl mx-auto px-6 py-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
            <p className="text-gray-500 text-sm leading-relaxed italic">
              {t("These facts are grounded in decades of research by medical, psychological, and social science communities worldwide.")}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
