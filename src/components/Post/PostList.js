import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import Loading from "../Loading/Loading";
import PostModal from "./PostModal";
import Post from "./Post";
import { addPost } from "../../redux/actions/PostActions";

import "./post.css";

/* function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
} */

const PostContainer = () => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isShowed, setIsShowed] = useState(false);
    const [isGtt, setIsGtt] = useState(false);

    /* const forceUpdate = useForceUpdate(); */
    const dispatch = useDispatch();
    const state = useSelector(state => state.allPosts);
    
	useEffect(() => {
        getAllPosts();
    }, [state]);

    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, []);
    //Need fix
    const getAllPosts = async () => {
        
        await PostService.readAllPosts()
			.then(res => {
				let allPosts = res.data;
				allPosts.forEach(post => {
					getUserProfileByUser(post.user)
					.then(profileRes => {
						let userProfile = profileRes.data;
						post.userProfile = userProfile;
                        setPosts(prev => {
                            if (prev.every(curPostValue => curPostValue.id !== post.id)) {
                                return [...prev, post];
                            } else {
                                return [...prev];
                            }
                        });
                        if (state.allPosts.every(curPostValue => curPostValue.id !== post.id)) {
                            dispatch(addPost(post));
                        }
					});
				})
            })
            .catch(e => {
                console.log(e);
            });
    }  
     
    const getUserProfileByUser = async (user) => {
        return await UserService.readUserProfile(user);
    }

    const refreshList = () => {
        getAllPosts();
        setCurrentPost(null);
        setCurrentIndex(-1);
    };

    /* const setActivePost = (post, index) => {
        setCurrentPost(post);
        setCurrentIndex(index);
    }; */

    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={ showModal }>Add</button>
            { isShowed ? <PostModal handleClose={ hideModal } /> : '' }
            {
                posts === undefined || posts.length === 0 ?
                    <Loading />
                : posts.map((post, index) => (
					<Post key={index} data={post}/>
				))
            }
        </>
    );
}

export default PostContainer;