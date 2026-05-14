import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrideActivityHeader } from "../../features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "../../features/pride/components/PrideFloatingOrbs";

const slugMetadata: Record<string, { title: string; subtitle: string }> = {
  "celebrate-wlw": { title: "Celebrate WLW", subtitle: "Honoring Women Loving Women" },
  "coming-out-practice": { title: "Coming Out Practice", subtitle: "Prepare for your journey" },
  "confidence-mirror": { title: "Confidence Mirror", subtitle: "Building self-assurance" },
  "when-they-react": { title: "Handle Reactions", subtitle: "Navigating others' responses" },
  "gay-and-proud": { title: "Gay And Proud", subtitle: "Embracing your identity" },
  "gay-coming-out": { title: "Gay Coming Out", subtitle: "Resources for your path" },
  "dealing-with-homophobia": { title: "Dealing with Homophobia", subtitle: "Support and strategies" },
  "lesbian-power-booster": { title: "Lesbian Power Booster", subtitle: "Empowering your voice" },
  "real-stories-of-lesbian-women": { title: "Lesbian Stories", subtitle: "Voices from the community" },
  "masculinity-on-your-own-terms": { title: "Authentic Masculinity", subtitle: "Defining your own path" },
  "lgbtq-stories": { title: "LGBTQ+ Stories", subtitle: "Real journeys of finding yourself" },
};

export function PrideStaticViewer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("guides");
  
  // Ensure we use a path relative to the public root, considering the basename
  const src = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/static/pride/${slug}/index.html?lang=${i18n.language}`;
  
  const metadata = slug ? slugMetadata[slug] : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFE] relative overflow-hidden">
      <PrideFloatingOrbs />
      
      {/* Consistent Header */}
      <div className="relative z-50 bg-white/40 backdrop-blur-md border-b border-white/20">
        <div className="activity-container-lg py-4">
          <PrideActivityHeader 
            title={metadata ? t(metadata.title) : t("Pride Resources")} 
            subtitle={metadata ? t(metadata.subtitle) : t("Explore and grow")}
            className="mb-0"
          />
        </div>
      </div>

      <div className="flex-1 w-full relative z-10">
        <iframe
          src={src}
          title={`PrideMantra ${slug}`}
          className="w-full h-full absolute inset-0"
          style={{
            border: "none",
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
