import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthGuard } from "./components/pride/AuthGuard";
import { PrideStaticViewer } from "./components/pride/PrideStaticViewer";

// Dynamic Minis
import FindYourRightTime from "./features/pride/dynamic/find-your-right-time";
import GentleCheckIn from "./features/pride/dynamic/gentle-check-in";
import IdentityExploration from "./features/pride/dynamic/identity-exploration";
import IdentityReflection from "./features/pride/dynamic/identity-reflection";
import PrideJournal from "./features/pride/dynamic/pride-journal";
import PrideMirrorMoments from "./features/pride/dynamic/pride-mirror-moments";
import PrideSpectrum from "./features/pride/dynamic/pride-spectrum";

// Static Minis
import BiIdentityAffirmations from "./features/pride/static/bi-identity-affirmations";
import BisexualConversations from "./features/pride/static/bisexual-conversations";
import BisexualStories from "./features/pride/static/bisexual-stories";
import BisexualWellbeingCompass from "./features/pride/static/bisexual-wellbeing-compass";
import ComingOutBisexual from "./features/pride/static/coming-out-bisexual";
import DealingWithDysphoria from "./features/pride/static/dealing-with-dysphoria";
import JoyPrideTrans from "./features/pride/static/joy-pride-trans";
import NavigatingMedicalTransition from "./features/pride/static/navigating-medical-transition";
import TransAndMentalHealth from "./features/pride/static/trans-and-mental-health";
import TransComingOut from "./features/pride/static/trans-coming-out";

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
          <Link to="/pride-journal" className="text-blue-500 hover:underline">Pride Journal</Link>
          <Link to="/pride-mirror-moments" className="text-blue-500 hover:underline">Pride Mirror Moments</Link>
          <Link to="/pride-spectrum" className="text-blue-500 hover:underline">Pride Spectrum</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Static Minis</h2>
        <div className="flex flex-col gap-2">
          <Link to="/bi-identity-affirmations" className="text-blue-500 hover:underline">Bi Identity Affirmations</Link>
          <Link to="/bisexual-conversations" className="text-blue-500 hover:underline">Bisexual Conversations</Link>
          <Link to="/bisexual-stories" className="text-blue-500 hover:underline">Bisexual Stories</Link>
          <Link to="/bisexual-wellbeing-compass" className="text-blue-500 hover:underline">Bisexual Wellbeing Compass</Link>
          <Link to="/coming-out-bisexual" className="text-blue-500 hover:underline">Coming Out Bisexual</Link>
          <Link to="/dealing-with-dysphoria" className="text-blue-500 hover:underline">Dealing With Dysphoria</Link>
          <Link to="/joy-pride-trans" className="text-blue-500 hover:underline">Joy Pride Trans</Link>
          <Link to="/navigating-medical-transition" className="text-blue-500 hover:underline">Navigating Medical Transition</Link>
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
          <Link to="/content/family-friends-reactions" className="text-blue-500 hover:underline">Family & Friends Reactions</Link>
          <Link to="/content/gay-and-proud" className="text-blue-500 hover:underline">Gay And Proud</Link>
          <Link to="/content/gay-coming-out-yourself" className="text-blue-500 hover:underline">Gay Coming Out Yourself</Link>
          <Link to="/content/gay-dealing-homophobia" className="text-blue-500 hover:underline">Gay Dealing Homophobia</Link>
          <Link to="/content/lesbian-power-boost" className="text-blue-500 hover:underline">Lesbian Power Boost</Link>
          <Link to="/content/lesbian-real-stories" className="text-blue-500 hover:underline">Lesbian Real Stories</Link>
        </div>
      </section>
    </div>
  );
}

function TokenFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>A valid session token is required to access PrideMantra.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/pride">
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
              <Route path="/pride-journal/*" element={<PrideJournal />} />
              <Route path="/pride-mirror-moments/*" element={<PrideMirrorMoments />} />
              <Route path="/pride-spectrum/*" element={<PrideSpectrum />} />

              {/* PrideMantra — Static Minis */}
              <Route path="/bi-identity-affirmations/*" element={<BiIdentityAffirmations />} />
              <Route path="/bisexual-conversations/*" element={<BisexualConversations />} />
              <Route path="/bisexual-stories/*" element={<BisexualStories />} />
              <Route path="/bisexual-wellbeing-compass/*" element={<BisexualWellbeingCompass />} />
              <Route path="/coming-out-bisexual/*" element={<ComingOutBisexual />} />
              <Route path="/dealing-with-dysphoria/*" element={<DealingWithDysphoria />} />
              <Route path="/joy-pride-trans/*" element={<JoyPrideTrans />} />
              <Route path="/navigating-medical-transition/*" element={<NavigatingMedicalTransition />} />
              <Route path="/trans-and-mental-health/*" element={<TransAndMentalHealth />} />
              <Route path="/trans-coming-out/*" element={<TransComingOut />} />

              {/* PrideMantra — Claude HTML Minis */}
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
            </Routes>
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
