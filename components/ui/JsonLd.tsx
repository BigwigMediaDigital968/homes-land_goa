interface JsonLdProps {
  /** One schema object, or several (each becomes its own script tag). */
  data: object | object[];
}

/** Renders structured data. Build the objects with the helpers in lib/schema. */
export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape "<" so text from the API (e.g. a property title) can
            // never close the script tag early
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
