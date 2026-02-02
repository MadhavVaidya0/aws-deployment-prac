import { useNavigate } from "react-router-dom";  // ✅ Perfect for Vite
import SearchBox from "@/components/searchBox";
import FeatureCards from "@/components/featureCard";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = ({ source, destination, date }) => {
    const params = new URLSearchParams();
    if (source?.trim()) params.set("source", source.trim());
    if (destination?.trim()) params.set("destination", destination.trim());
    if (date) params.set("date", date);
    
    const queryString = params.toString();
    navigate(`/search?${queryString}`);
  };

  return (
    <div className="w-full">
      <div
        className="h-[45vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center pt-8"
        style={{ backgroundImage: "url('/assets/pic1.svg')" }}
      >
        <h1 className="text-5xl font-bold text-white mt-25">
          Quality rides that fit your budget
        </h1>
        <p className="text-white text-lg mb-25">
          Book your cab quickly and easily
        </p >
        <SearchBox onSubmit={handleSearch} />
      </div>
      <div className="mt-[20vh] md:mt-40">
        <FeatureCards />
      </div>
    </div>
  );
}
