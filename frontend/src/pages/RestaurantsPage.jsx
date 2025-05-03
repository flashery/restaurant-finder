import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getAnimeById } from "../helper/axiosHelper";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    getAnimeById(id)
      .then(setAnime)
      .catch((err) => console.error("Error fetching anime detail:", err));
  }, [id]);

  if (!anime) return <Loader show={true} />;

  return (
    <div className="anime-page">
      <h2 className="anime-title">{anime.title}</h2>
      <div className="anime-content">
        {anime.images?.jpg?.image_url && (
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="anime-image"
          />
        )}
        <div className="anime-info">
          <p>
            <strong>Rating:</strong> {anime.rating}
          </p>
          <p>
            <strong>Score:</strong> {anime.score}
          </p>
          <p>
            <strong>Status:</strong> {anime.status}
          </p>
          <p className="anime-synopsis">{anime.synopsis}</p>
        </div>
      </div>
    </div>
  );
}
