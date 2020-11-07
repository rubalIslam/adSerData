import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from "react-bootstrap";

const Product = (item, id) => {
    const data = item.product;
    const newTo = {
        pathname:`/product/${data._id}`,
        id : data._id
    }
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={newTo}>
                <h2 style={{paddingLeft:"10px"}}>{data.title}</h2>
                {/*console.log("id: "+data._id)*/}
            </Link>
            {/*console.log(data)*/}
        </Card>
    )
}

export default Product