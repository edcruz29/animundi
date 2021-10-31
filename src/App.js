import { useEffect, useState } from "react";
import { HashRouter,Route} from "react-router-dom";
import qs from "qs";
import "./App.css";
import Pagination from "./components/Pagination";
import SearchInput from "./components/SearchInput";
import Detalhe from "./components/Detalhe";

const api = "https://kitsu.io/api/edge/";
const limit = 15;

function App() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState({});
  const [offset, setOffset] = useState(0);

  
  useEffect(() => {
    //setInfo({});
    const query = {
      page: {
        limit,
        offset,
      },
    };

    if (text) {
      query.filter = {
        text,
      };
    }
    
    fetch(`${api}anime?${qs.stringify(query)}`).then((response) =>
      response.json().then((response) => {
        setInfo(response);
      })
    );
  }, [text, offset]);

  return (
    <HashRouter>
        <div className="App">
         
          <h1 className="title">Animundi</h1>
          <Route path="/" exact render={()=>(
            <>
              <SearchInput value={text} onChange={(search) => setText(search)} />
          {text && !info.data && (
            <div>
              <span className="carregando">Carregando...</span>
            </div>
          )}
          {info.data && (
            <div className="container-lg">
              <ul className="lista">
                {info.data.map((anime) => (
                  <li className="lista__display" key={anime.id}>
                    <a href={`#/detalhe/${anime.attributes.slug}/`}>
                      <img
                      src={anime.attributes.posterImage.small}
                      alt={"anime poster"}
                    />
                    </a>
                    <p>{anime.attributes.canonicalTitle}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {info.meta && (
            <Pagination
              limit={limit}
              total={info.meta.count}
              offset={offset}
              setOffset={setOffset}
            />
          )}
           
            </>
          )}
          
        />
         <Route path="/detalhe/:anime/" exact component={Detalhe}/>
        </div>
      
    </HashRouter>
  );
}

export default App;
