import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function SelectedPost() {
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null)
    useEffect(() => {
        console.log(id)
        fetch(`http://localhost:8080/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    },[])
    return (
        <div>
            Selected Page
        </div>
    )
}