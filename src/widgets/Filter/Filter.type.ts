import type { FilterApply, Mode } from 'app/types.ts';

export type FilterOptions = {
    enabled: boolean;
    mode: Mode;
    applyTo: FilterApply,
    amount: number
};