import {useAtom} from 'jotai';
import {populationFilterAtom} from 'app/store.ts';
import Dropdown from 'components/Dropdown';
import {amountOptions} from '../Filter.constants.ts';
import {getLabelByValue} from '../Filter.utils.ts';

const Amount = ({label}: {label: string}) => {
    const [population, setPopulation] = useAtom(populationFilterAtom);

    const handleOnChange = (value: string) => {
        setPopulation(+value);
    };

    return (
        <div>
            <div className='filter-label'>{label}:</div>
            <Dropdown placeholder="population amount" value={[getLabelByValue(population, amountOptions)]} onChange={handleOnChange}>
                {amountOptions.map((option) =>
                    <Dropdown.Item key={option.value} value={option.value.toString()}>{option.label}</Dropdown.Item>)}
            </Dropdown>
        </div>
    );
};

export default Amount;