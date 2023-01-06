// Library
import { useSelector } from 'react-redux';

function Life() {
    // States
    const life = useSelector((state: any) => state.life);
    const maxLife = useSelector((state: any) => state.life_max_value);

    return (
        <progress
            className='progress progress-info w-56 h-4  border-2 border-white monster'
            value={life}
            max={maxLife}
        ></progress>
    );
}

export default Life;
