export interface IDataCinema {
    cinemaList: ICinemaList,
    isLoading: boolean,
    isFetching: boolean,
    isError: boolean,
}

export interface ICinema {
    cinemaName: string,
    city: string
}

export type ICinemaList = ICinema[]