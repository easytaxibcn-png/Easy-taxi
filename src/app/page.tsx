import { CookieBanner } from "@/components/taxi/CokkieBanner";
import { ContactForm } from "@/components/taxi/ContactForm";
import { Destinations } from "@/components/taxi/Destination";
import { DriversSection } from "@/components/taxi/DriverSection";
import { FeaturesBar } from "@/components/taxi/FeatureBar";
import { Footer } from "@/components/taxi/Footer";
import { Header } from "@/components/taxi/Header";
import { HeroSection } from "@/components/taxi/Hero-Section";
import { HowItWorks } from "@/components/taxi/HowItWork";
import { TaxiTypes } from "@/components/taxi/TaxiTypes";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      <HeroSection />

      <FeaturesBar />
      <TaxiTypes />
      <HowItWorks />

      <Destinations />
      <DriversSection />
      <ContactForm />
      <Footer />
      <CookieBanner />
    </main>
  )
}
