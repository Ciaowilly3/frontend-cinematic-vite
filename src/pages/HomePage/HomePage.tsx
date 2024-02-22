import FilmsCarousel from '../../components/FilmsCarousel/FilmsCarousel';
import PublicFilmCards from '../../components/PublicFilmCards';

const HomePage = () => (
  <div>
    <div className="carousel-container my-5">
      <FilmsCarousel />
    </div>
    <div className="film-cards-container container">
      <PublicFilmCards />
    </div>
  </div>
);
export default HomePage;
