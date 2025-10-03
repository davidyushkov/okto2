import {useState} from 'react';
import {useSetAtom, useAtomValue} from 'jotai';
import {citiesByCountry} from 'data/data.ts';
import {citiesAtom, isFilterEnabledAtom, applyFilterToAtom, populationFilterModeAtom, populationFilterAtom} from 'app/store.ts';
import type {FilterApply, Mode} from 'app/types.ts';
import Dropdown from 'components/Dropdown';
import {filterCities} from 'widgets/Filter/Filter.utils.ts';

const CitySelect = ({country}: {country : string}) => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const setCities = useSetAtom(citiesAtom);
    const isFilterEnabled = useAtomValue(isFilterEnabledAtom);
    const applyFilterTo = useAtomValue(applyFilterToAtom);
    const filterMode = useAtomValue(populationFilterModeAtom);
    const populationFilter = useAtomValue(populationFilterAtom);

    const handleOnChange = (city: string) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(c => c !== city));
            setCities(cities => cities.filter(c => c.city !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
            const cityData= citiesByCountry[country].find(c => c.city === city);
            if (cityData) {
                setCities(cities => [...cities, {country, city, population: cityData.population}]);
            }
        }
    };

    const citiesList = filterCities(citiesByCountry[country], {
        enabled: isFilterEnabled,
        applyTo: applyFilterTo as FilterApply,
        mode: filterMode as Mode,
        amount: populationFilter
    }, 'dropdown');

    return (
        <div className='city-select'>
            <Dropdown placeholder={`${country}'s cities`} value={selectedCities} onChange={handleOnChange}>
                {citiesList.map(({city}) => (
                    <Dropdown.Item key={city} value={city}>{city}</Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    );
};

export default CitySelect;