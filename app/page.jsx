import MyHome from "@/components/MyHome";
import Navbar from "@/components/navbar";
import Resume from "@/components/resume";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

export const metadata = {
  title: "Portfolio | Your Name",
  description: "Professional portfolio showcasing skills and projects",
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
