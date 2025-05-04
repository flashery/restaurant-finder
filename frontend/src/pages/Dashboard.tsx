import { useState, useCallback } from "react";
import SearchInput from "../components/SearchInput";
import Restaurants from "../components/Restaurants";
import { searchRestaurant } from "../helper/axiosHelper";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRestaurant = useCallback(async (q: string) => {
    if (!q.trim()) return;

    try {
      setLoading(true);
      const data = await searchRestaurant(q);
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);


  const handleSearch = (q: string) => {
    getRestaurant(q);
    setLoading(true);
  };

  return (
    <div className="container">
      <h1>Restaurant Finder</h1>
      <SearchInput
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />
      <Restaurants restaurants={restaurants} loading={loading} />
    </div>
  );
}
