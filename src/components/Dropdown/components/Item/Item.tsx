import type {DropItemProps} from '../../Dropdown.types.ts';
import './Item.css';

const Item = ({value, onChange, active, children}: DropItemProps) => {
    const handeOnClick = () => {
        if (onChange) {
            onChange(value);
        }
    }

    //TODO: generally children is just text, so need to truncate it, could be a different component
    return <div className={`dropdown-item ${active ? 'active' : ''}`} onClick={handeOnClick}>{children}</div>
}

export default Item;