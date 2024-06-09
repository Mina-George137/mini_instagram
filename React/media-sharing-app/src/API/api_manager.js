/*
1. Axios uses XMLHttpRequest under the hood, and it is widely supported by most browsers, 
including older ones like Internet Explorer 11. Fetch(), on the other hand, is only compatible with Chrome
42+, Firefox 39+, Edge 14+, and Safari 10.3+ (you can see the full compatibly table on CanIUse.com).

2. When sending requests, Axios automatically signifies the data, unlike fetch(), 
which requires us to do it manually.

3.Unlike the Fetch API, which requires you to check the status code and throw the error yourself, 
Axios has better error handling and can throw 400 and 500 range errors.
*/

/* 
Essentially, we'll use the useEffect() hook to fetch posts as soon as the app renders/mounts,
 while the useState() hook will help us create a local storage for our data.
*/

import axios from "axios";
// import Cookies from 'js-cookie'; 

const client = axios.create({
  baseURL: "https://media-sharing-platform.vercel.app/api" 
});

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmUyODA5OTUyOWU2N2RkMjBkMWRiNCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTcxMTE1NTIyMiwiZXhwIjoxNzE4OTMxMjIyfQ.7U1KZhmiI9AUyd6DqyKxt75L9BFTnoycC6ymohaX21o'

export async function getUsers() {
    try {
        const response = await client.get("/user/allUsers");
        const data = JSON.stringify(response.data.data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
export async function getMedia() {
    try {
        const response = await client.get("/media");
        const data = response.data.data ? response.data.data.assets : [];
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function addMedia(file){
    try {
        const formData = new FormData()
        formData.append("mediaFile", file)
        console.log(file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }

        const response = await client.post("/media/upload", formData, config)
        const data = response.data.data ? response.data.data.assets : [];
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
    }
}
export async function likeMedia(id){
    try {
        const config = {
            headers: {
                'Authorization': token
            }
        }
        const response = await client.post(`/media/${id}`, {}, config); // Send id in the URL
        const data = response.data.data ? response.data.data.assets : [];
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function unlikeMedia(id){
    try {
        const config = {
            headers: {
                'Authorization': token
            }
        }
        const response = await client.patch(`/media/${id}`, {}, config); // Send id in the URL
        const data = response.data.data ? response.data.data.assets : [];
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteMedia(id){
    try {
        const config = {
            headers: {
                'Authorization': token
            }
        }
        const response = await client.delete(`/media/${id}`,config); // Send id in the URL
        const data = response.data.data ? response.data.data.assets : [];
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

