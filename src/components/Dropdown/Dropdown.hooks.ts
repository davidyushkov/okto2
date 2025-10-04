import {useState, useEffect, useRef, useMemo, Children, type RefObject, type ReactNode, type ChangeEvent} from 'react';
import {DEBOUNCE_DELAY, LIMIT_ITEMS} from 'components/Dropdown/Dropdown.constants.ts';
import {debounce} from 'app/utils.ts';
import type {DropdownProps} from 'components/Dropdown/Dropdown.types.ts';

export const useVisibilityState = (initial: boolean = false) => {
    const [visible, setVisible] = useState(initial);

    const toggle = () => setVisible(v => !v);
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    return {visible, toggle, hide, show};
}

//TODO: also on Esc button hide
export const useClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    onClickOutside: () => void
) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref]);
};

export const useDropdown = (children: DropdownProps['children'], hide: () => void) => {
    const [filteredChildren, setFilteredChildren] = useState<ReactNode[]>(Children.toArray(children).slice(0, LIMIT_ITEMS));
    const [filterValue, setFilterValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => debounceFilter(filterValue), [children]);
    useClickOutside(dropdownRef, hide);

    const debounceFilter = useMemo(() => {
        return debounce((query: string) => {
            setFilteredChildren(children.filter(child =>
                child.props.value.toLowerCase().includes(query.toLowerCase())).slice(0, LIMIT_ITEMS)
            );
        }, DEBOUNCE_DELAY);
    }, [children]);

    const handleOnChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilterValue = e.target.value;
        setFilterValue(newFilterValue);
        debounceFilter(newFilterValue);
    };

    return {filteredChildren, handleOnChangeFilter, dropdownRef, filterValue};
}