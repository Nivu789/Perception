import  {  MouseEventHandler } from 'react'

const SubmitButton = ({onClick}:{onClick:MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <div><button onClick={onClick} className="p-[3px] relative"><div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div><div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">Submit</div></button></div>
  )
}

export default SubmitButton