import { useState, useCallback } from "react";
import HeroSection from "../components/HeroSection";
import StoriesList from "../components/StoriesList";
import StoryDetail from "../components/StoryDetail";
import { stories } from "../data/stories";

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
    <div
      className="min-h-screen transition-opacity duration-300"
      style={{
        backgroundColor: "#fdf8ff",
        opacity: transitioning ? 0 : 1,
      }}
    >
      {view === "hero" && <HeroSection onReadStories={goToList} />}
      {view === "list" && <StoriesList onSelectStory={goToDetail} onBack={goBackToHero} />}
      {view === "detail" && (
        <StoryDetail story={stories[selectedIndex]} onBack={goToList} />
      )}
    </div>
  );
};

export default Index;
