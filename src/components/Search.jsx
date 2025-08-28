import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
    return (
        <div className="Search">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                <img src="./Vector.png" alt="search" className="w-5 h-5" />

                <input 
                type="text" 
                placeholder='Search for Movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none flex-1 text-white"
                />
            </div>
            </div>
    )
}

export default Search