import type {City, FilterApply} from 'app/types.ts';
import type {FilterOptions} from './Filter.type.ts';

export const getLabelByValue = (value: any, options: ({label: string, value: any})[]) => {
    const option = options.find(o => o.value === value);

    return option ? option.label : '';
};

export const filterCities = (cities: City[], options: FilterOptions, target: FilterApply) => {
    if (!options.enabled || options.applyTo !== target) {
        return cities;
    }

    return cities.filter(city => {
        if (options.mode === '>') return city.population >= options.amount;
        if (options.mode === '<') return city.population <= options.amount;
        return true;
    });
};