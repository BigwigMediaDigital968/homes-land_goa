import ProcessSteps from "../ui/ProcessSteps";

const steps = [
  {
    heading: "Share Your Requirement",
    text: "Tell us your budget, locality preference, property type and lease duration.",
  },
  {
    heading: "Review Suitable Options",
    text: "We shortlist matching rental listings for you.",
  },
  {
    heading: "Visit and Evaluate",
    text: "Arrange a viewing and review the property in person.",
  },
  {
    heading: "Complete the Agreement",
    text: "Review the rental agreement and move in.",
  },
];

export default function RentProcess() {
  return (
    <ProcessSteps
      eyebrow="The Process"
      id="rent-process-heading"
      heading="How Renting a Property in Goa Works"
      steps={steps}
      cta={{ label: "Get Started", href: "/contacts" }}
    />
  );
}
