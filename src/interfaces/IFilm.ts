export interface IFilm {
    coverImg: string,
    title: string,
    nationOfProduction: string,
    plot: string,
    rating: number,
    funFacts: string
}

export type IFilms = IFilm[]

export interface IDataFilms {
    films : IFilms,
    isFetching : boolean,
    isLoading : boolean,
    isError : boolean
}