import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Heart, Wind, Route, Users2, ClipboardCheck, BookOpen, Clock, Award, Headphones, BarChart3, FileText, Play, CheckCircle, Check } from "lucide-react";
import { motion } from "framer-motion";

const serviceDetails: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  icon: string;
  color: string;
  stats: { value: string; label: string }[];
  pathways: { title: string; type: string; points: string; icon: string; duration?: string; completed?: boolean }[];
  featureLinks?: { title: string; subtitle: string; iconType: "chat" | "selfcare" }[];
  quickTools?: { label: string; Icon: any; grad: string; link: string | null }[];
}> = {
  "lgbtq": {
    name: "LGBTQ+",
    description: "Get professional LGBTQ-affirmative support for your mental health and emotional wellness journey.",
    longDescription: "Our LGBTQ+ program provides you with access to licensed therapists and counselors who specialize in LGBTQ-affirmative care. Whether you're dealing with identity exploration, coming out, family dynamics, or simply need someone who understands, we're here to support you every step of the way.",
    features: [
      "One-on-one therapy sessions with LGBTQ-affirming professionals",
      "Group support meetings with peers",
      "Advanced mood tracking tools and analytics",
      "Guided mindfulness and relaxation exercises",
      "24/7 crisis support hotline access",
      "Personalized treatment plans"
    ],
    image: "https://images.unsplash.com/photo-1617392144079-1453b1b87dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMR0JUUSUyMHByaWRlJTIwcmFpbmJvdyUyMHN1cHBvcnR8ZW58MXx8fHwxNzczMjI4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🏳️‍🌈",
    color: "#8B5CF6",
    stats: [
      { value: "500+", label: "Counselors" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" }
    ],
    pathways: [
      { title: "Mindful Breathing Exercise", type: "Audio", points: "10 Points", icon: "🎧", duration: "5 min", completed: false },
      { title: "Meditation on Gratitude", type: "Audio", points: "5 Points", icon: "🎵", duration: "10 min", completed: false },
      { title: "Track Your Mood Today", type: "Tracker", points: "10 Points", icon: "📊", duration: "2 min", completed: false },
      { title: "Assess Your Stress Levels", type: "Assessment", points: "10 Points", icon: "📋", duration: "8 min", completed: false },
      { title: "Daily Gratitude Journal", type: "Activity", points: "10 Points", icon: "✍️", duration: "5 min", completed: false }
    ],
    featureLinks: [
      { title: "Talk to an LGBTQ-Affirming Counselor", subtitle: "Get professional LGBTQ+ support", iconType: "chat" },
      { title: "Self Care Resources", subtitle: "Tools and guidance for your wellness journey", iconType: "selfcare" },
    ],
    quickTools: [
      { label: "AI Role Play",      Icon: Users2,    grad: "#E74C3C", link: "https://web.mantracare.com/app/ai-role-play" },
      { label: "Assessment",         Icon: ClipboardCheck, grad: "#3498DB", link: "https://lgbtqiacounseling.com/assessments/" },
      { label: "Pride Spectrum",     Icon: Sparkles,  grad: "#FF9F43", link: "/pride-spectrum" },
      { label: "Journal",            Icon: BookOpen,  grad: "#F39C12", link: "/pride-journal" },
      { label: "Identity Journey",   Icon: Route,     grad: "#8B5CF6", link: "/find-your-right-time" },
      { label: "Mindfulness",        Icon: Wind,      grad: "#9B59B6", link: "/bisexual-wellbeing-compass" },
    ]
  }
};

export function ServicePage() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const service = serviceDetails[serviceId as string];
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <button onClick={() => navigate("/lgbtq-self-care")} className="text-blue-500 hover:underline">
            Back to Self-Care
          </button>
        </div>
      </div>
    );
  }

  const t = {
    pageBg: "bg-[#F9FAFB]",
    headingText: "text-[#020817]",
    subText: "text-[#64748B]",
    cardBg: "bg-white",
    backText: "text-[#64748B]",
  };

  return (
    <div className={`flex min-h-screen ${t.pageBg} transition-colors duration-500`}>
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-8 md:pt-12">
          {/* Service Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <button
                onClick={() => navigate(-1)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${t.backText} hover:bg-white shadow-sm border border-gray-100`}
              >
                <ChevronLeft size={24} />
              </button>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md text-xl flex-shrink-0`} style={{ backgroundColor: service.color }}>
                {service.icon}
              </div>
              <h1 className={`text-2xl md:text-3xl font-bold ${t.headingText}`}>{service.name}</h1>
            </div>
            <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${t.subText} pl-[54px]`}>{service.description}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Details & Tools */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border border-gray-100 ${t.cardBg} shadow-sm`}
              >
                <h2 className={`text-xl font-bold mb-4 ${t.headingText}`}>Program Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mt-0.5">
                        <CheckCircle className="text-green-500" size={14} />
                      </div>
                      <p className={`text-sm ${t.subText}`}>{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Tools */}
              {service.quickTools && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className={`text-xl font-bold mb-4 ${t.headingText}`}>Quick Tools</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.quickTools.map((tool, i) => (
                      <button
                        key={i}
                        onClick={() => tool.link && (tool.link.startsWith('http') ? window.open(tool.link, '_blank') : navigate(tool.link))}
                        className={`p-4 rounded-2xl border border-gray-100 ${t.cardBg} shadow-sm hover:shadow-md transition-all text-left group`}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ backgroundColor: tool.grad + "20" }}>
                          <tool.Icon size={20} style={{ color: tool.grad }} />
                        </div>
                        <h3 className={`font-semibold text-sm ${t.headingText}`}>{tool.label}</h3>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Pathway/Journey */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className={`text-xl font-bold mb-4 ${t.headingText}`}>Your Journey</h2>
                <div className={`p-6 rounded-2xl border border-gray-100 ${t.cardBg} shadow-sm space-y-4`}>
                  {service.pathways.map((path, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setCompletedTasks(prev => {
                          const next = new Set(prev);
                          next.has(i) ? next.delete(i) : next.add(i);
                          return next;
                        });
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${completedTasks.has(i) ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-gray-200'}`}>
                        {completedTasks.has(i) && <Check className="text-white" size={14} strokeWidth={3} />}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${t.headingText}`}>{path.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{path.type}</span>
                          <span>•</span>
                          <span>{path.duration}</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Stats & Links */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4">
                {service.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl border border-gray-100 ${t.cardBg} shadow-sm text-center`}
                  >
                    <div className="text-2xl font-bold text-[#8B5CF6] mb-1">{stat.value}</div>
                    <div className={`text-sm ${t.subText}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Links */}
              {service.featureLinks && (
                <div className="space-y-4">
                  {service.featureLinks.map((link, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        if (link.iconType === "chat") navigate("/care-team");
                        if (link.iconType === "selfcare") navigate("/lgbtq-self-care");
                      }}
                      className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden group"
                    >
                      <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-1">{link.title}</h4>
                        <p className="text-white/80 text-sm">{link.subtitle}</p>
                      </div>
                      <ArrowRight className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={32} />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
