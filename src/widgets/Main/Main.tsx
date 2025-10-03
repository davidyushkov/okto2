import {useAtomValue} from 'jotai';
import {citiesAtom} from 'app/store.ts';
import PopulationChart from 'widgets/PopulationChart/PoulationChart.tsx';
import './Main.css';

const Main = () => {
    const cities = useAtomValue(citiesAtom);

    return (
        <div className="main-container">
            {cities.length > 0
                ? <PopulationChart cities={cities}/>
                : <div className='main-hint'>Select countries and cities to view the population chart</div>}
        </div>
    )
};

export default Main;