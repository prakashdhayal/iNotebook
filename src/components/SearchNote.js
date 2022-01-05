import React,{useState} from 'react'

const SearchNote = (props) => {
    const [keyword, setKeyword] = useState("")
    const searchNote = (e) => {
        e.preventDefault();
        props.setSearch(keyword)
    }
    const onChange=(e)=>{
        setKeyword(e.target.value);
    }
    return (
        <div>
            <form className="d-flex" onSubmit={searchNote}>
                <input className="form-control me-2" type="search" value={keyword} onChange={onChange} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchNote
