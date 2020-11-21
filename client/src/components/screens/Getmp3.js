import React, { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link, useHistory } from 'react-router-dom'
import Product from "../screens/Product";
import M from 'materialize-css'
//import window from "react"
const Home = () => {
    const [data, setData] = useState([])
    const [convertSuccess, setSuccess] = useState("Click on convert to get the mp3")
    const [youtubeUrl,setUrl] = useState("");
    const [yurl, setyUrl] = useState("");


    // const [userDetails, setUserDetails] = useState([])

    const history = useHistory()
    /* useEffect(() => {
         M.Modal.init(searchModal1.current)
         fetch('/allpost', {
             headers: {
                 "Authorization": "Bearer " + localStorage.getItem("jwt")
             }
         }).then(res => res.json())
             .then(result => {
                 //console.log(result)
                 setData(result.posts)
             })
     }, [])
 */
    const fetchMp3 = (query) => {
        setSuccess("converting to mp3...")
        fetch('/getmp3', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               // yurl: "https://www.youtube.com/watch?v=mX4mS9uDVlg"
               yurl:query
            })
        }).then(res => res.json())
            .then(results => {
                console.log(results.msg)
                setSuccess(results.msg)
            }).catch((e) => {
                console.log(e)
            }
            )
    }

    const saveUrl = (url) => {
        setUrl(url) 
    }

    return (
        <div className="home container" >
            <input
                type="text"
                placeholder="Enter youtube url"
                //value={yurl}
                onChange = {(e) => saveUrl(e.target.value)}
                style={{ color: "white" }}
            />
            <button style={{ color: "white", fontWeight: "bold", backgroundColor: "teal" }} onClick={() => fetchMp3(youtubeUrl)}>convert</button>
            <b>{convertSuccess}</b>
        </div>
    )
}


export default Home