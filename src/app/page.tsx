import { About } from "@/components/About";
import { BookingBar } from "@/components/BookingBar";
import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <BookingForm />
        <Testimonials />
        <Faq />
        <Location />
      </main>
      <Footer />
      <BookingBar />
    </>
  );
}
