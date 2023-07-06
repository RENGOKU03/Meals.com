import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();


const allMealsUrl="https://www.themealdb.com/api/json/v1/1/search.php?s=a"
const randomMealUrl  = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFavoritesFromLocalStorage = () =>{
  let favorites=localStorage.getItem('favorites')

  if(favorites){
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else{
    favorites=[]
  }
  return favorites
}

const AppProvider = ({ children }) => {
  const [meals,steMeals] = useState([])
  const [loading, setloading] = useState([])
  const [searchTerm, setSearchTerm] = useState(' ')
  const [showModal, setShowModal] =useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage)

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
  
  const fetchRandomMeal=() =>{
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) =>{
    let meal;
    if(favoriteMeal){
      meal = favorites.find((meal)=>meal.idMeal === idMeal)
    }
    else{
      meal = meals.find((meal)=>meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal =() =>{
    setShowModal(false)
  }

  const addToFavorite = (idMeal)=>{
    const alreadyFavorite = favorites.find((meal)=>meal.idMeal ===idMeal)
    if(alreadyFavorite) return
    const meal=meals.find((meal)=>meal.idMeal === idMeal)
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
  }

  const removeFromFavorite = (idMeal) =>{
    const updatedFavorites = favorites.filter((meal)=> meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
  }

  useEffect(()=>{
    fetchMeals(allMealsUrl)
  },[])

  useEffect(()=>{
    if(!searchTerm) return
   fetchMeals(`${allMealsUrl}${searchTerm}`)
  },[searchTerm])
  return <AppContext.Provider value={{loading , meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal ,addToFavorite, removeFromFavorite ,favorites}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () =>{
  return useContext(AppContext);
}
export { AppContext, AppProvider }