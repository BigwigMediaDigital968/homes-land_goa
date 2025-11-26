"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
  bedrooms?: number;
  size?: string;
}

const PropertySection = ({
  title,
  purpose,
}: {
  title: string;
  purpose: "buy" | "rent";
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    const fetchProperties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`);
        const data = await res.json();

        const filtered = data
          .filter(
            (p: Property) => p.purpose?.toLowerCase() === purpose.toLowerCase()
          )
          .slice(0, 3);

        setProperties(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [purpose]);

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <p className="uppercase tracking-widest text-center">{title}</p>

      <h2
        className="text-3xl md:text-4xl font-semibold text-center text-[var(--title)] mb-12 tracking-widest"
        data-aos="fade-up"
      >
        Our Popular Residences for {purpose === "buy" ? "Buy" : "Rent"}
      </h2>

      <div className="flex flex-wrap justify-center gap-8 w-11/12 md:w-5/6 mx-auto">
        {properties.map((house, index) => (
          <Link
            key={house._id}
            href={`/${purpose}/${house.slug}`}
            scroll={true}
            className="w-80"
          >
            <div
              className="bg-[var(--bg-color)] shadow-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
            >
              {/* 🔥 AUTO HORIZONTAL SLIDE ON HOVER */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <div className="flex h-full w-max transition-transform duration-[12000ms] ease-linear group-hover:-translate-x-[80%]">
                  {house.images.map((img, i) => (
                    <div key={i} className="relative h-60 w-80 flex-shrink-0">
                      <Image
                        src={img}
                        alt={`${house.title}-${i}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="font-semibold text-[var(--title)] text-base line-clamp-1">
                  {house.title}
                </h3>

                {house.location && (
                  <div className="flex items-center text-[var(--title)]">
                    <MapPin className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold text-[var(--title)] text-base line-clamp-1">
                      {house.location}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const PopularResidences = () => {
  return (
    <>
      <PropertySection title="New Properties" purpose="buy" />
      <PropertySection title="Featured Rentals" purpose="rent" />
    </>
  );
};

export default PopularResidences;
