import { useState,useEffect  } from 'react';
import './Pagamento.css';

interface PagamentoProps {
    handleFecharPagamento: () => void;    
    totalCarrinho: string;
}

function Pagamento({handleFecharPagamento, totalCarrinho}: PagamentoProps) {
    const [formaPagamento, setFormaPagamento] = useState('');
    const [formaEntregue, setFormaEntregue] = useState('');

    const handlePagamentoCartao = () => {
        return (
            <div>
                <div className={formaPagamento === 'cartao' ? 'conteudo-visivel' : 'conteudo-invisivel'}>
                    <div className='tipo-cartao-espacamento'>
                        <div>
                            <input type="radio" name='tipo-pagamento' value="credito" className="pagamento-radio" />
                            <label form='credito' className="radio-texto">Crédito</label>
                        </div>
                        <div>
                            <input type="radio" name='tipo-pagamento' value="debito" className="pagamento-radio" />
                            <label form="debito" className="radio-texto">Débito</label>
                        </div>
                    </div>
                    <p className='info'>Número do cartão:</p>
                    <input type='number' max={16} className='input-caixa' placeholder='XXXX-XXXX-XXXX-XXXX'/>
                    <p className="info">CVV:</p>
                    <input type='number' max={3} className='input-caixa'placeholder='XXX'/>
                    <p className="info">Validade:</p>
                    <div className="validade-container">
                        <div>
                            <select className='validade-box'>
                                <option value={1}>01</option>
                                <option value={2}>02</option>
                                <option value={3}>03</option>
                                <option value={4}>04</option>
                                <option value={5}>05</option>
                                <option value={6}>06</option>
                                <option value={7}>07</option>
                                <option value={8}>08</option>
                                <option value={9}>09</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                        <div>
                            <select className='validade-box'>
                                <option value={1}>2024</option>
                                <option value={2}>2025</option>
                                <option value={3}>2026</option>
                                <option value={4}>2027</option>
                                <option value={5}>2028</option>
                                <option value={6}>2029</option>
                                <option value={7}>2030</option>
                                <option value={8}>2031</option>
                                <option value={9}>2032</option>
                                <option value={10}>2033</option>
                                <option value={11}>2034</option>
                                <option value={12}>2035</option>
                            </select>
                        </div>
                    </div>
                    <p className="info">CPF:</p>
                    <input type="number" max={11} className='input-caixa' placeholder='XXX.XXX.XXX-XX'/>
                    <p className="info">Nome:</p>
                    <input type="text" className='input-caixa' />
                </div>
            </div>
        );
    }

    const handlePagamentoDinheiro = () => {
        return (
            <div>
                <div className={formaPagamento === 'dinheiro' ? 'conteudo-visivel' : 'conteudo-invisivel'}>
                    <p className='info'>Troco para quanto</p>
                    <input type="number" className='input-caixa' placeholder='XX.XX' />
                </div>
            </div>
        );
    }

    const handleEntregueDelivery = () => {
        return (
            <div>
                <div className={formaEntregue === 'entrega' ? 'conteudo-visivel' : 'conteudo-invisivel'}>
                    <p className="info">CEP:</p>
                    <input type="number" max={8} className='input-caixa' placeholder='XXXXX-XX' />
                    <p className="info">Endereço:</p>
                    <input type="text" className="input-caixa" placeholder='AVENIDA/RUA' />
                    <p className="info">Número:</p>
                    <input type="number" className="input-caixa" placeholder='132' />
                    <p className="info">Ponto de Referência:</p>
                    <textarea className='input-obs'/>
                    <p className="info">Nome do destinatário</p>
                    <input type="text" className="input-caixa" placeholder='Seu Nome'/>
                </div>
            </div>
        );
    }

    const handleEntregueBuscar = () => {
        return (
            <div className={formaEntregue === 'buscar' ? 'conteudo-visivel' : 'conteudo-invisivel'}>
                <p className="info">Nome do Cliente</p>
                <input type="text" className="input-caixa" placeholder='Seu Nome'/>
            </div>
        );
    }

    const handleFormaPagamentoChange = (event) => {
        setFormaPagamento(event.target.value);
    }

    const handleEntregueChange = (event) => {
        setFormaEntregue(event.target.value);
    }

    const isPagamentoCartao = formaPagamento === 'cartao';
    const isPagamentoDinheiro = formaPagamento === 'dinheiro';

    const isEntregueDelivery = formaEntregue === 'entrega';
    const isEntregueBuscar = formaEntregue === 'buscar';

    function verificarCamposPreenchidos() {
        if (isPagamentoCartao) {
            const cartaoRadio = document.querySelector('input[name="tipo-pagamento"]:checked') as HTMLInputElement;
            const numeroCartao = (document.querySelector('.input-caixa[placeholder="XXXX-XXXX-XXXX-XXXX"]') as HTMLInputElement)?.value;
            const cvv = (document.querySelector('.input-caixa[placeholder="XXX"]') as HTMLInputElement)?.value;
            const validadeMes = (document.querySelector('.validade-box:first-child') as HTMLSelectElement)?.value;
            const validadeAno = (document.querySelector('.validade-box:last-child') as HTMLSelectElement)?.value;
            const cpf = (document.querySelector('.input-caixa[placeholder="XXX.XXX.XXX-XX"]') as HTMLInputElement)?.value;
            const nome = (document.querySelector('.input-caixa') as HTMLInputElement)?.value;
    
            return (
                cartaoRadio !== null &&
                cartaoRadio.value !== '' &&
                numeroCartao !== undefined && numeroCartao !== '' &&
                cvv !== undefined && cvv !== '' &&
                validadeMes !== undefined && validadeMes !== '' &&
                validadeAno !== undefined && validadeAno !== '' &&
                cpf !== undefined && cpf !== '' &&
                nome !== undefined && nome !== ''
            );
    
        } else if (isPagamentoDinheiro) {
            const troco = (document.querySelector('.input-caixa[placeholder="XX.XX"]') as HTMLInputElement)?.value;
            return troco !== undefined && troco !== '';
        } else {
            if (isEntregueDelivery) {
                const cep = (document.querySelector('.input-caixa[placeholder="XXXXX-XX"]') as HTMLInputElement)?.value;
                const endereco = (document.querySelector('.input-caixa[placeholder="AVENIDA/RUA"]') as HTMLInputElement)?.value;
                const numero = (document.querySelector('.input-caixa[placeholder="132"]') as HTMLInputElement)?.value;
                const pontoReferencia = (document.querySelector('.input-obs') as HTMLTextAreaElement)?.value;
                const nomeDestinatario = (document.querySelector('.input-caixa[placeholder="Seu Nome"]') as HTMLInputElement)?.value;
    
                return (
                    cep !== undefined && cep !== '' &&
                    endereco !== undefined && endereco !== '' &&
                    numero !== undefined && numero !== '' &&
                    pontoReferencia !== undefined && pontoReferencia !== '' &&
                    nomeDestinatario !== undefined && nomeDestinatario !== ''
                );
            } else if (isEntregueBuscar) {
                const nomeCliente = (document.querySelector('.input-caixa[placeholder="Seu Nome"]') as HTMLInputElement)?.value;
                return nomeCliente !== undefined && nomeCliente !== '';
            } 
        }
    }    

    const handleFinalizarPagamento = () => {
        if(!verificarCamposPreenchidos()){
            alert("Por favor preencha todos os campos para finalizar sua compra.")
        }else{
            handleFecharPagamento
            const link = document.getElementById('pagar-link') as HTMLAnchorElement | null;
            if (link) {
                link.href = `https://api.whatsapp.com/send?phone=32984273594&text=Obrigado por escolher nossa loja em Lanches Bons,espero que goste dos nossos lanches!O total de sua compra foi R$ ${totalCarrinho}`;
            }          
        }
    };  

    useEffect(() => {
        setFormaPagamento('');
        setFormaEntregue('');
    }, []);

    return (
        <div className="pagamento-container">
            <div className="pagamento-box">
                <div>
                    <div className="pagamento-header">
                        <button className="pagamento-fechar" onClick={handleFecharPagamento}>X</button>
                        <h3 className="pagamento-titulo">Forma de Pagamento:</h3>
                    </div>

                    <div className="pagamento-tipos">
                        <div>
                            <label form="cartao" className='radio-texto'>Cartão</label>
                            <input type="radio" name="pagamento" value="cartao" className="pagamento-radio" onChange={handleFormaPagamentoChange} />
                            {formaPagamento === 'cartao' && handlePagamentoCartao()}
                        </div>
                        <div>
                            <label form="dinheiro" className='radio-texto'>Dinheiro</label>
                            <input type="radio" name="pagamento" value="dinheiro" className="pagamento-radio" onChange={handleFormaPagamentoChange} />
                            {formaPagamento === 'dinheiro' && handlePagamentoDinheiro()}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="pagamento-titulo">Forma de Entrega:</h3>
                    <div className="pagamento-tipos">
                        <div>
                            <label form="entrega" className='radio-texto'>Entrega</label>
                            <input type="radio" name="forma" value="entrega" className="pagamento-radio" onChange={handleEntregueChange} />
                            {formaEntregue === 'entrega' && handleEntregueDelivery()}
                        </div>
                        <div>
                            <label form="buscar" className='radio-texto'>Retirada</label>
                            <input type="radio" name="forma" value="buscar" className="pagamento-radio" onChange={handleEntregueChange} />
                            {formaEntregue === 'buscar' && handleEntregueBuscar()}
                        </div>
                    </div>
                </div>
                <h2 className="pagamento-titulo">Observação</h2>
                <div className="textarea-obs">
                    <textarea className='textarea-observ' placeholder='tirar cebola,adicionar carne...'/>
                </div>

                <div className="preco-total">
                    <h4 className="preco-total-texto">O preço total da compra é:</h4>
                    <p className="preco-total-texto-preco">R$ {totalCarrinho}</p>
                </div>
                <a id='pagar-link' className="pagar" onClick={handleFinalizarPagamento} href='#'>
                    Finalizar Compra
                </a>
            </div>
        </div>
    );
}


export default Pagamento;