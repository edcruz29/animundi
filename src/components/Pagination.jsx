import React from 'react'

const maxItens = 3;
const maxLeft = (maxItens - 1) /2;

const Pagination  = ({limit, total, offset, setOffset}) => {

    const paginaAtual = offset ?(offset/limit)+1:1;
    const paginas = Math.ceil(total/limit); 
    const primeira =Math.max (paginaAtual-maxLeft, 1);

    function onPageChange(pagina){
        setOffset((pagina-1) * limit)
    }

    return (
        <ul className="pagination">
            <li>
                <button className="pagination__item--back"
                  onClick={()=>onPageChange(paginaAtual-1)}
                  disabled={paginaAtual===1}
                >
                    Anterior
                </button>
            </li>
            {Array.from({length: Math.min(maxItens, paginas)})
            .map((_, index)=> index+primeira)
            .map((pagina)=>(
                <li key={pagina}>
                    <button 
                    onClick={()=>onPageChange(pagina)}
                    className={pagina===paginaAtual ?"pagination__item--active":"pagination__item"} 
                    >{pagina}
                    </button>
                    
                </li>
                
            ))}
            <li>
                <button 
                className="pagination__item--next" 
                onClick={()=>onPageChange(paginaAtual+1)}
                disabled={paginaAtual===paginas}
                >
                    Próxima
                </button>
            </li>
        </ul>
      );
}
 
export default Pagination ;