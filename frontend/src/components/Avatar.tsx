import { useState } from "react"

export const Avatar=({name="Anonymous",size=6,appbar}:{name?:string,size?:number,appbar?:Boolean})=>{
  
  
  
    return <div className="flex flex-col">
      <div className={`p-2 text-sm items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 text-center`}>
    <span className="text-gray-600 dark:text-gray-300">{name && name[0]}</span>
    
     </div>
    </div>
  }