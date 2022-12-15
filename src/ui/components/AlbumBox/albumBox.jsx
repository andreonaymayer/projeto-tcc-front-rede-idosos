import './album.scss';

export function AlbumBox({album, getPost}) {
  return (
    <a className='album-container' id={album.id} onClick={() => getPost(album)}>
      <div className='album-container__wrapper-photo'>
        <img src={album.url} alt="foto do usuário" className='album-container__photo'/>
      </div>
      <div className='album-container__open-post album-container__open-post__span'>
        Abrir publicação dessa imagem
      </div>
    </a>
  );
}

