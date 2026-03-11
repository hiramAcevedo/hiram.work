import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LocaleSuggester from "@/components/LocaleSuggester";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Hiram Acevedo",
      url: "https://hiram.work",
      jobTitle: "Fullstack Developer",
      email: "hiram@hiram.work",
      sameAs: [
        "https://github.com/hiramAcevedo",
        "https://linkedin.com/in/hiram-acevedo",
        "https://hiramlab.center",
      ],
    },
    {
      "@type": "WebSite",
      name: "Hiram Acevedo",
      url: "https://hiram.work",
    },
  ],
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Education />
        <Contact />
      </main>
      <Footer />
      <LocaleSuggester />
    </>
  );
}
