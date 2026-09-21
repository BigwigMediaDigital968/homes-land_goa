import ProcessSteps from "../ui/ProcessSteps";

const steps = [
  {
    heading: "Share Your Requirements",
    text: "Tell our team what you are looking for: property type, budget, location preference and timeline.",
  },
  {
    heading: "Explore Suitable Properties",
    text: "Browse property for sale in Goa on this page, or let us send you options that match your requirements.",
  },
  {
    heading: "Shortlist and Schedule Viewings",
    text: "Narrow down your options and arrange a time to see the properties in person.",
  },
  {
    heading: "Review Details and Complete Due Diligence",
    text: "Go through the property documents and, where needed, involve a legal professional for verification.",
  },
  {
    heading: "Negotiate and Finalize",
    text: "Agree on price and terms with the seller.",
  },
  {
    heading: "Complete Documentation and Purchase",
    text: "Finalize the paperwork required to transfer ownership.",
  },
];

export default function BuyProcess() {
  return (
    <ProcessSteps
      eyebrow="The Process"
      id="process-heading"
      heading="How to Buy Property in Goa"
      steps={steps}
      cta={{ label: "Get Started", href: "/contacts" }}
    />
  );
}
