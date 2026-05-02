import { useState, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import StoriesList from "./components/StoriesList";
import StoryDetail from "./components/StoryDetail";
import { stories as storiesData } from "./data/stories";
import { PrideActivityHeader } from "../../components/PrideActivityHeader";
import { PrideFloatingOrbs } from "../../components/PrideFloatingOrbs";

type View = "hero" | "list" | "detail";

const Index = () => {
  const [view, setView] = useState<View>("hero");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const transition = useCallback((to: View, cb?: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      cb?.();
      setView(to);
      window.scrollTo({ top: 0 });
      requestAnimationFrame(() => setTransitioning(false));
    }, 300);
  }, []);

  const goToList = useCallback(() => transition("list"), [transition]);
  const goToDetail = useCallback(
    (i: number) => transition("detail", () => setSelectedIndex(i)),
    [transition]
  );
  const goBackToHero = useCallback(() => transition("hero"), [transition]);

  return (
    <div className="min-h-screen bg-[#FDFCFE] relative overflow-hidden">
      <PrideFloatingOrbs />
      
      <div className="relative z-50 pt-6 pb-2">
        <div className="activity-container-lg">
          <PrideActivityHeader 
            title="LGBTQ+ Stories" 
            subtitle="Real journeys of finding yourself"
            className="mb-0"
          />
        </div>
      </div>

      <div
        className="transition-opacity duration-300 relative z-10"
        style={{
          opacity: transitioning ? 0 : 1,
        }}
      >
        {view === "hero" && <HeroSection onReadStories={goToList} />}
        {view === "list" && <StoriesList onSelectStory={goToDetail} onBack={goBackToHero} />}
        {view === "detail" && (
          <StoryDetail story={storiesData[selectedIndex]} index={selectedIndex} onBack={goToList} />
        )}
      </div>
    </div>
  );
};

export default Index;
