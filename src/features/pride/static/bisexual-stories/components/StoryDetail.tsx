import { ArrowLeft } from "lucide-react";
import type { Story } from "../data/stories";

interface StoryDetailProps {
  story: Story;
  onBack: () => void;
}

const StoryDetail = ({ story, onBack }: StoryDetailProps) => {
  const c = story.color;

  return (
    <article className="min-h-screen pb-20">
      {/* Bi flag gradient band */}
      <div className="h-2 w-full flex">
        <div className="h-full" style={{ width: "38%", backgroundColor: "#d1006c" }} />
        <div className="h-full" style={{ width: "24%", backgroundColor: "#6b35b8" }} />
        <div className="h-full" style={{ width: "38%", backgroundColor: "#0050a0" }} />
      </div>

      <div className="mx-auto max-w-[680px] px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mt-8 mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all stories
        </button>

        {/* Photo */}
        <div className="animate-fade-up rounded-2xl overflow-hidden mb-8 flex items-center justify-center bg-secondary/40 p-2 sm:p-3">
          <img
            src={story.photo}
            alt={story.name}
            className="w-full max-h-[340px] object-contain"
          />
        </div>

        {/* Name + badge */}
        <div className="animate-fade-up flex items-center gap-3 mb-8" style={{ animationDelay: "0.1s" }}>
          <h1 className="font-serif-display text-3xl sm:text-4xl">
            {story.name}, {story.age}
          </h1>
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: c.tagBg, color: c.tagText }}
          >
            {story.identity}
          </span>
        </div>

        {/* Body paragraphs */}
        <div className="space-y-6 mb-12">
          {story.story.map((p, i) => (
            <p
              key={i}
              className="animate-fade-up text-foreground text-[16px] sm:text-[17px] leading-[1.8] font-sans"
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <blockquote
          className="animate-fade-up rounded-xl p-6 sm:p-8 mb-10 border-l-4 italic font-serif-display text-xl sm:text-2xl leading-snug"
          style={{
            animationDelay: "0.5s",
            backgroundColor: c.hlBg,
            borderLeftColor: c.border,
            color: c.tagText,
          }}
        >
          "{story.highlight}"
        </blockquote>

        {/* Takeaway box */}
        <div
          className="animate-fade-up rounded-xl p-6 sm:p-8 mb-12 border"
          style={{
            animationDelay: "0.55s",
            backgroundColor: c.takeBg,
            borderColor: c.border + "40",
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: c.tagText }}
          >
            Something to sit with
          </p>
          <p className="text-foreground leading-relaxed text-[15px]">
            {story.takeaway}
          </p>
        </div>

        {/* Bottom back button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] border border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all stories
          </button>
        </div>
      </div>
    </article>
  );
};

export default StoryDetail;
