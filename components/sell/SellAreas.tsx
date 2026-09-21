import AreasWeCover from "../Home/AreasWeCover";

/** Same panels as the Home page, with the localities sellers ask about. */
const regions = [
  {
    id: "north",
    label: "North Goa",
    tag: "North Goa",
    areas: [
      "Calangute",
      "Candolim",
      "Anjuna",
      "Vagator",
      "Assagao",
      "Porvorim",
    ],
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=90",
    span: "lg:col-span-6",
  },
  {
    id: "south",
    label: "South Goa",
    tag: "South Goa",
    areas: ["Margao", "Colva", "Dona Paula", "Benaulim"],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=90",
    span: "lg:col-span-6",
  },
];

export default function SellAreas() {
  return (
    <AreasWeCover
      eyebrow="Where We Work"
      title={
        <>
          Areas We <span className="italic text-rosegold-500">Cover</span> in
          Goa
        </>
      }
      description="We help sellers across both North and South Goa."
      regions={regions}
      cta={{ label: "Get a Free Valuation", href: "/contacts" }}
    />
  );
}
