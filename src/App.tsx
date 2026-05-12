import { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthGuard } from "./components/pride/AuthGuard";
import { PrideStaticViewer } from "./components/pride/PrideStaticViewer";
import { sql } from "@/lib/db";
import { initTables } from "@/features/pride/trackers/DbSetup";

// Dynamic Minis
import FindYourRightTime from "./features/pride/dynamic/find-your-right-time";
import GentleCheckIn from "./features/pride/dynamic/gentle-check-in";
import IdentityExploration from "./features/pride/dynamic/identity-exploration";
import IdentityReflection from "./features/pride/dynamic/identity-reflection";
import IdentityJourney from "./features/pride/dynamic/identity-journey";
import PrideJournal from "./features/pride/dynamic/pride-journal";
import PrideMirrorMoments from "./features/pride/dynamic/pride-mirror-moments";
import PrideSpectrum from "./features/pride/dynamic/pride-spectrum";

// Static Minis
import BiIdentityAffirmations from "./features/pride/static/bi-identity-affirmations";
import BisexualConversations from "./features/pride/static/bi-family-friends-convo";
import BisexualStories from "./features/pride/static/bisexual-stories";
import BisexualWellbeingCompass from "./features/pride/static/bi-mental-health";
import ComingOutBisexual from "./features/pride/static/bi-coming-out";
import DealingWithDysphoria from "./features/pride/static/dealing-with-dysphoria";
import JoyPrideTrans from "./features/pride/static/joy-pride-trans";
import NavigatingMedicalTransition from "./features/pride/static/medical-transition";
import TransAndMentalHealth from "./features/pride/static/trans-and-mental-health";
import TransComingOut from "./features/pride/static/trans-coming-out";
import LGBTQStories from "./features/pride/static/lgbtq-stories";

// Hub Suite
import { LGBTQSelfCare } from "./features/pride/hub/LGBTQSelfCare";
import { LGBTQTips } from "./features/pride/hub/LGBTQTips";
import { LGBTQMythsFacts } from "./features/pride/hub/LGBTQMythsFacts";
import { LGBTQMythDetail } from "./features/pride/hub/LGBTQMythDetail";
import { LGBTQArticles } from "./features/pride/hub/LGBTQArticles";
import { LGBTQArticleDetail } from "./features/pride/hub/LGBTQArticleDetail";
import { LesbianGuide } from "./features/pride/hub/LesbianGuide";
import { GayGuide } from "./features/pride/hub/GayGuide";
import { BisexualGuide } from "./features/pride/hub/BisexualGuide";
import { TransGuide } from "./features/pride/hub/TransGuide";
import { FindYourCommunity } from "./features/pride/hub/FindYourCommunity";
import { SetGentleBoundaries } from "./features/pride/hub/SetGentleBoundaries";
import { HonorYourIdentity } from "./features/pride/hub/HonorYourIdentity";
import { AffirmingSelfTalk } from "./features/pride/hub/AffirmingSelfTalk";
import { CreateSafeSpaces } from "./features/pride/hub/CreateSafeSpaces";
import { ProcessGriefLoss } from "./features/pride/hub/ProcessGriefLoss";
import { LGBTQAssessments } from "./features/pride/hub/LGBTQAssessments";

// Trackers
import DailyCareTracker from "./features/pride/trackers/DailyCareTracker";
import MoodTracker from "./features/pride/trackers/MoodTracker";
import SleepTracker from "./features/pride/trackers/SleepTracker";
import GratitudeTracker from "./features/pride/trackers/GratitudeTracker";
import VibeTracker from "./features/pride/trackers/VibeTracker";
import DbSetup from "./features/pride/trackers/DbSetup";

