import React, { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link, useHistory } from 'react-router-dom'
import Product from "../screens/Product";
import M from 'materialize-css'
//import window from "react"
const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const searchModal1 = useRef(null)
    const [search, setSearch] = useState('')
   // const [userDetails, setUserDetails] = useState([])
    const [postDetails, setPostDetails] = useState([])
    const history = useHistory()
    useEffect(() => {
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

    const fetchPosts = (query) => {
        setSearch(query)
        fetch('/search-posts', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(results => {
                console.log(results)
                setPostDetails(results.post)
            }).catch((e)=>{
                console.log(e)
            }
        )
    }

    return (
        <div className="home container" 
            style={{backgroundColor:"teal", height: window.innerHeight}}>
            <div id="modal1" className="modal"
                ref={searchModal1} style={{ color: "white", backgroundColor: "black" }}>
                <div className="modal-content">
                    <input
                        type="text"
                        placeholder="search posts"
                        value={search}
                        onChange={(e) => fetchPosts(e.target.value)}
                        style={{color:"white"}}
                    />
                    <ul className="collection">
                        {console.log(postDetails)}
                        {
                            postDetails ?
                            postDetails.map(item=>{
                                console.log(item.title)
                                return <Link 
                                    to={"/product/"+item._id}
                                    onClick={()=>{
                                        M.Modal.getInstance(searchModal1.current).close()
                                        setSearch('')
                                    }}>
                                        <li className="collection-item">{item.title}</li>
                                    </Link>
                            })
                            :null
                        }
                        {/*postDetails.map(item => {
                            return <Link 
    to={item._id !== state._id ? "/profile/" + item._id : '/profile'} 
    onClick={() => {
                                M.Modal.getInstance(searchModal1.current).close()
                                setSearch('')
                            }}><li className="collection-item">{item}</li></Link>
                        })*/}
                    </ul>
                </div>
                <div className="modal-footer" style={{ color: "white", backgroundColor: "black" }}>
                    <button className="modal-close waves-effect waves-green btn-flat" style={{ color: "white", fontWeight: "bold", backgroundColor: "teal" }} onClick={() => setSearch('')}>close</button>
                </div>
                <h2 style={{paddingLeft:"20px"}}>search Item</h2>
            </div>
            <li key="1" style={{ listStyleType:"none" , textAlign: "right", paddingTop:"10px"}}>
                <i data-target="modal1"
                    className="small material-icons modal-trigger"
                    style={{ color: "black"}}
                >search</i>
            </li>
            {
                data ?
                    //(<h1>{console.log(JSON.stringify(data))}</h1>)
                    data.map((item) => {
                        return (
                            <Product product={item} id={item._id} />
                        )
                    })
                    : null
            }
            {/*
                
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 style={{ padding: "5px" }}>
                                <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                                    {item.postedBy.name}
                                </Link> 
                                {item.postedBy._id == state._id
                                && <i className="material-icons" style={{
                                    float: "right"
                                }}
                                    onClick={() => deletePost(item._id)}
                                >delete</i>

                            }</h5>
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons"
                                        onClick={() => { unlikePost(item._id) }}
                                    >thumb_down</i>
                                    :
                                    <i className="material-icons"
                                        onClick={() => { likePost(item._id) }}
                                    >thumb_up</i>
                                }


                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: "500" }}>
                                                {record.postedBy.name}</span> {record.text}
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment" />
                                </form>

                            </div>
                        </div>
                    )
                })
                
            */}


        </div>
    )
}


export default Home