import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutTeam from "@/components/about/AboutTeam";
import AboutServices from "@/components/about/AboutServices";

export default function About() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        <AboutStory />
        <AboutStats />
        <AboutTeam />
        <AboutServices />
      </div>
    </div>
  );
}
