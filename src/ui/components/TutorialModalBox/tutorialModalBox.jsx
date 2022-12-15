import './tutorialModal.scss';
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export function TutorialModalBox({
  handleClose,
  show,
  carrouselImages,
  htmlBody = '',
  showImage = true
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const settings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  return (
    <div className={showHideClassName}>
      <section className="tutorial-modal-main">
        <div className='tutorial-modal-main__help'>
          <label className='tutorial-modal-main__label'>Precisa de ajuda?</label>
          <div className='tutorial-modal-main__icon-container' onClick={() => handleClose()}>
            <button className='button-close'>Fechar</button>
          </div>
        </div>
        <div className='tutorial-modal-main__container'>
          {showImage
            ?
              <Slider {...settings}>
              {
                carrouselImages.map((image, key) => {
                  return (
                    <div className='tutorial-modal-main__added-photo' key={key}>
                      <img src={image} className='tutorial-modal-main__photo' alt='foto carregada'/>
                    </div>
                  )
                })
              }
            </Slider>
            : <div className='tutorial-modal-main__content-container'>{htmlBody}</div>
          }
          <div className='tutorial-modal-main__info'>
            {/*<label className='tutorial-modal-main__text'>As setas nas laterais são utilizadas para passar as imagens.</label>*/}

            <label className='tutorial-modal-main__text '>Está com dificuldades com o computador?  <Link to='/help' className='link bold'> Clique aqui</Link></label>
          </div>
        </div>
      </section>
    </div>
  );
};
