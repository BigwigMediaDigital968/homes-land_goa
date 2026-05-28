"use client";
import { useEffect } from "react";

import Footer from "../../components/Footer";
import HelpSection from "../../components/HelpSection";
import Hero, { Hero2 } from "../../components/Home/Hero";
import Navbar from "../../components/Navbar";
import PopularResidences from "../../components/PopularResidences";
import Stats from "../../components/Stats";
import { MapPin, User, ClipboardList, Handshake } from "lucide-react";
import ReviewSection from "../../components/Testimonial";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import WhatsAppButton from "../../components/floatingBtn";
import About from "../../components/Home/About";
import Services from "../../components/Home/Services";
import Testimonials from "../../components/Home/Testimonials";
import FeaturedProperties from "../../components/Home/FeaturedProperties";
import Blogs from "../../components/Home/Blogs";
import CallToAction from "../../components/Home/CallToAction";
import FAQ from "../../components/ui/FAQ";

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

  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      {/* <HeroSection/> */}
      <About />
      <Services />
      <FeaturedProperties />
      <CallToAction />
      <Testimonials />
      <Blogs />
      <div className="-mt-12">
        <FAQ/>
      </div>
      {/* 
      <PopularResidences />
      <Stats />

      <ReviewSection />
      <TopBlogs />
      <ContactInfo />
      {/* <HelpSection /> */}
      {/* <FAQPage />  */}
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}

export default Landing;
