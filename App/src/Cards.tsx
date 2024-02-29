import PropTypes from 'prop-types';
import './Cards.css';

function Cards(props){
    return(
        <button className='Card' onClick={props.addToCart}>
            <div className="container">            
                <h1 className='titulo'>{props.titulo}</h1>
                <p className='texto'>{props.texto}</p>
                <p className='preco'>R${props.preco}</p>
            </div>
            <img src={props.img} alt={props.texto} className='imagem'/>
        </button>
    );
}

Cards.propTypes = {
    titulo: PropTypes.string,
    texto: PropTypes.string,
    preco: PropTypes.string,
    img: PropTypes.string,
    addToCart: PropTypes.func.isRequired
}

export default Cards