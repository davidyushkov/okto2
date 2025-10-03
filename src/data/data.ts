import citiesData from './cities.json';

export const allCountries: string[] = [];
export const citiesByCountry: Record<string, ({ city: string, population: number })[]> = {};

for (const city of citiesData.data) {
    if(city.city === 'null' || !city.populationCounts[0].value || city.city === 'based') {
        continue;
    }

    if (!allCountries.includes(city.country)) {
        allCountries.push(city.country);
    }

    if (!citiesByCountry[city.country]) {
        citiesByCountry[city.country] = [];
    }

    citiesByCountry[city.country].push({
        city: city.city,
        population: Number(city.populationCounts[0].value),
    });
}