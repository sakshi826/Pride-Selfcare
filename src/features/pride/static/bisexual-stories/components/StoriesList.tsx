import { ArrowLeft } from "lucide-react";
import { stories, type Story } from "../data/stories";

interface StoriesListProps {
  onSelectStory: (index: number) => void;
  onBack: () => void;
}

const StoriesList = ({ onSelectStory, onBack }: StoriesListProps) => {
  return (
    <section className="min-h-screen px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[680px]">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97] animate-fade-up"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <h2
          className="font-serif-display text-3xl sm:text-4xl text-center mb-4 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Their Stories
        </h2>
        <p
          className="text-center text-muted-foreground mb-12 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Click a story to read more
        </p>

        <div className="flex flex-col gap-4">
          {stories.map((s, i) => (
            <StoryCard key={s.name} story={s} index={i} onClick={() => onSelectStory(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

function StoryCard({ story, index, onClick }: { story: Story; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="animate-fade-up group w-full text-left rounded-xl bg-card border border-border overflow-hidden flex items-stretch transition-all duration-300 hover:translate-x-1 hover:shadow-lg active:scale-[0.98] cursor-pointer"
      style={{ animationDelay: `${0.15 + index * 0.07}s` }}
    >
      {/* Color stripe */}
      <div className="w-1.5 shrink-0" style={{ backgroundColor: story.color.stripe }} />

      <div className="flex items-center gap-4 p-4 sm:p-5 flex-1 min-w-0">
        {/* Avatar */}
        <img
          src={story.photo}
          alt={story.name}
          className="w-[42px] h-[42px] rounded-full object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <span className="font-semibold text-foreground text-[15px]">
              {story.name}, {story.age}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: story.color.tagBg, color: story.color.tagText }}
            >
              {story.identity}
            </span>
          </div>
          <p className="text-muted-foreground text-sm italic leading-snug line-clamp-2">
            "{story.quote}"
          </p>
        </div>
      </div>
    </button>
  );
}

export default StoriesList;
