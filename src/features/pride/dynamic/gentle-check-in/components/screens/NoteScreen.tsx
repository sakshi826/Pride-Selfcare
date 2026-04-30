import type { CheckinData } from "../ComfortCheckin";

interface Props {
  data: CheckinData;
  setData: React.Dispatch<React.SetStateAction<CheckinData>>;
  onSave: () => void;
}

const NoteScreen = ({ data, setData, onSave }: Props) => (
  <div className="space-y-8">
    <h1 className="text-2xl font-medium tracking-tight text-foreground" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>
      Would you like to add a small note?
    </h1>
    <textarea
      value={data.note}
      onChange={(e) => setData((d) => ({ ...d, note: e.target.value }))}
      placeholder="Anything you want to note…"
      rows={4}
      className="w-full p-5 rounded-3xl bg-card text-foreground placeholder:text-muted text-base outline-none resize-none leading-relaxed focus:shadow-lg transition-shadow"
      style={{ boxShadow: "var(--shadow-cloud)" }}
    />
    <button
      onClick={onSave}
      className="h-14 w-full rounded-full bg-primary text-primary-foreground font-medium text-base transition-all active:scale-95"
    >
      Save
    </button>
  </div>
);

export default NoteScreen;
