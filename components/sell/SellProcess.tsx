import ProcessSteps from "../ui/ProcessSteps";

const steps = [
  {
    heading: "Share Your Property Details",
    text: "Fill out our form or call us directly to provide basic information about your property.",
  },
  {
    heading: "Get a Property Valuation",
    text: "Our experts evaluate your property and suggest the best market price based on location, condition and current demand in Goa.",
  },
  {
    heading: "Close the Deal",
    text: "We connect you with genuine buyers and ensure a hassle-free closing process.",
  },
];

export default function SellProcess() {
  return (
    <ProcessSteps
      eyebrow="The Process"
      id="sell-process-heading"
      heading="Our Selling Process"
      steps={steps}
      // cta={{ label: "Start With a Valuation", href: "/contacts" }}
    />
  );
}
