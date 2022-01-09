import logo from '../../images/logo.png';
const navBarArray = [
    {
        title: 'Market',
        link: 'https://cryptoverse-report.netlify.app/',
    },
    {
        title: 'Exchanges',
        link: 'https://cryptoverse-report.netlify.app',
    },
    {
        title: 'CryptoCurrencies',
        link: 'https://cryptoverse-report.netlify.app',
    },
    {
        title: 'News',
        link: 'https://cryptoverse-report.netlify.app',
    }
];
const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
                <div className='flex flex-[0.5] justify-center items-center'>
                    <img src={logo} alt="logo" className='w-32' />
                </div>
                <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
                {navBarArray.map(({ title, link }, index) => {
                    return <p className='text-white text-base mx-2 cursor-pointer'>
                          <a href={link} target="_blank">{title}</a>
                    </p>;
                })}
                </div>
            </div>
            <div className='flex justify-center items-center flex-col mt-5'>
                <p className='text-white text-sm text-center'>Come join us <a href="https://dsouzastanleyportfolio.herokuapp.com/" target="_blank">@dsouzastanley</a> </p>
                <p className='text-white text-sm text-center'></p>

            </div>
            <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />
            <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className='text-white text-sm text-center'>Developed by Stanley Dsouza</p>
                <p className='text-white text-sm text-center'>All Righst Reserved@{currentYear}</p>
            </div>
        </div>
    );
}

export default Footer;