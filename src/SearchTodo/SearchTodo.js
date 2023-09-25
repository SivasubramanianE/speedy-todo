import React from 'react'

export const SearchTodo = ({searchItem, setSearchItem}) => {
  return (
   
 <input type='text'
    className="w-100 p-3  border rounded-md focus:border-black"
    placeholder='search todo ...'
     value={searchItem} onChange={(e)=> setSearchItem(e.target.value)} />
  
   
  )
}

export default SearchTodo
