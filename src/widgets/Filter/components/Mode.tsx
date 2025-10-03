import {useAtom} from 'jotai';
import {populationFilterModeAtom} from 'app/store.ts';
import Dropdown from 'components/Dropdown';
import {modeOptions} from '../Filter.constants.ts';
import {getLabelByValue} from '../Filter.utils.ts';

const Mode = ({label}: {label: string}) => {
    const [populationMode, setPopulationMode] = useAtom(populationFilterModeAtom);

    const handleOnModeChange = (value: string) => {
        setPopulationMode(value);
    };

    return (
        <div>
            <div className='filter-label'>{label}:</div>
            <Dropdown placeholder='Choose population mode' value={[getLabelByValue(populationMode, modeOptions)]} onChange={handleOnModeChange}>
                {modeOptions.map((option) =>
                    <Dropdown.Item key={option.value} value={option.value}>{option.label}</Dropdown.Item>)}
            </Dropdown>
        </div>
    );
};

export default Mode;