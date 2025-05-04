import { FoursquarePlace } from "@shared/types/foursquare";
import Loader from "./Loader";

const GM_URL = import.meta.env.VITE_GM_URL
export default function Restaurants({ restaurants, loading }: { restaurants: FoursquarePlace[], loading: boolean }) {
  if (!restaurants.length) return null;

  return (
    <>
    {loading && <Loader show={loading} />}
    <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((r) => {
        const loc = r.location;
        const geo = r.geocodes?.main;
        const gmaps = `${GM_URL}${geo.latitude},${geo.longitude}`;

        return (
          <div
            key={r.fsq_id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-1">{r.name}</h2>
            {r.open_now !== undefined && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${r.open_now ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {r.open_now ? "Open Now" : "Closed"}
              </span>
            )}
            {r.categories?.[0] && (
              <img
                src={`${r.categories[0].icon.prefix}64${r.categories[0].icon.suffix}`}
                alt={r.categories[0].name}
                className="w-12 h-12 mb-2"
              />
            )}
            <p className="text-sm text-gray-700">{loc?.formatted_address}</p>
            <a
              href={gmaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:underline text-sm"
            >
              View on Google Maps
            </a>
            {typeof r.rating === "number" && (
              <div
                className={`mt-2 text-sm font-medium ${r.rating >= 7
                  ? "text-green-600"
                  : r.rating >= 4
                    ? "text-yellow-600"
                    : "text-red-600"
                  }`}
              >
                ⭐ {r.rating} / 10
              </div>
            )}
          </div>
        );
      })}
    </div>
    </>
  );
}
