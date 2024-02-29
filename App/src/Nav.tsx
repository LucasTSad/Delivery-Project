import { useState, useEffect } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import './Nav.css';

interface NavProps {
  carrinho: {
    titulo: string;
    preco: string;
    quantidade: number;
    img: string;
  }[];
  setCarrinho: React.Dispatch<
    React.SetStateAction<
      {
        titulo: string;
        preco: string;
        quantidade: number;
        img: string;
      }[]
    >
  >;
  handleIrParaPagamento: () => void;
}
  

function Nav({ carrinho, setCarrinho, handleIrParaPagamento }: NavProps) {
  const [cartTab, setCartTab] = useState(false);
  const [totalItens, setTotalItens] = useState(0)  

  const handleCartScreenClick = () => {
    setCartTab(!cartTab);
    };

  const handleQuantidadeMenos = (index: number) => {
    const updatedCarrinho = [...carrinho];
    if (updatedCarrinho[index].quantidade > 1) {
      updatedCarrinho[index].quantidade -= 1;
    }else{
        updatedCarrinho.splice(index,1);
    }
    setCarrinho(updatedCarrinho);
  };

  const handleQuantidadeMais = (index: number) => {
    const updatedCarrinho = [...carrinho];
    updatedCarrinho[index].quantidade += 1;
    setCarrinho(updatedCarrinho);
  };

  useEffect(() => {
    const total = carrinho.reduce((total, item) => total + item.quantidade, 0);
    setTotalItens(total);
  }, [carrinho]);

  return (
    <nav className="nav-container">
      <div className={`nav-cart ${cartTab ? 'cart-open' : ''}`}>
        <button onClick={handleCartScreenClick} className="nav-icone">
          <FaCartShopping />
        </button>     
        {totalItens > 0 && <p className="cart-badge">{totalItens}</p>}
      </div>
      <div className={`cart-tab ${cartTab ? 'visible' : ''}`}>
        <div className="cart-head">
            <p className="cart-tab-titulo">Meu Carrinho</p>
            <button className="cart-tab-finalizarCompra" onClick={() => {handleIrParaPagamento();}}>
              Ir para o Pagamento
            </button>  
        </div>
        <hr className='cart-barra'/> 
          <ul className='cart-itens'>
            {carrinho.map((item, index) => (
              <li key={index} className="cart-conteudo">
                <img src={item.img} className="cart-imagem" alt={item.titulo} />
                <p>{item.titulo}</p>
                <p>R${item.preco}</p>
                <div className="cart-quantidade">
                  <button className="onRemoveOne" onClick={() => handleQuantidadeMenos(index)}>
                    -
                  </button>
                  <p className="quantidade">{item.quantidade}</p>
                  <button className="onAddOne" onClick={() => handleQuantidadeMais(index)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>       
      </div>
    </nav>
  );
}

Nav.propTypes = {
  carrinho: PropTypes.arrayOf(
    PropTypes.shape({
      titulo: PropTypes.string.isRequired,
      preco: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      quantidade: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCarrinho: PropTypes.func.isRequired,
};

export default Nav;
