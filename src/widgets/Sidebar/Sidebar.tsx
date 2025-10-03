import CountrySelect from 'widgets/CountrySelect/CountrySelect';
import CitiesSelect from 'widgets/CitiesSelect/CitiesSelect';
import Filter from 'widgets/Filter/Filter.tsx';
import './Sidebar.css';

const Sidebar = () => (
    <div className='sidebar'>
        <CountrySelect/>
        <Filter/>
        <CitiesSelect/>
    </div>
);

export default Sidebar;