import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const Detalhe = () => {
  const { anime } = useParams();
  const history = useHistory();
  const [info, setInfo] = useState({});

  function handleBackButton() {
    history.push("/");
  }
  useEffect(() => {
    const fetchAnime = async () => {
      const { data } = await axios.get(
        `https://kitsu.io/api/edge/anime?filter[slug]=${anime}`
      );
      setInfo(data);
    };
    fetchAnime();
  }, [anime]);

  return (
    <div>
      <Button onClick={handleBackButton}>Voltar</Button>
      {!info.data && (
        <div>
          <span className="carregando">Carregando...</span>
        </div>
      )}
      {info.data && (
        <div className="container-lg">
          {info.data.map((anime) => (
            <div className="detalhe" key={anime.id}>
              <h2 className="title">{anime.attributes.canonicalTitle}</h2>
              <img
                className="imgDetalhe"
                src={anime.attributes.posterImage.large}
                alt={"anime poster"}
              />
              <div className="text">
                <p className="text">
                  <span>Sinopse:</span> {anime.attributes.synopsis}
                </p>
                <p className="text">
                  <span>
                    Total de episódios: {anime.attributes.episodeCount}
                  </span>
                </p>
                <p className="text">
                  <span>Indicado para: {anime.attributes.ageRatingGuide}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detalhe;
