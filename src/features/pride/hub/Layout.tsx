import { useNavigate, useLocation } from "react-router-dom";
import { Home, Lightbulb, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function MantraLogoSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1410 300" className="h-6 w-auto" style={{ minWidth: '160px' }}>
      <path fill="#00c0ff" d="M 88.011719 41.597656 C 126.488281 30.230469 185.953125 88.574219 185.953125 88.574219 C 185.953125 88.574219 231.15625 35.320312 283.894531 41.597656 C 347.777344 49.203125 333.417969 135.128906 327.910156 170.035156 C 353.628906 129.003906 348.457031 77.652344 343.882812 63.675781 C 337.671875 44.671875 322.023438 28.785156 302.878906 22.859375 C 237.046875 2.472656 185.953125 53.707031 185.953125 53.707031 C 185.953125 53.707031 123.570312 -3.003906 69.324219 19.445312 C 24.875 37.835938 0.125 103.265625 66.957031 156.453125 C 110.609375 191.195312 150 209.433594 181.804688 265.285156 C 176.179688 221.695312 123.191406 180.828125 86.699219 151.785156 C 30.957031 107.417969 49.535156 52.964844 88.011719 41.597656"/>
      <path fill="#043570" d="M 233.285156 224.621094 C 268.558594 185.804688 287.691406 146.648438 291.652344 118.75 C 308.792969 164.53125 281.464844 243.296875 204.863281 296.816406 C 214.253906 248.851562 174.371094 175.632812 90.019531 135.414062 C 202.238281 160.808594 233.285156 224.621094 233.285156 224.621094"/>
      <path fill="#043570" d="M 255.035156 155.03125 C 255.035156 168.21875 244.347656 178.910156 231.15625 178.910156 C 217.964844 178.910156 207.273438 168.21875 207.273438 155.03125 C 207.273438 141.839844 217.964844 131.148438 231.15625 131.148438 C 244.347656 131.148438 255.035156 141.839844 255.035156 155.03125"/>
      <text x="380" y="210" font-family="Arial, sans-serif" font-weight="bold" font-size="200" fill="#043570">MantraCare</text>
    </svg>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Lightbulb, label: "LGBTQ Self-Care", path: "/lgbtq-self-care" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 256 }}
      className="hidden md:flex bg-white border-r border-[#E2ECF5] flex-col h-screen sticky top-0 flex-shrink-0 shadow-sm"
    >
      <div className="p-4 border-b border-[#E2ECF5] flex items-center gap-2 min-h-[64px]">
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-slate-100 rounded">
          <Menu size={20} />
        </button>
        {!collapsed && <MantraLogoSVG />}
      </div>
      <nav className="flex-1 p-2">
        {mainNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive(item.path) ? "bg-[#00c0ff] text-white" : "text-[#64748B] hover:bg-slate-50"
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </motion.div>
  );
}
