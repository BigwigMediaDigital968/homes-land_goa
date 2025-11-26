"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "../../components/Footer";
import HelpSection from "../../components/HelpSection";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import PopularResidences from "../../components/PopularResidences";
import Stats from "../../components/Stats";
import { MapPin, User, ClipboardList, Handshake } from "lucide-react";
import ReviewSection from "../../components/Testimonial";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import WhatsAppButton from "../../components/floatingBtn";
import TopBlogs from "../../components/TopBlogs";
import buy from "../../assets/buy.avif";
import rent from "../../assets/rent.avif";
import Image from "next/image";
import Link from "next/link";
import abc from "../../assets/abc.avif";
import sell from "../../assets/sell.webp";
import ContactInfo from "../../components/ContactInfo";
import FAQPage from "../../components/Faq";

const features = [
  {
    icon: <MapPin size={32} />,
    title: "Expert Guidance",
    description:
      "Benefit from our team's seasoned expertise for a smooth buying experience",
  },
  {
    icon: <User size={32} />,
    title: "Personalized Service",
    description:
      "Our services adapt to your unique needs, making your journey stress-free",
  },
  {
    icon: <ClipboardList size={32} />,
    title: "Transparent Process",
    description:
      "Stay informed with our clear and honest approach to buying your home",
  },
  {
    icon: <Handshake size={32} />,
    title: "Exceptional Support",
    description:
      "Providing peace of mind with our responsive and attentive customer service",
  },
];

function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="w-11/12 md:w-5/6 mx-auto py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[var(--title)] mb-12 tracking-widest">
          What Are You Looking For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Buy */}
          <Link href="/buy">
            <div className="relative group h-72 md:h-96 cursor-pointer">
              <Image src={buy} alt="Buy" fill className="object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0a2342]/80 group-hover:bg-[#0a2342]/70 transition" />
              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-4xl font-bold ">
                  Buy
                </h3>
              </div>
            </div>
          </Link>

          {/* ✅ Rent */}
          <Link href="/rent">
            <div className="relative group h-72 md:h-96 cursor-pointer">
              <Image src={rent} alt="Rent" fill className="object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-red-500/70 group-hover:bg-red-500/60 transition" />
              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-4xl font-bold">
                  Rent
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <PopularResidences />
      <Stats />

      {/* ✅ Parallax Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${abc.src})`, // replace with your image
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 px-4">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4 tracking-widest"
            data-aos="fade-up"
          >
            Find Your Dream Home
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto tracking-widest"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover carefully curated residences that reflect your lifestyle
            and aspirations, where comfort meets elegance.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-12 w-11/12 md:w-5/6 mx-auto text-center tracking-widest"
        data-aos="fade-up"
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[var(--title)] tracking-widest">
          Why Choose Us
        </h2>
        <p className="text-lg md:text-xl text-[var(--primary-color)] mb-12">
          Elevating Your Home Buying Experience with Expertise, Integrity,{" "}
          <br />
          and Unmatched Personalized Service
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[var(--bg-color)] text-left p-6  shadow-sm hover:shadow-md transition-all"
              data-aos="zoom-in-up"
              data-aos-delay={index * 200} // stagger animation
            >
              <div className="bg-[var(--bg-color)] p-3 rounded-md w-fit mb-4 text-[var(--title)]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--title)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--primary-color)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ReviewSection />
      <TopBlogs />
      {/* ✅ Parallax Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${sell.src})`, // replace with your image
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 px-4"></div>
      </section>
      <ContactInfo />
      {/* <HelpSection /> */}
      <FAQPage />
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}

export default Landing;
