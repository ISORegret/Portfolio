const films = [
  { title: 'Tilt Time', src: '/films/tilt-time.mp4', poster: '/films/tilt-time-poster.jpg' },
  { title: 'Panel Pours', src: '/films/panel-pours.mp4', poster: '/films/panel-pours-poster.jpg' },
];

export default function FilmGallery() {
  return (
    <section id="films" className="iso-section iso-films" aria-labelledby="films-heading">
      <div className="iso-section-head">
        <div><p className="iso-eyebrow">Construction in motion</p><h2 id="films-heading" className="iso-heading">FILMS<span className="iso-gold">.</span></h2></div>
      </div>
      <div className="iso-film-grid">
        {films.map(film => (
          <figure key={film.src} className="iso-film-card">
            <video controls playsInline preload="none" poster={film.poster} aria-label={film.title}>
              <source src={film.src} type="video/mp4" />
              Your browser does not support this video. <a href={film.src}>Watch {film.title}</a>.
            </video>
            <figcaption>{film.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
