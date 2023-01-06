import loaderGIF from '../../assets/img/logoLoader.gif';

// Loader
function LoaderGame() {
    return (
        <div className='h-screen w-screen bg-[#000E44] flex flex-col justify-center items-center'>
            <img
                src={loaderGIF}
                alt="loader o'click"
            />
        </div>
    );
}

export default LoaderGame;

export function Loader() {
    return (
        <div className='flex flex-col items-center pt-6'>
            <progress className='progress w-56 progress-primary'></progress>
        </div>
    );
}
