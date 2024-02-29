import React, { useState, useEffect } from 'react';
import './Header.css';
import imagem1 from './assets/5989769.png';

interface Produto {
    titulo: string;
    texto: string;
    preco: string;
    img: string;
}

interface Categoria {
    nome: string;
    produtos: Produto[];
}

interface Props {
    categorias: Categoria[];
    onSelectCategory: (nome: string) => void;
}

const Header: React.FC<Props> = ({ categorias, onSelectCategory }) => {
    const diasDaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const [selectedCategory, setSelectedCategory] = useState<string>('Comidas');

    const obterDiaAtual = (): string => {
        const dataAtual = new Date();
        const diaDaSemana = diasDaSemana[dataAtual.getDay()];
        return diaDaSemana;
    };

    const [selectedDay] = useState<string>(obterDiaAtual);
    const [estabelecimentoAberto, setEstabelecimentoAberto] = useState<boolean>(false);
    

    useEffect(() => {
        setEstabelecimentoAberto(EstabelecimentoAberto());
    }, [selectedDay]);

    const EstabelecimentoAberto = () => {
        const DiaAtual = new Date().getDay();
        const HoraAtual = new Date().getHours();

        const DiaDaSemana = DiaAtual >= 1 && DiaAtual <= 5;
        const HorarioDeFuncionamento = HoraAtual >= 10 && HoraAtual < 22;

        return DiaDaSemana && HorarioDeFuncionamento;
    };

    return (
        <div className="header-container">
            <div className="header-fundo">
                <div className="header-conteudo">
                    <img src={imagem1} alt="Logo" />
                    <p className='header-titulo'>Lanches Bons</p>
                </div>
            </div>
            <div className="horarios">
                <p className='horarios-funcionamento'>Funcionamos de Segunda à Sexta de 10h até 22h</p>
                <h1 className='horarios-dia'>hoje é <span>{selectedDay}</span></h1>
                <p className='horario-status'>Estamos: <span>{estabelecimentoAberto ? 'Abertos 😊' : 'Fechados 😢'}</span></p>
            </div>
            <hr />
            <div className="header-categorias">
                <ul className="header-lista">
                    {categorias.map((categoria, index) => (
                        <li
                            key={index}
                            className={`header-lista-categoria ${categoria.nome === selectedCategory ? 'categoria-selecionada' : ''}`}
                            onClick={() => {
                                onSelectCategory(categoria.nome);
                                setSelectedCategory(categoria.nome);
                            }}
                        >
                            {categoria.nome}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
