import { useParams } from "react-router-dom";

export function PrideStaticViewer() {
  const { slug } = useParams<{ slug: string }>();
  const src = `/pride/static/pride/${slug}/index.html`;

  return (
    <iframe
      src={src}
      title={`PrideMantra ${slug}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        border: "none",
      }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
