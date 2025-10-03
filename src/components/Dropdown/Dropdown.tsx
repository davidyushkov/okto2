import {cloneElement, Children, type ReactElement} from 'react';
import {FILTER_ENABLE_COUNT} from './Dropdown.constants.ts';
import {useVisibilityState, useDropdown} from './Dropdown.hooks.ts';
import {getDropdownLabel} from './Dropdown.utils.ts';
import type {DropdownProps, DropItemProps} from './Dropdown.types.ts';
import './Dropdown.css';

const Dropdown = ({placeholder, value, onChange, disabled, children}: DropdownProps) => {
    const {visible, hide, toggle} = useVisibilityState();
    const {filteredChildren, handleOnChangeFilter, dropdownRef, filterValue} = useDropdown(children, hide);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div onClick={toggle} className={`dropdown-label ${visible ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
                {getDropdownLabel(placeholder, value)}
            </div>
            {visible && (
                <div className='dropdown-menu'>
                    {(children.length >= FILTER_ENABLE_COUNT) && <div className='dropdown-filter'>
                        <input type='text' className='filter-input' autoFocus placeholder='filter'
                            value={filterValue} onChange={handleOnChangeFilter}/>
                        {(children.length > filteredChildren.length) && <div className='render-hint'>
                            Rendered {filteredChildren.length} of {children.length} items</div>}
                    </div>}
                    <div className='dropdown-options'>
                        {Children.toArray(filteredChildren).map((child) => {
                            const element = child as ReactElement<DropItemProps>;
                            return cloneElement(element, {onChange, active: value.includes(element.props.value)});
                        })}
                        {(filteredChildren.length === 0 && filterValue) && <div className='filter-hint'>Please refine the filter</div>}
                        {children.length === 0 && <div>There is no result due the current filter</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
