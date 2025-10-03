import {type ChangeEvent} from 'react';
import {useAtom} from 'jotai';
import {isFilterEnabledAtom} from 'app/store.ts';
import Amount from './components/Amount.tsx';
import Mode from './components/Mode.tsx';
import Apply from './components/Apply';
import './Filter.css';

const Filter = () => {
    const [filterEnabled, setFilterEnable] = useAtom(isFilterEnabledAtom);

    const handleOnChangeEnabler = (e: ChangeEvent<HTMLInputElement>) =>
        setFilterEnable(e.target.checked);

    return (
        <div className="filter">
            <div className='filters-label'>Filter options:</div>
            <div>
                <label htmlFor='filter-enabler'>Enable:</label>
                <input id='filter-enabler' type='checkbox' checked={filterEnabled} onChange={handleOnChangeEnabler} />
            </div>
            {filterEnabled && <>
                <Mode label='Mode'/>
                <Amount label='Amount'/>
                <Apply label='Apply To'/>
            </>}
        </div>
    );
};

export default Filter;