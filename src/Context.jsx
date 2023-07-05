import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();


const allMealsUrl="https://www.themealdb.com/api/json/v1/1/search.php?s=a"
const randomMealUrl  = "https://www.themealdb.com/api/json/v1/1/random.php"

const AppProvider = ({ children }) => {
  const [meals,steMeals] = useState([])
  const [loading, setloading] = useState([])
  const fetchMeals=async(url)=>{
    setloading(true)
    try{
      const {data}=await axios(url)

      if(data.meals){
        steMeals(data.meals)
      }
      else{
        steMeals([])
      }
    }catch(error){
      console.log(error.data)
    }
    setloading(false)
  }
  
  
  useEffect(()=>{
   fetchMeals(allMealsUrl)
  },[])
  return <AppContext.Provider value={{loading , meals}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () =>{
  return useContext(AppContext);
}
export { AppContext, AppProvider }