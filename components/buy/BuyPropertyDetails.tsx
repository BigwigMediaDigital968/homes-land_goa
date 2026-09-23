import { MapPin, BedDouble, Home, Phone } from "lucide-react";

import ContactInfo from "../ContactInfo";
import { LeadForm } from "../LeadForm";
import { HeroSlider, PhotoGallery } from "../listings/PropertyMedia";
import { toPositiveNumber, type Property } from "@/lib/properties";
import { BUSINESS } from "@/lib/site";

const badgeClass =
  "px-4 py-2 bg-surface border border-border rounded-lg shadow flex items-center gap-2 font-sans text-sm text-fg";
const chipClass =
  "px-4 py-2 bg-surface border border-border rounded-full shadow font-sans text-sm text-fg/85";
const sectionTitleClass = "font-serif text-3xl font-light mb-6 text-primary";

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    } else if (parsedUrl.hostname.includes("youtube.com")) {
      return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
    }
    return null;
  } catch {
    return null;
  }
}

/** Everything visible on /buy/[slug]; the route page only handles SEO. */
export default function BuyPropertyDetails({ property }: { property: Property }) {
  const images = property.images ?? [];
  const highlights = property.highlights ?? [];
  const featuresAmenities = property.featuresAmenities ?? [];
  const nearby = property.nearby ?? [];
  const extraHighlights = property.extraHighlights ?? [];
  const price = toPositiveNumber(property.price);

  return (
    <div className="bg-bg text-fg transition-colors duration-300">
      {/* Hero with overlay */}
      <section className="relative h-[100vh]">
        <HeroSlider
          images={images}
          alt={`${property.title} for sale in ${property.location ?? "Goa"}`}
        />
      </section>

      {/* Split Layout */}
      <section className="grid md:grid-cols-2 gap-10 w-11/12 md:w-5/6 mx-auto py-16">
        {/* Gallery - Left Side */}
        <PhotoGallery images={images} title={property.title} />

        {/* Info + Description - Right Side */}
        <div className="sticky top-24 self-start space-y-6">
          {/* Title + Location + Price */}
          <h1 className="font-serif text-4xl font-light text-fg">
            {property.title}
          </h1>
          {property.location && (
            <p className="flex items-center gap-2 font-sans text-lg text-white/80">
              <MapPin size={18} className="text-primary" /> {property.location}
            </p>
          )}
          {price && (
            <p className="font-serif text-3xl font-semibold text-primary">
              ₹ {price.toLocaleString("en-IN")}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {property.type && (
              <span className={badgeClass}>
                <Home size={18} className="text-primary" /> {property.type}
              </span>
            )}
            {property.bedrooms && (
              <span className={badgeClass}>
                <BedDouble size={18} className="text-primary" />{" "}
                {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className={badgeClass}>
                🛁 {property.bathrooms} Baths
              </span>
            )}
            {property.areaSqft && (
              <span className={badgeClass}>
                📐 {property.areaSqft} Sqft
              </span>
            )}
          </div>

          {/* Description */}
          <h2 className="font-serif text-2xl font-light mt-6 text-fg">
            About this Property
          </h2>
          <p className="font-sans text-lg text-white/80 leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <>
              <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] mt-6 text-primary">
                Highlights
              </h3>
              <div className="flex flex-wrap gap-3">
                {highlights.map((h, idx) => (
                  <span key={idx} className={chipClass}>
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="col-span-2">
          {/* Video Tour */}
          {property.videoLink && (
            <section className=" py-12">
              <h2 className={sectionTitleClass}>Virtual Tour</h2>
              <div className="w-full h-[500px] overflow-hidden rounded-xl border border-border shadow">
                {property.videoLink.includes("youtube") ||
                property.videoLink.includes("youtu.be") ? (
                  <iframe
                    title={`${property.title} virtual tour`}
                    src={getYouTubeEmbedUrl(property.videoLink)!}
                    width="100%"
                    height="100%"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={property.videoLink}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </section>
          )}

          {/* Features */}
          {featuresAmenities.length > 0 && (
            <section className=" py-12">
              <h2 className={sectionTitleClass}>Features & Amenities</h2>
              <div className="flex flex-wrap gap-6">
                {featuresAmenities.map((f, idx) => (
                  <div key={idx} className={chipClass}>
                    {f}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nearby */}
          {nearby.length > 0 && (
            <section className=" py-12">
              <h2 className={sectionTitleClass}>Nearby Places</h2>
              <div className="flex flex-wrap gap-3">
                {nearby.map((n, idx) => (
                  <span key={idx} className={chipClass}>
                    {n}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Extra Highlights */}
          {extraHighlights.length > 0 && (
            <section className=" py-12">
              <h2 className={sectionTitleClass}>Extra Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {extraHighlights.map((eh, idx) => (
                  <span key={idx} className={chipClass}>
                    {eh}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Map */}
          {property.googleMapUrl && (
            <section className=" py-12">
              <h2 className={sectionTitleClass}>Location</h2>
              <iframe
                title={`${property.title} location map`}
                src={property.googleMapUrl}
                width="100%"
                height="450"
                loading="lazy"
                className="rounded-xl shadow border border-border"
              />
            </section>
          )}
        </div>
        <div className="col-span-1 mb-10">
          <div className="sticky top-28">
            <LeadForm />
          </div>
        </div>
      </div>

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-on-primary p-4 rounded-full shadow-xl cursor-pointer hover:scale-105 transition">
        <a
          href={BUSINESS.telephoneHref}
          className="flex items-center gap-2 font-sans font-semibold text-on-primary"
        >
          <Phone />
          <span>Enquire</span>
        </a>
      </div>

      <ContactInfo />
    </div>
  );
}
