import IconSearch from './icons/IconSearch';

const SearchBar = () => { 
    return(
        <>
            <div id="search-bar" className="bg-gray-900 text-lg h-16 flex pt-4 pl-6 w-full text-gray-500">
                <IconSearch/> 
                <div className='pl-4 w-10/12'>
                    <input 
                        className='bg-transparent w-full' 
                        placeholder='Search for movies or TV series'
                        />
                    
                </div>
            </div>
        </>
        
    )
};

export default SearchBar;