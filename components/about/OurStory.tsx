import Image from "next/image";
import storyImage from "../../assets/image (10) 2.png";
import SectionHeading from "../ui/SectionHeading";

export default function OurStory() {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="border-t border-border bg-bg py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={storyImage}
            alt="A Homes & Land Goa property in Goa"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading eyebrow="Our Journey" id="our-story-heading">
            Our Story
          </SectionHeading>

          <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-white/80 md:text-lg">
            <p>
              What began as a small team with a passion for real estate has
              grown into a trusted brand that helps people turn dreams of owning
              property into reality. From modest beginnings, we&apos;ve expanded
              our presence across prime locations, offering premium residences,
              investment opportunities, and lifestyle spaces that stand the test
              of time.
            </p>
            <p>
              Our journey is built on a foundation of trust, transparency, and
              commitment to excellence. Every project we undertake reflects our
              belief that real estate is more than just buildings, it&apos;s
              about creating communities, securing futures, and adding value to
              lives. Whether it&apos;s a first home, a luxury villa, or an
              investment property, we are here to make your real estate journey
              seamless, rewarding, and memorable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
