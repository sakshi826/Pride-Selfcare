import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LGBTQSelfCare } from "./components/LGBTQSelfCare";
import { LGBTQTips } from "./components/LGBTQTips";
import { FindYourCommunity } from "./components/FindYourCommunity";
import { SetGentleBoundaries } from "./components/SetGentleBoundaries";
import { HonorYourIdentity } from "./components/HonorYourIdentity";
import { AffirmingSelfTalk } from "./components/AffirmingSelfTalk";
import { CreateSafeSpaces } from "./components/CreateSafeSpaces";
import { ProcessGriefLoss } from "./components/ProcessGriefLoss";
import { LGBTQMythsFacts } from "./components/LGBTQMythsFacts";
import { LGBTQMythDetail } from "./components/LGBTQMythDetail";
import { LGBTQArticles } from "./components/LGBTQArticles";
import { LGBTQArticleDetail } from "./components/LGBTQArticleDetail";
import { LesbianGuide } from "./components/LesbianGuide";
import { GayGuide } from "./components/GayGuide";
import { BisexualGuide } from "./components/BisexualGuide";
import { TransGuide } from "./components/TransGuide";
import { ServicePage } from "./components/ServicePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main entry redirects to LGBTQ Self Care */}
        <Route path="/" element={<Navigate to="/lgbtq-self-care" replace />} />
        <Route path="/dashboard" element={<Navigate to="/lgbtq-self-care" replace />} />
        <Route path="/self-care" element={<Navigate to="/lgbtq-self-care" replace />} />
        
        {/* LGBTQ Service Page */}
        <Route path="/service/lgbtq" element={<ServicePage />} />

        {/* LGBTQ Self Care & Internal Pages */}
        <Route path="/lgbtq-self-care" element={<LGBTQSelfCare />} />
        <Route path="/lgbtq-tips" element={<LGBTQTips />} />
        <Route path="/lgbtq-myths-facts" element={<LGBTQMythsFacts />} />
        <Route path="/lgbtq-myth/:mythId" element={<LGBTQMythDetail />} />
        <Route path="/lgbtq-articles" element={<LGBTQArticles />} />
        <Route path="/lgbtq-article/:articleId" element={<LGBTQArticleDetail />} />
        <Route path="/lesbian-guide" element={<LesbianGuide />} />
        <Route path="/gay-guide" element={<GayGuide />} />
        <Route path="/bisexual-guide" element={<BisexualGuide />} />
        <Route path="/trans-guide" element={<TransGuide />} />
        <Route path="/find-your-community" element={<FindYourCommunity />} />
        <Route path="/set-gentle-boundaries" element={<SetGentleBoundaries />} />
        <Route path="/honor-your-identity" element={<HonorYourIdentity />} />
        <Route path="/affirming-self-talk" element={<AffirmingSelfTalk />} />
        <Route path="/create-safe-spaces" element={<CreateSafeSpaces />} />
        <Route path="/process-grief-loss" element={<ProcessGriefLoss />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/lgbtq-self-care" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;