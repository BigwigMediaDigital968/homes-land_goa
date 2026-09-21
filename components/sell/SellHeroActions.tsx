import ButtonLink from "../ui/ButtonLink";
import ListPropertyButton from "./ListPropertyButton";

/**
 * Hero CTA pair: valuation enquiries go to the contact form, listings open
 * the property modal.
 */
export default function SellHeroActions() {
  return (
    <>
      <ButtonLink href="/contacts">Get a Free Valuation</ButtonLink>
      <ListPropertyButton />
    </>
  );
}
