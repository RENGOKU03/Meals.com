import { useState } from "react"
import { useGlobalContext } from "../Context"

const Search=()=>{
    const [text, settext] = useState()
    const handelChange = (e) =>{
        settext(e.target.value)
    }
    const handelSubmit = (e) =>{
        e.preventDefault()
    }
    return <header className="search-container"> 
        <form >
            <input type="text" placeholder="Type Your Favourite Meal"  className="form-input" value={text} onClick={handelChange}/>
            <button className="btn" type="submit">Search</button>
            <button className="btn btn hipster" type="button">Surprise Me</button>
        </form>
    </header>
}
export default Search