function Index() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">PrideMantra Menu</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Dynamic Minis</h2>
        <div className="flex flex-col gap-2">
          <Link to="/find-your-right-time" className="text-blue-500 hover:underline">Find Your Right Time</Link>
          <Link to="/gentle-check-in" className="text-blue-500 hover:underline">Gentle Check-In</Link>
          <Link to="/identity-exploration" className="text-blue-500 hover:underline">Identity Exploration</Link>
          <Link to="/identity-reflection" className="text-blue-500 hover:underline">Identity Reflection</Link>
          <Link to="/identity-journey" className="text-blue-500 hover:underline">Identity Journey</Link>
          <Link to="/pride-journal" className="text-blue-500 hover:underline">Pride Journal</Link>
          <Link to="/pride-mirror-moments" className="text-blue-500 hover:underline">Pride Mirror Moments</Link>
          <Link to="/pride-spectrum" className="text-blue-500 hover:underline">Pride Spectrum</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Static Minis</h2>
        <div className="flex flex-col gap-2">
          <Link to="/bi-identity-affirmations" className="text-blue-500 hover:underline">Bi Identity Affirmations</Link>
          <Link to="/bi-family-friends-convo" className="text-blue-500 hover:underline">Bisexual Conversations</Link>
          <Link to="/bisexual-stories" className="text-blue-500 hover:underline">Bisexual Stories</Link>
          <Link to="/bi-mental-health" className="text-blue-500 hover:underline">Bisexual Wellbeing Compass</Link>
          <Link to="/bi-coming-out" className="text-blue-500 hover:underline">Coming Out Bisexual</Link>
          <Link to="/dealing-with-dysphoria" className="text-blue-500 hover:underline">Dealing With Dysphoria</Link>
          <Link to="/joy-pride-trans" className="text-blue-500 hover:underline">Joy Pride Trans</Link>
          <Link to="/medical-transition" className="text-blue-500 hover:underline">Navigating Medical Transition</Link>
          <Link to="/trans-and-mental-health" className="text-blue-500 hover:underline">Trans And Mental Health</Link>
          <Link to="/trans-coming-out" className="text-blue-500 hover:underline">Trans Coming Out</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Claude HTML Minis</h2>
        <div className="flex flex-col gap-2">
          <Link to="/content/celebrate-wlw" className="text-blue-500 hover:underline">Celebrate WLW</Link>
          <Link to="/content/coming-out-practice" className="text-blue-500 hover:underline">Coming Out Practice</Link>
          <Link to="/content/confidence-mirror" className="text-blue-500 hover:underline">Confidence Mirror</Link>
          <Link to="/content/when-they-react" className="text-blue-500 hover:underline">Handle Reactions of Others</Link>
          <Link to="/content/gay-and-proud" className="text-blue-500 hover:underline">Gay And Proud</Link>
          <Link to="/content/gay-coming-out" className="text-blue-500 hover:underline">Gay Coming Out</Link>
          <Link to="/content/dealing-with-homophobia" className="text-blue-500 hover:underline">Dealing with Homophobia</Link>
          <Link to="/content/lesbian-power-booster" className="text-blue-500 hover:underline">Lesbian Power Booster</Link>
          <Link to="/content/real-stories-of-lesbian-women" className="text-blue-500 hover:underline">Lesbian Real Stories</Link>
          <Link to="/content/masculinity-on-your-own-terms" className="text-blue-500 hover:underline">Masculinity on Your Own Terms</Link>
          <Link to="/content/lgbtq-stories" className="text-blue-500 hover:underline font-bold">LGBTQ+ Stories (Main)</Link>
        </div>
      </section>
    </div>
  );
}

