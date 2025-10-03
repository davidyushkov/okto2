import {useAtomValue} from 'jotai';
import {Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {applyFilterToAtom, isFilterEnabledAtom, populationFilterAtom, populationFilterModeAtom} from 'app/store.ts';
import {getColor} from 'app/utils.ts';
import type { City, Mode, FilterApply } from 'app/types';
import {filterCities} from 'widgets/Filter/Filter.utils.ts';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({cities}: {cities: City[]}) => {
    const countries = Array.from(new Set(cities.map(c => c.country)));
    const isFilterEnabled = useAtomValue(isFilterEnabledAtom);
    const applyFilterTo = useAtomValue(applyFilterToAtom);
    const filterMode = useAtomValue(populationFilterModeAtom);
    const populationFilter = useAtomValue(populationFilterAtom);

    const filteredCities = filterCities(cities, {
        enabled: isFilterEnabled,
        applyTo: applyFilterTo as FilterApply,
        mode: filterMode as Mode,
        amount: populationFilter
    }, 'chart');

    const labels = countries.flatMap(country =>
        filteredCities.filter(c => c.country === country).map(c => c.city)
    );

    const datasets = countries.map((country, i) => ({
        label: country,
        data: labels.map(cityName => {
            const city = filteredCities.find(c => c.city === cityName && c.country === country);
            return city ? city.population : 0;
        }),
        backgroundColor: getColor(i),
    }));

    const data = {labels, datasets};

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top' as const},
            title: {display: true, text: 'City Populations by Country'},
        },
    };

    return <Bar data={data} options={options}/>;
};

export default PopulationChart;
