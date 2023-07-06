import { useState } from "react"
import { useGlobalContext } from "../Context"

const Search=()=>{
    const [text, settext] = useState('')
    const {setSearchTerm, fetchRandomMeal}=useGlobalContext()
    const handelChange = (e) =>{
        settext(e.target.value)
    }
    const handelSubmit = (e) =>{
        e.preventDefault()
        if(text){
            setSearchTerm(text)
        }
    }
    
    const handelRandomMeal = () =>{
        setSearchTerm(text)
        settext('')
        fetchRandomMeal()
    }

    return <header className="search-container"> 
        <form onSubmit={handelSubmit}>
            <input type="text" placeholder="Type Your Favourite Meal"  className="form-input" value={text} onChange={handelChange}/>
            <button className="btn" type="submit">Search</button>
            <button className="btn btn hipster" type="button" onClick={handelRandomMeal}>Surprise Me</button>
        </form>
    </header>
}
export default Search