function TokenFallback() {
  const handleLogin = () => {
    // Save current path for restoration after auth
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem("APP_REDIRECT_PATH", currentPath);
    
    // Redirect to the external Auth Portal as per the new protocol
    window.location.href = 'https://web.mantracare.com/app/pride';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F6FE] px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m11 3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#020817]">Unauthorized</h1>
          <p className="text-[#64748B]">
            A valid session token is required to access PrideMantra. Please log in to your MantraCare account to continue.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
        >
          Log In to MantraCare
        </button>

        <button 
          onClick={() => window.location.href = '/pride'}
          className="text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors"
        >
          Retry Authentication
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return !!(import.meta.env.VITE_DEV_USER_ID || sessionStorage.getItem('user_id'));
  });

  useEffect(() => {
    console.log('BUILD_VERSION: 1.2 - AUTH_REDIRECT_ACTIVE');
    async function handshake() {
      // 1. Developer Bypass
      const devUserId = import.meta.env.VITE_DEV_USER_ID;
      if (devUserId) {
        console.log('Dev Bypass: Setting test user ID');
        sessionStorage.setItem('user_id', devUserId);
        setIsAuthorized(true);
        return;
      }

      // Ensure DB is ready
      try { await initTables(); } catch (e) { console.error('DB init failed', e); }

      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const sessionUserId = sessionStorage.getItem('user_id');

      // 2. Session Check
      if (sessionUserId) {
        setIsAuthorized(true);
        return;
      }

      // 3. Token Extraction (URL or Cookie)
      let activeToken = token;
      if (!activeToken) {
        // Try extracting from cookie (if not HttpOnly)
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('x-auth-token='));
        if (authCookie) {
          activeToken = authCookie.split('=')[1];
          console.log('Handshake: Found token in cookies');
        }
      }

      if (activeToken) {
        console.log('Handshake: Exchanging token for identity...');
        try {
          const res = await fetch('https://api.mantracare.com/user/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token: activeToken })
          });

          if (res.ok) {
            const data = await res.json();
            const userId = data.user_id || data.userId;
            if (userId) {
              sessionStorage.setItem('user_id', userId.toString());
              await sql`INSERT INTO users (id, updated_at) VALUES (${userId}, NOW()) ON CONFLICT (id) DO NOTHING`;
              
              const savedPath = localStorage.getItem("APP_REDIRECT_PATH");
              if (savedPath) {
                localStorage.removeItem("APP_REDIRECT_PATH");
                window.location.replace(savedPath);
                return;
              }

              if (token) { // Only sanitize if it was in the URL
                url.searchParams.delete('token');
                window.history.replaceState({}, document.title, url.toString());
              }
              setIsAuthorized(true);
              return;
            }
          }
        } catch (err) {
          console.error('Handshake API error:', err);
        }
      }

      // 4. Final Fail: Redirect to external Auth Portal
      const currentPath = window.location.pathname + window.location.search;
      console.log('Handshake: No session or token found. Redirecting to Auth Portal...', currentPath);
      localStorage.setItem("APP_REDIRECT_PATH", currentPath);
      window.location.href = 'https://web.mantracare.com/app/pride';
    }

    handshake();
  }, []);


  return (
    <BrowserRouter basename="/pride">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F9F6FE]">Loading...</div>}>
        <Routes>
          <Route path="/token" element={<TokenFallback />} />
          
          <Route path="*" element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<LGBTQSelfCare />} />
                <Route path="/menu" element={<Index />} />
                
                {/* PrideMantra — Dynamic Minis */}
                <Route path="/find-your-right-time/*" element={<FindYourRightTime />} />
                <Route path="/gentle-check-in/*" element={<GentleCheckIn />} />
                <Route path="/identity-exploration/*" element={<IdentityExploration />} />
                <Route path="/identity-reflection/*" element={<IdentityReflection />} />
                <Route path="/identity-journey/*" element={<IdentityJourney />} />
                <Route path="/pride-journal/*" element={<PrideJournal />} />
                <Route path="/pride-mirror-moments/*" element={<PrideMirrorMoments />} />
                <Route path="/pride-spectrum/*" element={<PrideSpectrum />} />

                {/* PrideMantra — Static Minis */}
                <Route path="/bi-identity-affirmations/*" element={<BiIdentityAffirmations />} />
                <Route path="/bi-family-friends-convo/*" element={<BisexualConversations />} />
                <Route path="/bisexual-stories/*" element={<BisexualStories />} />
                <Route path="/bi-mental-health/*" element={<BisexualWellbeingCompass />} />
                <Route path="/bi-coming-out/*" element={<ComingOutBisexual />} />
                <Route path="/dealing-with-dysphoria/*" element={<DealingWithDysphoria />} />
                <Route path="/joy-pride-trans/*" element={<JoyPrideTrans />} />
                <Route path="/medical-transition/*" element={<NavigatingMedicalTransition />} />
                <Route path="/trans-and-mental-health/*" element={<TransAndMentalHealth />} />
                <Route path="/trans-coming-out/*" element={<TransComingOut />} />

                {/* PrideMantra — Claude HTML Minis */}
                <Route path="/content/lgbtq-stories/*" element={<LGBTQStories />} />
                <Route path="/content/:slug" element={<PrideStaticViewer />} />

                {/* LGBTQ+ Self-Care Hub */}
                <Route path="/lgbtq-hub" element={<LGBTQSelfCare />} />
                <Route path="/lgbtq-tips" element={<LGBTQTips />} />
                <Route path="/lgbtq-myths-facts" element={<LGBTQMythsFacts />} />
                <Route path="/lgbtq-myth/:mythId" element={<LGBTQMythDetail />} />
                <Route path="/lgbtq-articles" element={<LGBTQArticles />} />
                <Route path="/lgbtq-article/:articleId" element={<LGBTQArticleDetail />} />
                <Route path="/lesbian-guide" element={<LesbianGuide />} />
                <Route path="/gay-guide" element={<GayGuide />} />
                <Route path="/bisexual-guide" element={<BisexualGuide />} />
                <Route path="/trans-guide" element={<TransGuide />} />
                <Route path="/lgbtq-assessments" element={<LGBTQAssessments />} />
                <Route path="/find-your-community" element={<FindYourCommunity />} />
                <Route path="/set-gentle-boundaries" element={<SetGentleBoundaries />} />
                <Route path="/honor-your-identity" element={<HonorYourIdentity />} />
                <Route path="/affirming-self-talk" element={<AffirmingSelfTalk />} />
                <Route path="/create-safe-spaces" element={<CreateSafeSpaces />} />
                <Route path="/process-grief-loss" element={<ProcessGriefLoss />} />

                {/* Trackers */}
                <Route path="/trackers/daily-care" element={<DailyCareTracker />} />
                <Route path="/trackers/mood" element={<MoodTracker />} />
                <Route path="/trackers/sleep" element={<SleepTracker />} />
                <Route path="/trackers/gratitude" element={<GratitudeTracker />} />
                <Route path="/trackers/vibe" element={<VibeTracker />} />
                <Route path="/db-setup" element={<DbSetup />} />
              </Routes>
            </AuthGuard>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
