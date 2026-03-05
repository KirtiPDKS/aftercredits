import { useState } from "react";
import { followUser, unfollowUser } from "../services/followers"

function FollowButton({userId, initiallyFollowing}) {
    const [isFollowing, setIsFollowing] = useState(initiallyFollowing);
    const token = localStorage.getItem("token")
    
    const handleClick = () => {
        if (isFollowing) {
        unfollowUser(userId, token);
        setIsFollowing(false);
    } else {
        followUser(userId, token);
        setIsFollowing(true);
    }

} 
return <button className="follow-button" onClick={handleClick}>{isFollowing? "Unfollow" :"Follow"} </button> 
}

export default FollowButton; 