"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/buy-banner.jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContactInfo from "../../../components/ContactInfo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LeadForm } from "../../../components/LeadForm";
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
}

export default function BuyPage() {
  const [selectedType, setSelectedType] = useState("All Locations");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [locations, setLocations] = useState<string[]>([]);

  const buyRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const GOA_LOCATIONS = [
    "All Locations",
    "Panaji",
    "Mapusa",
    "Calangute",
    "Tiswadi Taluka",
    "Candolim",
    "Baga",
  ];

  // Fetch properties
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`)
      .then((res) => res.json())
      .then((data: Property[]) => {
        const buyProps = data.filter(
          (p: Property) => p.purpose?.toLowerCase() === "buy"
        );

        setProperties(buyProps);
        setLoading(false);

        // Generate unique locations
        setLocations(GOA_LOCATIONS);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply filters
  const filtered = properties.filter((p) => {
    const typeMatch =
      selectedType === "All Locations" ||
      p.type?.toLowerCase().trim() === selectedType.toLowerCase().trim();

    const locationMatch =
      selectedLocation === "All Locations" ||
      p.location
        ?.toLowerCase()
        .trim()
        .includes(selectedLocation.toLowerCase().trim());

    return typeMatch && locationMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);
  const startIdx = (currentPage - 1) * propertiesPerPage;
  const paginatedProperties = filtered.slice(
    startIdx,
    startIdx + propertiesPerPage
  );

  const scrollToNext = () => {
    if (buyRef.current) {
      const yOffset = -50;
      const y =
        buyRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > maxVisible + 1) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - maxVisible) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="relative h-[70vh] md:h-[100vh] bg-black text-white flex items-center justify-center">
        <Image
          src={banner}
          alt="Goa Homes"
          fill
          className="object-cover opacity-70"
        />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-widest">
            Find Your Dream Home in Goa
          </h1>
          <p className="mt-4 text-lg tracking-widest">
            Apartments • Villas • Plots
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </motion.div>
      </div>

      {/* FILTERS */}
      <motion.div
        className="px-4 md:px-10 sticky top-0 bg-white shadow-md z-20 flex flex-wrap gap-4 p-4 justify-between tracking-widest"
        initial="hidden"
        animate="visible"
      >
        <div></div>

        {/* TYPE FILTER */}
        <div className="flex gap-3">
          {["All", "Apartment", "Villa", "Plot"].map((type) => (
            <motion.button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedType === type
                  ? "bg-[#E50E0B] text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>

        {/* LOCATION FILTER */}
        <motion.select
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 !text-black hover:bg-gray-200 outline-none cursor-pointer"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc} className="!text-black bg-white">
              {loc}
            </option>
          ))}
        </motion.select>
      </motion.div>

      {/* PROPERTY LIST */}
      <div ref={buyRef} className="py-12">
        {loading ? (
          <p className="text-center py-12 text-gray-500">Loading...</p>
        ) : paginatedProperties.length === 0 ? (
          <div className="text-center py-20 text-gray-600 tracking-widest">
            <h2 className="text-3xl font-semibold mb-3">
              No Properties Match Your Search
            </h2>

            <p className="text-lg opacity-90">
              Tell us what you're looking for, and our team will share the best
              options curated for you.
            </p>

            <div className="w-full md:max-w-3xl mx-auto py-10">
              <LeadForm />
            </div>
          </div>
        ) : (
          <>
            <motion.div
              className="w-11/12 md:w-5/6 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 tracking-widest"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {paginatedProperties.map((p) => (
                <motion.div
                  key={p._id}
                  className="overflow-hidden shadow-md hover:shadow-xl transition bg-white"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                >
                  <div className="relative h-64 w-full">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-4 bg-[var(--bg-color)]">
                    <h3 className="font-semibold text-[var(--title)] text-lg line-clamp-1">
                      {p.title}
                    </h3>

                    {p.location && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          p.location
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[var(--primary-color)]"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="font-semibold text-base line-clamp-1">
                          {p.location}
                        </span>
                      </a>
                    )}

                    {p.price !== null && (
                      <p className="mt-1 font-semibold text-gray-800">
                        ₹ {p.price?.toLocaleString()}
                      </p>
                    )}

                    {p.type && (
                      <p className="mt-1 text-sm text-gray-600 flex items-center">
                        <Home size={16} className="mr-1" /> {p.type}
                      </p>
                    )}
                    <Link href={`/buy/${p.slug}`}>
                      <button
                        className="px-6 py-3 bg-[#E50E0B] text-white font-semibold 
                      w-full mt-4 rounded relative overflow-hidden group cursor-pointer"
                      >
                        <span className="relative z-10 tracking-widest">
                          View Details
                        </span>
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent translate-x-[-100%] 
                        group-hover:translate-x-[100%] transition-transform duration-700"
                        />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {getPageNumbers().map((num, idx) =>
                  num === "..." ? (
                    <span key={idx} className="px-3 py-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(num as number)}
                      className={`px-3 py-2 rounded border ${
                        currentPage === num
                          ? "bg-[#E50E0B] text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ContactInfo />
      <Footer />
    </div>
  );
}
