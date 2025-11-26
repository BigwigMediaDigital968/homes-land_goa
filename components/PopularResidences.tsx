"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { MapPin, BedDouble, Ruler } from "lucide-react";
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

        // Filter based on purpose
        const filtered = data
          .filter(
            (p: Property) => p.purpose?.toLowerCase() === purpose.toLowerCase()
          )
          .slice(0, 3); // ✅ show only 3

        setProperties(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [purpose]);

  if (loading) return null; // skip loader, keep clean

  if (properties.length === 0) return null; // ✅ Don’t render section if empty

  return (
    <section className="py-12 bg-white">
      <p className="uppercase tracking-widest text-center">{title}</p>
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-[var(--title)] mb-12 tracking-widest"
        data-aos="fade-up"
      >
        Our Popular Residences for {purpose === "buy" ? "Buy" : "Rent"}
      </h2>

      {/* Grid */}
      {/* Flex Wrap instead of Grid */}
      <div className="flex flex-wrap justify-center gap-8 w-11/12 md:w-5/6 mx-auto">
        {properties.map((house, index) => (
          <Link
            key={house._id}
            href={`/${purpose}/${house.slug}`}
            scroll={true}
          >
            <div
              className="bg-[var(--bg-color)]  shadow-lg overflow-hidden flex flex-col cursor-pointer w-80"
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
            >
              {/* ✅ Image */}
              <div className="relative h-60 w-full flex items-center justify-center bg-gray-100">
                {house.images?.length > 0 ? (
                  <Image
                    src={house.images[0]}
                    alt={house.title}
                    fill={house.images.length > 1 ? true : undefined}
                    width={house.images.length === 1 ? 300 : undefined}
                    height={house.images.length === 1 ? 200 : undefined}
                    className={
                      house.images.length === 1
                        ? "object-contain"
                        : "object-cover"
                    }
                    unoptimized
                  />
                ) : (
                  <div className="h-60 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="font-semibold text-[var(--title)] text-lg line-clamp-1">
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

                <div className="flex items-center justify-between text-[var(--title)] text-sm">
                  {house.bedrooms && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-5 h-5" />
                      <span>{house.bedrooms} Rooms</span>
                    </div>
                  )}
                  {house.size && (
                    <div className="flex items-center gap-1">
                      <Ruler className="w-5 h-5" />
                      <span>{house.size}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ✅ Export both Buy + Rent Sections
const PopularResidences = () => {
  return (
    <>
      <PropertySection title="New Properties" purpose="buy" />
      <PropertySection title="Featured Rentals" purpose="rent" />
    </>
  );
};

export default PopularResidences;
