import MyHome from "@/components/MyHome";
import Navbar from "@/components/navbar";
import Resume from "@/components/resume";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

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
      <MyHome />
      <Resume />
      <Projects />
      <Footer />
    </main>
  );
}
