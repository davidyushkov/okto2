import type {ReactElement, ReactNode, FC} from 'react';
import type DropdownItem from './components/Item/Item.tsx';

export type DropdownProps = {
    placeholder: string;
    value: string[];
    onChange: (selected: string) => void; // TODO: change to object
    children: ReactElement<DropItemProps>[];
    disabled?: boolean;
};

export type DropItemProps = {
    value: string,
    onChange?: (selected: string) => void, // TODO: change to object
    active?: boolean,
    children: ReactNode;
};

export type DropdownExport = FC<DropdownProps> & {
    Item: typeof DropdownItem;
};