import {useAtomValue} from 'jotai';
import {countriesAtom} from 'app/store.ts';
import CitySelect from './components/CitySelect';
import './CitiesSelect.css';

const CitiesSelect = () => {
    const countries = useAtomValue(countriesAtom);

    if (countries.length === 0) {
        return null;
    }

    return (
        <div className='cities-select'>
            <div className='cities-label'>Choose cities:</div>
            {countries.map(country => <CitySelect key={country} country={country}/>)}
        </div>
    );
};

export default CitiesSelect;