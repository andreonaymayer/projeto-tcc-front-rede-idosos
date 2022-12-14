import './createEvent.scss';
import React, { useState } from 'react';
import register from '../../../images/register.svg'
import { Link, useHistory } from 'react-router-dom';
import { useApi } from '../../../hooks/api';
import { ModalBox } from '../index';

export function CreateEventBox() {
	const [titulo, setTitulo] = useState('');
	const [startDate, setStartDate] = useState('');
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [urlImg, setUrlImg] = useState('');
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const history = useHistory();
	const api = useApi();

	async function createEvent() {
		const response = await api.createEvent(
      startDate,
      description,
      titulo,
      urlImg
		);
		if (response && response.status === 200) {
			setShowModalSuccess(true)
      history.push('/home-events')
		} else {
			setShowModalFailed(true)
		}
	}


	function handleSubmit(event) {
		event.preventDefault();
		createEvent();
	}

	function onChangeTitulo(event) {
		setTitulo(event.target.value);
	}

	function onChangeAddress(event) {
		setAddress(event.target.value);
	}

	function onChangeDescription(event) {
		setDescription(event.target.value);
	}

	function onChangeStartDate(event) {
		setStartDate(event.target.value);
	}

	function closeModal(succeed) {
		setShowModalSuccess(false);
		setShowModalFailed(false);
	}

  async function addPhoto(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let image = new FormData();
    image.append('file', file);
    event.target.value = null;
    const response = await api.postImage(image);

    if (response.status === 200) {
      setUrlImg(response.data)
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true)
    }
  }

	return (
		<>
			<ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal(true)}
        title='Cadastro realizado!'
        mainText='O seu cadastro foi realizado com sucesso.'
				buttonText='Cadastro bem sucedido!'
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Cadastro não realizado!'
        mainText='O seu cadastro não foi realizado.'
				buttonText='Falha ao cadastrar!'
				buttonClass='modal-main__button--danger'
      />
			<div className='create-event-container'>
				<div className='create-event-container__welcome'>
					<h1 className='create-event-title'>Vamos cadastrar seu evento!</h1>
					<h2 className='create-event-subtitle'>
            Precisamos de algumas informações para criar o seu evento,<br/>
            preencha os campos abaixo. Ao clicar em registrar seu evento será salvo e publicado.
					</h2>
				</div>
				<div className='create-event-wrapper'>
					<div className='create-event-wrapper__enter'>
						<div className='create-event-wrapper__layout'>
							<div className='create-event-wrapper__inputs'>
								<label className='create-event-wrapper__input-password'>Título</label>
								<input type='text' placeholder='Nome do evento' className='create-event-wrapper__input' onChange={onChangeTitulo}></input>
								<label className='create-event-wrapper__input-password'>Data de Início</label>
								<input type='date' placeholder='Exemplo: 01/01/1962' className='create-event-wrapper__input' onChange={onChangeStartDate}></input>
								<label className='create-event-wrapper__input-password'>Descrição</label>
								<input type='text' placeholder='Exemplo: sobre o que o evento se trata' className='create-event-wrapper__input' onChange={onChangeDescription}></input>
								<label className='create-event-wrapper__input-password'>Endereço</label>
								<input type='text' placeholder='Exemplo: Local do evento' className='create-event-wrapper__input' onChange={onChangeAddress}></input>
							</div>
							<div className='create-event-submit'></div>
						</div>
						<div className='create-event-wrapper__layout'>
              <div className='create-event-submit--container'>
                <button className='create-event-submit__button create-event-submit__button--reset'>
                    Adicione uma imagem
                </button>

                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className="create-event-submit__input"
                  onChange={addPhoto}
                />
              </div>
							<button className='create-event-submit__button' onClick={handleSubmit}>
								Registrar&nbsp;&nbsp;
								<img src={register} />
							</button>
              <Link to="home-events" className='create-event-submit__button create-event-submit__button--delete link'>Voltar</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
