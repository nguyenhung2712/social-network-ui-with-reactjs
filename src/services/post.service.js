import axios from "axios";
import { API_URL } from "../constraints";

const readAllPosts = () => {
    return axios.get(API_URL + "/post/all");
}

const readPostById= (id) => {
    return axios.get(API_URL + "/post/" + id);
}

const createPost = (content, image) => {
    return axios.post(API_URL + "/post/add", {
        content, 
        image
    });
}

const deletePost = (id) => {
    return axios.delete(API_URL + "/post/remove/");
}

const updatePost = (content, image) => {
    return axios.put(API_URL + "/post/update/", {
        content, 
        image
    });
}

const PostService = {
    readAllPosts,
    readPostById,
    createPost,
    updatePost,
    deletePost
};
  
export default PostService;