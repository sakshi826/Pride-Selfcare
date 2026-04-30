import { useNavigate } from "react-router-dom";
// Removed unused motion import
import { ChevronLeft, Heart, Sparkles, Shield, Star, Users2 } from "lucide-react";

interface GuideProps {
  type: 'lesbian' | 'gay' | 'bisexual' | 'trans';
}

const guideData = {
  lesbian: { title: "Lesbian Wellness Guide", icon: Heart, color: "text-[#EC4899]", bg: "bg-[#FFF1F2]" },
  gay: { title: "Gay Men's Wellness Guide", icon: Users2, color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]" },
  bisexual: { title: "Bisexual Wellness Guide", icon: Star, color: "text-[#A855F7]", bg: "bg-[#FAF5FF]" },
  trans: { title: "Trans Wellness Guide", icon: Shield, color: "text-[#10B981]", bg: "bg-[#F0FDF4]" },
};

export function IdentityGuide({ type }: GuideProps) {
  const navigate = useNavigate();
  const data = guideData[type];
  const Icon = data.icon;

  return (
    <div className={`min-h-screen ${data.bg}`}>
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <header className="mb-10 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-200">
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className={`flex items-center gap-2 font-bold mb-1 ${data.color}`}>
              <Icon size={20} /> Wellness Guide
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{data.title}</h1>
          </div>
        </header>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Welcome to your identity-specific wellness guide. This space is designed to provide resources and support tailored to your unique experiences.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={18} /> Daily Affirmations
              </h3>
              <p className="text-slate-500 italic">"I am valid, I am seen, and I am loved exactly as I am."</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Shield className="text-blue-500" size={18} /> Safe Spaces
              </h3>
              <p className="text-slate-500">Creating physical and emotional boundaries helps protect your peace.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
