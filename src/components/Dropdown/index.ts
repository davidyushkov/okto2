import Dropdown from './Dropdown';
import Item from './components/Item/Item.tsx';
import type {DropdownExport} from './Dropdown.types.ts';

const DropdownExported = Dropdown as DropdownExport;
DropdownExported.Item = Item;

export default DropdownExported;