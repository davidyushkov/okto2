export type City = {
    city: string;
    country?: string;
    population: number;
};

export type Mode = '>' | '<';
export type FilterApply = 'chart' | 'dropdown' | 'all';