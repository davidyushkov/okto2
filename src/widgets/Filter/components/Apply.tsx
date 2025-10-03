import {useAtom} from 'jotai';
import {applyFilterToAtom} from 'app/store.ts';
import Dropdown from 'components/Dropdown';
import {applyOptions} from '../Filter.constants.ts';
import {getLabelByValue} from '../Filter.utils.ts';

const Apply = ({label}: {label: string}) => {
    const [applyFilter, setApplyFilter] = useAtom(applyFilterToAtom);

    const handleOnAppyChange = (value: string) => {
        setApplyFilter(value);
    }

    return (
        <div>
            <div className='filter-label'>{label}:</div>
            <Dropdown placeholder='choose apply'
                value={[getLabelByValue(applyFilter, applyOptions)]} onChange={handleOnAppyChange}>
                {applyOptions.map((option) =>
                    <Dropdown.Item  key={option.value} value={option.value}>{option.label}</Dropdown.Item>)}
            </Dropdown>
        </div>
    );
};

export default Apply;