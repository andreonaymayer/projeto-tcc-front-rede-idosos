import React from 'react';
import { Chat, Header } from '../../components';
import './index.scss'

export function HelpScreen() {
	return (
    <div className="help-container">
      <Chat />
      <Header />
      <div className="help-container__info">
        {/* sempre classname para adicionar uma classe, adiciona a classe no arquivo index.scss dentro da pasta help mesmo
        pode ser o nome da classe completo tambem ex: .help-container-text-papapa {} e ja era pae
        */}
        <label>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
           when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
             It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</label>
      </div>
    </div>
	);
}
