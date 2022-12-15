import './modal.scss';
import React from 'react';

export function ModalBox({
  handleClose,
  show,
  title,
  mainText,
  buttonText,
  buttonClass,
  isSoftDeleteModal = false
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='modal-main__icon-container' onClick={() => handleClose()}>
          <svg
            size='50'
            viewBox="0 0 13 13"
            fill="none"
            width= '15'
            height= '15'
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.85045 6.59008L12.2439 2.20619C12.4363 2.01377 12.5444 1.75279 12.5444 1.48066C12.5444 1.20853 12.4363 0.947542 12.2439 0.755118C12.0515 0.562693 11.7906 0.45459 11.5185 0.45459C11.2464 0.45459 10.9855 0.562693 10.7931 0.755118L6.4098 5.14922L2.02654 0.755118C1.83414 0.562693 1.57319 0.45459 1.3011 0.45459C1.02901 0.45459 0.768064 0.562693 0.575666 0.755118C0.383269 0.947542 0.275181 1.20853 0.275181 1.48066C0.275181 1.75279 0.383269 2.01377 0.575666 2.20619L4.96915 6.59008L0.575666 10.974C0.4799 11.069 0.403889 11.182 0.352017 11.3065C0.300144 11.431 0.273438 11.5646 0.273438 11.6995C0.273438 11.8344 0.300144 11.968 0.352017 12.0925C0.403889 12.217 0.4799 12.33 0.575666 12.425C0.67065 12.5208 0.783656 12.5968 0.908164 12.6487C1.03267 12.7006 1.16622 12.7273 1.3011 12.7273C1.43598 12.7273 1.56953 12.7006 1.69404 12.6487C1.81855 12.5968 1.93155 12.5208 2.02654 12.425L6.4098 8.03094L10.7931 12.425C10.8881 12.5208 11.0011 12.5968 11.1256 12.6487C11.2501 12.7006 11.3836 12.7273 11.5185 12.7273C11.6534 12.7273 11.7869 12.7006 11.9114 12.6487C12.0359 12.5968 12.149 12.5208 12.2439 12.425C12.3397 12.33 12.4157 12.217 12.4676 12.0925C12.5195 11.968 12.5462 11.8344 12.5462 11.6995C12.5462 11.5646 12.5195 11.431 12.4676 11.3065C12.4157 11.182 12.3397 11.069 12.2439 10.974L7.85045 6.59008Z" fill="black"/>
          </svg>
        </div>
        <div className='modal-main__container'>
          <span className='modal-main__title'>{title}</span>
          <span className='modal-main__text'>{mainText}</span>
          <button className={`modal-main__button ${buttonClass}`} onClick={() => handleClose()}>{buttonText}</button>
        </div>
      </section>
    </div>
  );
};
