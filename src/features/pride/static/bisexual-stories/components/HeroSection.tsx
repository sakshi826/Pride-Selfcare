import { useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onReadStories: () => void;
}

const HeroSection = ({ onReadStories }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("opacity-100");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 transition-opacity duration-700 opacity-0"
    >
      {/* Bi flag bar */}
      <div className="absolute top-0 left-0 right-0 flex h-2">
        <div className="h-full" style={{ width: "38%", backgroundColor: "#d1006c" }} />
        <div className="h-full" style={{ width: "24%", backgroundColor: "#6b35b8" }} />
        <div className="h-full" style={{ width: "38%", backgroundColor: "#0050a0" }} />
      </div>

      {/* Animated orbs */}
      <div
        className="absolute w-[340px] h-[340px] rounded-full opacity-20 blur-[100px] animate-orb-1"
        style={{ backgroundColor: "#d1006c", top: "15%", left: "10%" }}
      />
      <div
        className="absolute w-[280px] h-[280px] rounded-full opacity-20 blur-[100px] animate-orb-2"
        style={{ backgroundColor: "#6b35b8", top: "40%", right: "15%" }}
      />
      <div
        className="absolute w-[320px] h-[320px] rounded-full opacity-20 blur-[100px] animate-orb-3"
        style={{ backgroundColor: "#0050a0", bottom: "10%", left: "30%" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-2 text-sm font-medium tracking-wide"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#d1006c" }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#6b35b8" }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#0050a0" }} />
          <span className="ml-1 text-foreground">Bisexual Voices</span>
        </div>

        {/* Title */}
        <h1
          className="animate-fade-up font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight"
          style={{ animationDelay: "0.25s" }}
        >
          Real Stories of{" "}
          <em className="text-bi-purple">Bisexual People</em>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up text-muted-foreground text-lg sm:text-xl max-w-lg leading-relaxed"
          style={{ animationDelay: "0.4s" }}
        >
          Eight people share what it means to live, love, and belong as bisexual — in their own words.
        </p>

        {/* Quote */}
        <p
          className="animate-fade-up text-muted-foreground italic text-base max-w-md"
          style={{ animationDelay: "0.5s" }}
        >
          "Bisexuality is not a waiting room. It is a destination."
        </p>

        {/* CTA */}
        <button
          onClick={onReadStories}
          className="animate-fade-up relative mt-2 rounded-lg px-8 py-3.5 text-base font-semibold transition-all duration-200 active:scale-[0.97] hover:translate-y-[-1px]"
          style={{
            animationDelay: "0.6s",
            backgroundColor: "#6b35b8",
            color: "#fff",
            boxShadow: "4px 4px 0 0 #4a1f8a",
          }}
        >
          Read the Stories
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
