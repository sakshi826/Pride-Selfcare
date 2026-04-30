import CardShell from "./CardShell";
import CardEye from "./CardEye";

const causes = [
  { icon: "🪞", title: "Dysphoria", desc: "The distress of body and identity not matching" },
  { icon: "👥", title: "Rejection", desc: "Family, friends or institutions not affirming your identity" },
  { icon: "🏥", title: "Healthcare barriers", desc: "Difficulty accessing affirming medical support" },
  { icon: "😶", title: "Erasure", desc: "Being made invisible or denied in systems and spaces" },
  { icon: "🤫", title: "Hiding", desc: "The exhaustion of managing an unspoken truth" },
  { icon: "💔", title: "Discrimination", desc: "Workplace, school, or social hostility" },
];

const Card2Causes = () => (
  <CardShell bandColor="pink">
    <CardEye eye="Why This Happens" title="It Is Not Your Identity. It Is the World's Response." />
    <p className="text-sm text-[hsl(0,0%,0%)] leading-relaxed mb-5 font-body">
      Trans people do not have higher mental health challenges because of their identities. They have them because of what the world does with those identities. The cause is external. That matters.
    </p>
    <div className="flex flex-col gap-3 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", maxHeight: "calc(100vh - 340px)" }}>
      {causes.map((c) => (
        <div
          key={c.title}
          className="rounded-2xl bg-trans-pink/10 p-4"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{c.icon}</span>
            <div>
              <p className="font-semibold text-sm text-foreground font-body">{c.title}</p>
              <p className="text-xs text-[hsl(0,0%,0%)] mt-1 leading-snug font-body">{c.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardShell>
);

export default Card2Causes;
