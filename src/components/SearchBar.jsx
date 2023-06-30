import { useState } from 'react';
import IconSearch from '../icons/IconSearch';

const SearchBar = ({changeSearch}) => { 

    const [clearButton, setClearButton] = useState(false);

    function handleChange(){
        changeSearch(searchBarInput.value.trim())
        if(searchBarInput.value === ""){
            setClearButton(false)
        }else{
            setClearButton(true)
        }
    }

    function clearSearchBar(){
        searchBarInput.value = ""
        handleChange()
    }

    return(
        <>
            <div id="search-bar" className="bg-white dark:bg-neutral-900 text-lg 
            h-16 flex pt-6 pl-6 w-full text-gray-800 dark:text-slate-200">
                <IconSearch/> 
                {clearButton 
                    ? <button className='text-gray-400 ml-4 -mt-2' onClick={() => clearSearchBar()}>X</button> 
                    : null
                }
                <div className='pl-4 w-10/12 relative'>
                    <input 
                        id='searchBarInput'
                        className='bg-transparent w-full focus:outline-none' 
                        placeholder='Search for movies or TV series'
                        onChange={() => handleChange()}
                        />
                    
                </div>
            </div>
        </>
        
    )
};

export default SearchBar;