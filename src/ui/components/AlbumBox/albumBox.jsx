import './album.scss';

export function AlbumBox({ album, getPost }) {
	return (
    <div className='album-container' id={album.id} onClick={() => getPost(album)}>
      <div className='album-container__wrapper-photo'>
        <img src={album.url} alt="foto do usuário" className='album-container__photo'/>
      </div>
      <h4 className='album-container__open-post'>Abrir publicação dessa imagem</h4>
    </div>
	);
}

