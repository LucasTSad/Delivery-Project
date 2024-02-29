import './App.css';
import Cards from './Cards';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Pagamento from './Pagamento';
import { useState } from 'react';

//importação das imagens // ---------------------------------------------------------------------- //
import agua from './assets/agua-mineral-crystal-500ml-7894900530001.jpg';
import coca from './assets/refrigerante-cocacola-lata-350ml.png';
import guarana from './assets/1935-refrigerante-guarana-antarctica-lata-350ml.jpg';                  
import fantauva from './assets/fanta-uva.png';   
import fantalaranja from './assets/refrigerante-fanta-laranja-lata-350ml-6eb.jpg';
import sprite from './assets/1982-refrigerante-sprite-lata-350ml.jpg';
import paoqueijo from './assets/Padaria-tradicional-pao-queijo-04.jpg';
import xtudo from './assets/receitas-de-x-tudo.jpg';
import macarrao from './assets/receita-macarrao-a-carbonara.jpg';
import acai from './assets/acai.jpg';
import chupechupe from './assets/geladinho-de-chocolate-cremoso.jpeg';
import pacoca from './assets/pacoca-1-feed1-282bc7143dc9004ce116776973355600-1024-1024.png';
// ---------------------------------------------------------------------------------------------- //

function App() {
    const categorias = [
        {
            nome: 'Bebidas',
            produtos: [
                { titulo: 'Água', texto: 'água mineral sem gás', preco: '1.50', img: agua },
                { titulo: 'Coca-cola', texto: 'coca-cola', preco: '3.10', img: coca },
                { titulo: 'Guaraná', texto: 'guarana', preco: '3.10', img: guarana },
                { titulo: 'Fanta-uva', texto: 'fanta-uva', preco: '3.20', img: fantauva},
                { titulo: 'Fanta-laranja', texto: 'fanta-laranja', preco: '3.20', img: fantalaranja},
                { titulo: 'Sprite', texto: 'sprite', preco: '3.10', img: sprite},
            ],
        },
        {
            nome: 'Comidas',
            produtos: [
                { titulo: 'Pão de Queijo', texto: 'pão de queijo 30 g', preco: '2.20', img: paoqueijo},
                { titulo: 'X-tudo', texto: 'pão,160g bovino,alface,bacon,queijo,ovo', preco: '30.99', img: xtudo },
                { titulo: 'Macarrão', texto: 'spaghetti,bacon,queijo parmesão', preco: '29.99', img: macarrao},
            ]
        },
        {
            nome: 'Sobremesas',
            produtos: [
                { titulo: 'Açaí', texto: 'açaí 500ml com granola, leite condensado', preco: '15.00',  img: acai},
                { titulo: 'ChupeChupe', texto: 'chupechupe de chocolate feito com nescau', preco: '8.50', img: chupechupe},
                { titulo: 'Paçoca', texto: 'paçoca quadrada', preco: '2.50', img: pacoca },
            ]
        }
    ];

    const [categoriaAtual, setCategoriaAtual] = useState('Comidas');
    const [carrinho, setCarrinho] = useState<{ titulo: string; preco: string; quantidade: number; img:string }[]>([]);
    const [mostrarPagamento, setMostrarPagamento] = useState(false);
    

    const onSelectCategory = (categoria: string) => {
    setCategoriaAtual(categoria);  
    };

    const addToCart = (produto) => {
        console.log('Adicionando ao carrinho:', produto);
        const itemExistenteIndex = carrinho.findIndex((item) => item.titulo === produto.titulo);
    
        if (itemExistenteIndex !== -1) {
        const updatedCarrinho = [...carrinho];
        updatedCarrinho[itemExistenteIndex].quantidade += 1;
        setCarrinho(updatedCarrinho);
        } else {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
        }
        console.log('Carrinho atualizado:', carrinho);
  };   

  const handleIrParaPagamento = () => {
    if(carrinho.length > 0) {
      setMostrarPagamento(true);
    }else{
      alert("Você precisa ter pelo menos 1 item no carrinho para prosseguir para o pagamento.")
    };
  }

  const handleFecharPagamento = () => {
    setMostrarPagamento(false);
  };  

  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => {
      return total + parseFloat(item.preco) * item.quantidade;
    }, 0).toFixed(2);
  }; 

  return (
    <>
      <Nav carrinho={carrinho} setCarrinho={setCarrinho} handleIrParaPagamento={handleIrParaPagamento} />
      <Header categorias={categorias} onSelectCategory={onSelectCategory} />
      {mostrarPagamento && <Pagamento handleFecharPagamento={handleFecharPagamento} totalCarrinho={calcularTotalCarrinho()} />}
      <div className="container-cards">
        {categorias.map((categoria, index) => (
          <div key={index} id={`categoria-${categoria.nome.toLowerCase()}`} style={{ display: categoria.nome === categoriaAtual ? 'block' : 'none' }}>
            <h2 className="categoria-titulo">{categoria.nome}</h2>
            <div className="cards-categoria">
            {categoria.produtos.map((produto, produtoIndex) => (
              <Cards key={produtoIndex} {...produto} addToCart={() => addToCart(produto)} />
            ))}
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default App;