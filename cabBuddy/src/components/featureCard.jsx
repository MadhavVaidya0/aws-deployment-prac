import { Users, FileText, Zap } from "lucide-react";

export default function FeatureCards() {
  return (
    <div className="w-full flex justify-center mt-16 mb-20">
      <div className="w-[75%] grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        
        { /* Card 1 */ }
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-5 rounded-full mb-4">
            <Users className="h-8 w-8 text-[#004c55]" />
          </div>
          <h3 className="text-xl font-semibold text-[#004c55]">
            Your pick of rides at low prices
          </h3>
          <p className="text-gray-600 mt-2">
            No matter where you're going, find the perfect ride from our wide 
            range of destinations and routes at low prices.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-5 rounded-full mb-4">
            <FileText className="h-8 w-8 text-[#004c55]" />
          </div>
          <h3 className="text-xl font-semibold text-[#004c55]">
            Trust who you travel with
          </h3>
          <p className="text-gray-600 mt-2">
            We take time to check reviews, profiles, and IDs so you know 
            who you're travelling with for a safe and secure trip.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-5 rounded-full mb-4">
            <Zap className="h-8 w-8 text-[#004c55]" />
          </div>
          <h3 className="text-xl font-semibold text-[#004c55]">
            Scroll, click, tap and go!
          </h3>
          <p className="text-gray-600 mt-2">
            Booking a ride is easier than ever. Thanks to our simple, fast 
            app, you can find a ride near you in minutes.
          </p>
        </div>

      </div>
    </div>
  );
}
