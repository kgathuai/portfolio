import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const Hero = dynamic(() => import("@/components/hero"), { ssr: true });
const Resume = dynamic(() => import("@/components/resume"), { ssr: true });
const Projects = dynamic(() => import("@/components/projects"), { ssr: true });

export const metadata = {
  title: "Ernest Kungu | Portfolio",
  description:
    "Professional portfolio showcasing skills and projects of Ernest Kungu Njoroge",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Resume />
      <Projects />
      <Footer />
    </main>
  );
}
