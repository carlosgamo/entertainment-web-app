import IconSearch from '../icons/IconSearch';

const SearchBar = ({changeSearch}) => { 

    return(
        <>
            <div id="search-bar" className="bg-white dark:bg-slate-800 text-lg 
            h-16 flex pt-6 pl-6 w-full text-gray-800 dark:text-slate-200">
                <IconSearch/> 
                <div className='pl-4 w-10/12'>
                    <input 
                        id='searchBarInput'
                        className='bg-transparent w-full focus:outline-none' 
                        placeholder='Search for movies or TV series'
                        onChange={() => changeSearch(searchBarInput.value.trim())}
                        />
                </div>
            </div>
        </>
        
    )
};

export default SearchBar;