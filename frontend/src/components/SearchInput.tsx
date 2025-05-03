import { useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { searchAnime } from "../helper/axiosHelper";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function SearchInput() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [animes, setAnimes] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(false);

  /**
   * I wrap getAnime in useCallback, because I am using it in a debounce inside useMemo.
   * getAnime is defined inline, it will be recreated every render,
   * which technically causes debounce(getAnime, 300) to use a new function.
   */
  const getAnime = useCallback(async (q: string) => {
    if (!q.trim()) return;

    try {
      setShowLoader(true);
      const data = await searchAnime(q);
      setAnimes(data);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.error("Error searching anime:", error);
    }
  }, []);

  /**
   * I use useMemo here to ensure that debounce(getAnime, 300)
   * is only created once and reused on every render. Why not use useCallback?
   * Because debounce() returns a function, not a callback to pass to another component.
   * Using useMemo will memoize the returned value of debounce(...).
   */
  const optimizeSearch = useMemo(() => debounce(getAnime, 300), []);

  /**
   * First I checks if the user actually typed something meaningful. So that
   * we don't waste an API request when there's no real input.
   * I also cancel any pending debounce call on the cleanup function to prevent
   * possible cause of errors or state updates on unmounted components
   */
  useEffect(() => {
    if (query.trim()) {
      optimizeSearch(query);
    } else {
      setAnimes([]);
    }
    return () => optimizeSearch.cancel();
  }, [query, optimizeSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search anime"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <Loader show={showLoader} />

      {animes.length > 0 && (
        <ul className="animes">
          {animes.map((anime) => (
            <li
              key={anime.mal_id}
              className="anime-result"
              onClick={() => navigate(`anime/${anime.mal_id}`)}
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="anime-thumb"
              />
              <span className="anime-title">{anime.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
