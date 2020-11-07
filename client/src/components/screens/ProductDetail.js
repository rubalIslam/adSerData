import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import { Card } from "react-bootstrap";

const ProductDetail = (props) => {
    const [data, setData] = useState([])
    const [inputValue, setInput] = useState()
    const { state, dispatch } = useContext(UserContext)
    const id = props.match.params.id

    useEffect(() => {
        fetch(`/getpost/${id}`, {
            // fetch("/getpost/5f9d1812de14843024e0e2c8",{
            //method:"get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result.post)
                setData(result.post)
            })
    }, [])

    const likePost = (id) => {
        console.log("likepost")
        /*
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
            */
    }

    const unlikePost = (id) => {
        console.log("likepost")
        /*
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
            */
    }

    const getDate = () => {
        let currentTime = new Date();

        let currentOffset = currentTime.getTimezoneOffset();

        let ISTOffset = 330;   // IST offset UTC +5:30 

        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

        // ISTTime now represents the time in IST coordinates

        const monArr = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        }

        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let dateIST = ISTTime.getDate()
        let monthIST = ISTTime.getMonth()



        return hoursIST + " : " + minutesIST + " | " + dateIST + "-" + monArr[monthIST]

    }

    const makeComment = (text, postId) => {
        //console.log("makecomment")

        const dateString = getDate()
        //sconsole.log(dateString)

        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text,
                dateString
            })
        }).then(res => res.json())
            .then(result => {
                //console.log(result)
                const newData = result
                setInput("")
                //console.log(getDate())
                /*
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })*/
                setData(newData)
            }).catch(err => {
                console.log(err)
            })


    }

    const deletePost = (postid) => {
        console.log("likepost")
        /*
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
        */
    }

    const sameUser = () => {
        if (data.postedBy == state._id) {
            return true
        }
        return false
    }


    return (
        <div className="container" >
            {/*console.log(data)*/}

            {/*console.log(state)*/}
            <div className="card home-card" style={{backgroundColor:"#2d3e49", color:"white"}}>
                <h5 style={{ padding: "5px", color:"white"}}>
                    <Link to={"/profile/" + data.postedBy} style={{color:"white"}}>
                        <h4 style={{color:"white", paddingTop:"0"}}>{data.name}</h4>
                    </Link>
                    {
                        state ?
                            data.postedBy == state._id ?
                                <i className="material-icons" style={{
                                    float: "right"
                                }}
                                    onClick={() => deletePost(data._id)}
                                >delete</i>
                                //data.postedBy == state._id?
                                /*sameUser?
                                <i className="material-icons" style={{
                                    float: "right"
                                }}
                                    onClick={() => deletePost(data._id)}
                                >delete</i>:null*/
                                : null
                            : null
                    }
                </h5>
                <div className="card-image">
                    <img src={data.photo} />
                </div>

                <div className="card-content">
                    {/*
                             <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {data.likes.includes(state._id)
                                    ?
                                    <i className="material-icons"
                                        onClick={() => { unlikePost(data._id) }}
                                    >thumb_down</i>
                                    :
                                    <i className="material-icons"
                                        onClick={() => { likePost(data._id) }}
                                    >thumb_up</i>
                                }
                            

                              <h6>{data.likes.length} likes</h6>
                            */}
                    <h6 style={{color:"white"}}>{data.title}</h6>
                    <p style={{color:"white"}}>{data.body}</p>
                    {
                        data.comments ?
                            data.comments.map(comment => {
                                return (
                                    <h6 key={comment._id}>
                                        <span style={{ color: "#f27747", fontSize: "10px", paddingRight: "5px" }}>
                                            {comment.timeString}
                                        </span>
                                        <span style={{ color: "tomato", fontWeight: "Bold", paddingRight: "5px" }}>
                                            {comment.commenter}
                                        </span>
                                        <span style={{ color: "white", fontFamily: "Roboto" }}>
                                            {comment.text}
                                        </span>
                                    </h6>
                                )
                            }) : null
                    }
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        makeComment(e.target[0].value, data._id)
                    }}>
                        <input value={inputValue} onChange={e => setInput(e.target.value)} type="text" placeholder="add a comment" />
                    </form>

                </div>
            </div>

            {/*console.log(this.props.location.param1)*/}
        </div>


    )
}

export default ProductDetail