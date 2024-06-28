import React, { useEffect, useState } from 'react'
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import SubmitButton from '../components/SubmitButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditBlog } from '../hooks/useEditBlog';


const EditBlog = () => {
    const params = useParams()
    const id = params?.id || "";

    const {loading,blog,dbTitle} = useEditBlog({id})

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );
      const navigate = useNavigate()
      const [title,setTitle] = useState("")

      const convertText = () =>{
        let contentState = editorState.getCurrentContent()
        console.log("Editors state",contentState)
        let convertedText = convertToRaw(contentState)
        console.log("After convertion",convertedText)
        const dataToSend = {
            title:title,
            content:convertedText,
            blogId:id
        }
        axios.put(`${BASE_URL}/api/v1/blog`,dataToSend,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            if(response.status == 200){
                console.log(response)
              navigate(`/blog/${id}`)
            }else{
              alert("Something went wrong while posting")
            }
        })
    }


      useEffect(()=>{
        if(blog){
            const convertedText = convertFromRaw(blog)
            console.log(convertedText)
            const content = EditorState.createWithContent(convertedText)
            setEditorState(content)
            setTitle(dbTitle)
        }
      },[blog])

      if(loading){
        return <div>Loading..</div>
      }

  return (
    <div className='flex justify-center w-full flex-col'>
      <div className='flex justify-end px-12 py-5'>
      <input type="text" className='border w-1/2 p-2'placeholder='enter your title here' value={title} required onChange={(e)=>setTitle(e.target.value)}/>
      <SubmitButton onClick={convertText}/>
      </div>
      <div>
      <Editor editorState={editorState} onEditorStateChange={setEditorState} wrapperClassName="wrapper-class" editorClassName="editor-class"toolbarClassName="toolbar-class"/>
      </div>
    </div>
  )
}

export default EditBlog