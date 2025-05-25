import React, { useState } from 'react'

const SearchBox = ({ onSearch }) => {
    const [searchText, setSeachText] = useState("");
    const handlerInputChange = (e) => {
        const text = e.target.value;
        setSeachText(text);
        onSearch(text)
    }
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Seach item " value={searchText} onChange={handlerInputChange} />
            <span className='input-group-text bg-warning'>
                <i className='bi bi-search'></i>
            </span>
        </div>
    )
}

export default SearchBox