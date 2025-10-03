import {atom} from 'jotai';
import type {City} from './types.ts';

export const countriesAtom = atom<string[]>([]);
export const citiesAtom = atom<City[]>([]);

export const populationFilterAtom = atom<number>(1000);
export const populationFilterModeAtom = atom<string>('>');
export const applyFilterToAtom = atom<string>('chart');
export const isFilterEnabledAtom = atom<boolean>(false);