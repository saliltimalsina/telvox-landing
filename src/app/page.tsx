import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import WhyTelvox from "@/components/WhyTelvox";
import Industries from "@/components/Industries";
import Onboarding from "@/components/Onboarding";
import Calculator from "@/components/Calculator";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Features />
        <Benefits />
        <WhyTelvox />
        <Industries />
        <Onboarding />
        <Calculator />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
