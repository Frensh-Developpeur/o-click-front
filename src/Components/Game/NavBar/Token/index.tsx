// Libraries
import tokenImg from '../../../../assets/img/ozeille.png';
import { useSelector } from 'react-redux';

function Token() {
    // State
    const Token = useSelector((state: any) => state.token);

    return (
        <div className='flex items-center w-[10rem]'>
            <img
                className='w-12'
                src={tokenImg}
                alt='monnaie'
            />
            <p className='pl-2 text-2xl text-white p-2'>{Token}</p>
        </div>
    );
}

export default Token;
