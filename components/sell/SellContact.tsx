import ListPropertyButton from "./ListPropertyButton";
import ContactChannels from "../ui/ContactChannels";

export default function SellContact() {
  return (
    <section
      aria-labelledby="sell-contact-heading"
      className="border-t border-border bg-black-900 py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2
            id="sell-contact-heading"
            className="font-serif text-3xl font-light leading-tight text-fg md:text-4xl"
          >
            Get In Touch With Us
          </h2>
          <span aria-hidden className="mt-6 block h-px w-16 bg-primary/60" />

          <p className="mt-6 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            Want to sell your property quickly and easily? Fill out the form or
            contact us directly.
          </p>

          <div className="mt-8">
            <ListPropertyButton variant="primary" />
          </div>
        </div>

        <ContactChannels className="md:col-span-7" />
      </div>
    </section>
  );
}
