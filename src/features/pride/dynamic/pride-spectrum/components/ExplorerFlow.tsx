import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import OptionButton from "./OptionButton";
import HistoryScreen from "./HistoryScreen";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";
import { sql } from "@/lib/db";

interface Answers {
  checkin?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
  q8?: string;
  reflection?: string;
  feedback?: string;
}

export interface HistoryEntry {
  date: string;
  answers: Answers;
  result: string[];
}

const TOTAL_SCREENS = 13;

import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

const ExplorerFlow = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showHistory, setShowHistory] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isShareOpen, setIsShareOpen] = useState(false);

  const userId = sessionStorage.getItem("user_id");

  const setAnswer = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const goTo = (target: number) => {
    setDirection(target > screen ? "forward" : "back");
    setTransitioning(true);
    setTimeout(() => {
      setScreen(target);
      setTransitioning(false);
    }, 250);
  };

  const next = () => goTo(screen + 1);
  const prev = () => {
    if (screen === 0) {
      navigate('/lgbtq-hub' + window.location.search);
      return;
    }
    goTo(Math.max(0, screen - 1));
  };

  const generateResult = (): string[] => {
    const lines: string[] = [];

    const q1 = answers.q1;
    const q3 = answers.q3;
    const q5 = answers.q5;

    if (q1 === "Multiple genders" || q3 === "Multiple genders" || q5 === "Multiple genders") {
      lines.push("You may experience attraction toward different kinds of people.");
    } else if (q1 === "Different gender" && q3 === "Different gender" && q5 === "Different gender") {
      lines.push("You may mostly feel attracted to people of a different gender than your own.");
    } else if (q1 === "Same gender" || q3 === "Same gender" || q5 === "Same gender") {
      lines.push("You may feel a stronger sense of attraction toward people of the same gender.");
    } else if (q1 === "I rarely feel this" || answers.q2 === "Rarely") {
      lines.push("You may experience lower levels of physical attraction compared to others.");
    } else {
      lines.push("You may still be figuring out how you experience attraction.");
    }

    if (answers.q7 === "Yes") {
      lines.push("You're still exploring, and that's completely okay.");
    }
    if (answers.q8 === "Yes" || answers.q8 === "A little") {
      lines.push("Your feelings may change over time, and that's completely valid.");
    }
    if (answers.q4 === "Very important") {
      lines.push("You may value emotional connection as an important part of attraction.");
    }
    if (q1 === "It varies" || q3 === "It varies") {
      lines.push("Your experience of attraction may vary depending on the situation.");
    }

    return lines.length > 0 ? lines.slice(0, 3) : ["You may still be figuring out how you experience attraction."];
  };

  const saveToHistory = async () => {
    const result = generateResult();
    const entry: HistoryEntry = {
      date: new Date().toISOString(),
      answers,
      result,
    };
    
    try {
      if (!userId) throw new Error('No user session');
      await sql`
        INSERT INTO pride_spectrum_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(entry)})
      `;
    } catch (err) {
      console.error('Failed to save to cloud:', err);
      const existing = JSON.parse(localStorage.getItem("spectrum-history") || "[]");
      existing.unshift(entry);
      localStorage.setItem("spectrum-history", JSON.stringify(existing));
    }
  };

  if (showHistory) {
    return (
      <div className="activity-root">
        <PrideFloatingOrbs />
        <div className="activity-container-sm py-8 relative z-10">
          <PrideActivityHeader title="Spectrum History" onBack={() => setShowHistory(false)} className="mb-8" />
          <HistoryScreen onBack={() => setShowHistory(false)} />
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 0:
        return (
          <ScreenWrapper>
            <div className="premium-card p-10 md:p-12 text-center space-y-10">
              <div className="w-24 h-24 bg-pride-purple/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-5xl">🌈</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Sexuality Spectrum Explorer</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Explore your attraction patterns in a safe, private, and non-judgmental space.
                </p>
              </div>
              <div className="space-y-4">
                <button onClick={next} className="btn-primary w-full h-14 text-lg font-bold shadow-xl">Start Explorer</button>
                <button onClick={() => setShowHistory(true)} className="btn-secondary w-full h-14 font-bold">View My Journey</button>
              </div>
            </div>
          </ScreenWrapper>
        );

      case 1:
        return (
          <ScreenWrapper>
            <div className="premium-card p-10 md:p-12 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">About this activity</p>
                <h2 className="text-3xl font-bold text-foreground">Setting the Space</h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed justified-text">
                <p>
                  This activity is here to help you explore your patterns of attraction—emotional, romantic, and physical.
                </p>
                <p>
                  There are no right or wrong answers. This is simply a space to reflect on what feels true for you right now.
                </p>
                <p>
                  You can skip any question or stop at any time. Your journey is uniquely yours.
                </p>
              </div>
              
              <div className="premium-card p-6 border-pride-blue/20 bg-pride-blue/5">
                <p className="text-pride-blue font-bold italic text-center">
                  "It's okay if your feelings are still evolving or unclear. Clarity comes with time."
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <button onClick={next} className="btn-primary w-full h-14 text-lg font-bold">Continue</button>
                <button onClick={prev} className="btn-ghost w-full h-12 text-muted-foreground font-bold">Go Back</button>
              </div>
            </div>
          </ScreenWrapper>
        );

      case 2:
        return (
          <QuestionScreen
            title="How are you feeling right now?"
            options={["Okay", "Unsure", "A bit overwhelmed"]}
            selected={answers.checkin}
            onSelect={(v) => setAnswer("checkin", v)}
            onNext={next}
            helperText={answers.checkin === "A bit overwhelmed" ? "Take your time. You can skip questions whenever you need." : undefined}
          />
        );

      case 3:
        return (
          <QuestionScreen
            title="Who do you feel physically attracted to?"
            category="Physical Attraction"
            categoryColor="pride-red"
            options={["Different gender", "Same gender", "Multiple genders", "I rarely feel this", "Not sure"]}
            selected={answers.q1}
            onSelect={(v) => setAnswer("q1", v)}
            onNext={next}
            showSkip
          />
        );

      case 4:
        return (
          <QuestionScreen
            title="How often do you experience physical attraction?"
            category="Physical Attraction"
            categoryColor="pride-red"
            options={["Often", "Sometimes", "Rarely", "Not sure"]}
            selected={answers.q2}
            onSelect={(v) => setAnswer("q2", v)}
            onNext={next}
            showSkip
          />
        );

      case 5:
        return (
          <QuestionScreen
            title="Who do you feel emotionally connected to?"
            category="Emotional Connection"
            categoryColor="pride-orange"
            options={["Different gender", "Same gender", "Multiple genders", "It varies", "Not sure"]}
            selected={answers.q3}
            onSelect={(v) => setAnswer("q3", v)}
            onNext={next}
            showSkip
          />
        );

      case 6:
        return (
          <QuestionScreen
            title="How important is emotional connection in attraction for you?"
            category="Emotional Connection"
            categoryColor="pride-orange"
            options={["Very important", "Somewhat important", "Not very important", "Not sure"]}
            selected={answers.q4}
            onSelect={(v) => setAnswer("q4", v)}
            onNext={next}
            showSkip
          />
        );

      case 7:
        return (
          <QuestionScreen
            title="Who do you imagine romantic relationships with?"
            category="Romantic Attraction"
            categoryColor="pride-yellow"
            options={["Different gender", "Same gender", "Multiple genders", "Not sure"]}
            selected={answers.q5}
            onSelect={(v) => setAnswer("q5", v)}
            onNext={next}
            showSkip
          />
        );

      case 8:
        return (
          <QuestionScreen
            title="How often do you develop romantic feelings?"
            category="Romantic Attraction"
            categoryColor="pride-yellow"
            options={["Often", "Sometimes", "Rarely", "Not sure"]}
            selected={answers.q6}
            onSelect={(v) => setAnswer("q6", v)}
            onNext={next}
            showSkip
          />
        );

      case 9:
        return (
          <QuestionScreen
            title="Are you still exploring your feelings?"
            category="Exploration"
            categoryColor="pride-green"
            options={["Yes", "No", "Not sure"]}
            selected={answers.q7}
            onSelect={(v) => setAnswer("q7", v)}
            onNext={next}
            showSkip
          />
        );

      case 10:
        return (
          <QuestionScreen
            title="Have your feelings about attraction changed over time?"
            category="Exploration"
            categoryColor="pride-green"
            options={["Yes", "A little", "No", "Not sure"]}
            selected={answers.q8}
            onSelect={(v) => setAnswer("q8", v)}
            onNext={next}
            showSkip
          />
        );

      case 11:
        return (
          <ScreenWrapper>
            <div className="premium-card p-10 md:p-12 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-pride-blue opacity-60">Optional Reflection</span>
                <h2 className="text-2xl font-bold text-foreground">
                  What kind of connection feels most meaningful to you?
                </h2>
              </div>
              <textarea
                value={answers.reflection || ""}
                onChange={(e) => setAnswer("reflection", e.target.value)}
                placeholder="Share your thoughts here... (optional)"
                className="w-full min-h-[160px] bg-white/5 border border-border rounded-2xl p-6 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-pride-blue/30 resize-none text-lg leading-relaxed transition-all"
              />
              <div className="space-y-4 pt-4">
                <button onClick={next} className="btn-primary w-full h-14 text-lg font-bold">Continue</button>
                <button onClick={next} className="btn-ghost w-full h-12 text-muted-foreground font-bold">Skip for now</button>
              </div>
            </div>
          </ScreenWrapper>
        );

      case 12: {
        const result = generateResult();
        return (
          <ScreenWrapper>
            <div className="premium-card p-10 md:p-12 space-y-10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pride-red via-pride-yellow to-pride-purple opacity-60" />
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">✨ Your Insights</p>
                <h2 className="text-3xl font-bold text-foreground">Your Attraction Patterns</h2>
              </div>
              
              <div className="space-y-4">
                {result.map((line, i) => (
                  <div key={i} className="premium-card p-6 flex gap-5 group hover:border-pride-purple/30 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-pride-purple mt-2.5 shrink-0 animate-pulse" />
                    <p className="text-lg font-medium text-foreground/90 leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>

              {!feedbackGiven ? (
                <div className="premium-card p-8 bg-black/5 border-white/10 space-y-6">
                  <p className="text-xl font-bold text-foreground text-center">Does this feel accurate to you?</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFeedbackGiven(true)}
                      className="btn-primary h-14 text-lg font-bold"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => { setAnswer("feedback", "not really"); setFeedbackGiven(true); }}
                      className="btn-secondary h-14 font-bold"
                    >
                      Not really
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-4">
                  {answers.feedback === "not really" && (
                    <div className="premium-card p-6 border-pride-orange/20 bg-pride-orange/5">
                      <p className="text-pride-orange font-bold text-center italic">
                        "Your experience is unique, and that's valid. Labels are just tools—you are the expert of your own heart."
                      </p>
                    </div>
                  )}
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsShareOpen(true)}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>

                    <button onClick={() => { saveToHistory(); goTo(0); setAnswers({}); setFeedbackGiven(false); }} className="btn-primary w-full h-14 text-lg font-bold shadow-xl">
                      Save & Complete
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setShowHistory(true)} className="btn-secondary w-full h-14 font-bold">
                        History
                      </button>
                      <button onClick={() => navigate('/lgbtq-hub' + window.location.search)} className="btn-secondary w-full h-14 font-bold">
                        Hub
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScreenWrapper>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      
      <div className="activity-container-sm py-8 flex flex-col min-h-screen relative z-10">
        <PrideActivityHeader 
          title="Pride Spectrum" 
          subtitle="Explore your attraction"
          showHistory={true}
          onHistory={() => setShowHistory(true)}
          className="mb-8"
        />
        
        {screen >= 2 && screen <= 11 && (
          <div className="mb-8">
            <ProgressBar current={screen - 1} total={10} />
          </div>
        )}

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title="Share My Spectrum Insights"
        />
        
        <div
          className={`flex-1 flex flex-col justify-center transition-all duration-500 ease-[0.4,0,0.2,1] ${
            transitioning
              ? "opacity-0 translate-y-8 scale-95 blur-sm"
              : "opacity-100 translate-y-0 scale-100 blur-0"
          }`}
        >
          {renderScreen()}
        </div>
        
        {screen < 12 && <Footer />}
      </div>
    </div>
  );
};

// Sub-components

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">{children}</div>
);

interface QuestionScreenProps {
  title: string;
  category?: string;
  categoryColor?: string;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  showSkip?: boolean;
  helperText?: string;
  
}

const categoryColorMap: Record<string, string> = {
  "pride-red": "text-pride-red",
  "pride-orange": "text-pride-orange",
  "pride-yellow": "text-pride-yellow",
  "pride-green": "text-pride-green",
  "pride-blue": "text-pride-blue",
  "pride-purple": "text-pride-purple",
};

const QuestionScreen = ({ title, category, categoryColor, options, selected, onSelect, onNext, showSkip, helperText }: QuestionScreenProps) => (
  <ScreenWrapper>
    <div className="premium-card p-8 md:p-10">
      {category && (
        <div className="mb-3">
          <span className={`text-xs font-black uppercase tracking-widest ${categoryColorMap[categoryColor || ""] || "text-muted-foreground"}`}>
            {category}
          </span>
        </div>
      )}
      <h2 className="text-2xl font-bold text-foreground mb-8 leading-tight">{title}</h2>
      
      <div className="space-y-4 mb-10">
        {options.map((opt) => (
          <OptionButton key={opt} label={opt} selected={selected === opt} onClick={() => onSelect(opt)} />
        ))}
      </div>
      
      {helperText && (
        <div className="bg-pride-yellow/10 rounded-2xl p-5 mb-8 border border-pride-yellow/20">
          <p className="text-pride-yellow font-medium text-center italic">{helperText}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        <button onClick={onNext} className="btn-primary w-full" disabled={!selected && !showSkip}>
          {selected ? "Continue" : "Skip Question"}
        </button>
        {showSkip && selected && (
          <button onClick={onNext} className="btn-ghost w-full">Skip this one</button>
        )}
      </div>
    </div>
  </ScreenWrapper>
);

const PrimaryButton = ({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-4 rounded-2xl bg-pride-orange text-white font-medium text-base transition-all duration-300 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

const SecondaryButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="w-full py-4 rounded-2xl bg-card text-foreground font-medium text-base border border-border transition-all duration-300 hover:bg-accent"
  >
    {children}
  </button>
);

const Footer = () => (
  <div className="py-6 mt-auto opacity-60">
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
      <span>🔐</span>
      <span>Your responses are private and secure</span>
    </div>
  </div>
);

export default ExplorerFlow;
