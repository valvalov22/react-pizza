export enum sortProperty {
RATING_DESC = 'rating',
TITLE_DESC = 'title',
PRICE_DESC = 'price',
RATING_ASC = '-rating',
TITLE_ASC = '-title',
PRICE_ASC = '-price'
}

export type TSort = {
name: string;
sort: sortProperty;
}

export interface IFilterSliceState {
searchValue: string;
categoryId: number;
currentPage: number;
sort: TSort;
}