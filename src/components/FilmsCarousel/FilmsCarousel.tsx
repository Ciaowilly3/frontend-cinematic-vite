import { useRetrieveAllFilmsQuery } from "../../services/film/api";

const FilmsCarousel = () => {
  const {
    data: films,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveAllFilmsQuery();
  if (isError) {
    return <span className="text-danger">Error</span>;
  } else if (isLoading || isFetching) {
    return <span className="loader"></span>;
  } else
    return (
      <div>
        <h1>Cinemas</h1>
        {films?.map((film, index) => (
          <ul key={index}>
            <li>{film.title}</li>
          </ul>
        ))}
      </div>
    );
};
export default FilmsCarousel;
