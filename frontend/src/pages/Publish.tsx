import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from 'react-router-dom';



const Publish = () => {

    const [convertedContent, setConvertedContent] = useState<string | null>(null);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
    
    const [title,setTitle] = useState("")
    const navigate = useNavigate()

    const convertText = () =>{
        let contentState = editorState.getCurrentContent()
        console.log(convertedContent)
        console.log("Editors state",contentState)
        let convertedText = convertToRaw(contentState)
        console.log("After convertion",convertedText)
        const dataToSend = {
            title:title,
            content:convertedText
        }
        axios.post(`${BASE_URL}/api/v1/blog`,dataToSend,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            if(response.statusText == "OK"){
              navigate('/blogs')
            }else{
              alert("Something went wrong while posting")
            }
        })
    }

      useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        console.log("html",html)
        setConvertedContent(html);
      }, [editorState]);


  return (
    <div className='flex justify-center w-full flex-col'>
      <div className='flex justify-between px-12 py-5'>
        <input type="text" className='border w-1/2 p-2'placeholder='enter your title here' required onChange={(e)=>setTitle(e.target.value)}/>
      <SubmitButton onClick={convertText}/>
      </div>
      <div>
      <Editor editorState={editorState} onEditorStateChange={setEditorState} wrapperClassName="wrapper-class" editorClassName="editor-class"toolbarClassName="toolbar-class"/>
      </div>
    </div>
  )
}

export default Publish