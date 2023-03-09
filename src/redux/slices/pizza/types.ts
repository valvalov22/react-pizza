export type TPizza = {
id: string;
title: string;
price: number;
imageUrl: string;
types: number[];
sizes: number[];
}

export enum PizzaStatus {
LOADING = 'loading',
SUCCESS = 'success',
ERROR = 'error'
}

export interface IPizzaSliceState {
items: TPizza[];
status: PizzaStatus;
}