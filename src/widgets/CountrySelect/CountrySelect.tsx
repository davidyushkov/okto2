import {useAtom, useSetAtom} from 'jotai';
import {allCountries} from 'data/data.ts';
import {countriesAtom, citiesAtom} from 'app/store.ts';
import Dropdown from 'components/Dropdown';
import './CountrySelect.css';

const CountrySelect = () => {
    const [countries, setCountries] = useAtom(countriesAtom);
    const setCities = useSetAtom(citiesAtom);

    const handleOnSelect = (country: string) => {
        if (countries.includes(country)) {
            setCountries(countries.filter(c => c !== country));
            setCities(cities => cities.filter(c => c.country !== country));
        } else {
            setCountries([...countries, country]);
        }
    }

    return (
        <div className='country-select'>
            <div className='country-label'>Choose countries:</div>
            <Dropdown placeholder='All countries' onChange={handleOnSelect} value={countries}>
                {allCountries.map((country) => (
                    <Dropdown.Item key={country} value={country}>{country}</Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    );
};

export default CountrySelect;