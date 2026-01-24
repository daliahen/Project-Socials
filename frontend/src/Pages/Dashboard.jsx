import { useEffect, useState} from "react";
import {Profile} from "../Components/Profile/Profile.jsx";
import {useAuth} from "../Contexts/AuthContext.jsx";
import {getFollowers, getFollowing , getAllUsers , searchUsers , follow , unfollow} from "../api/api.jsx";
import UsersList from "../Components/Users/UsersList.jsx";
import UserSearch from "../Components/Users/UserSearch.jsx";
import UserRow from "../Components/Users/UserRow.jsx";

function Dashboard(){

    const {user} = useAuth();

    const [followingIds , setFollowingIds] = useState([]);
    const [followersIds , setFollowersIds] = useState([]);
    const [allUsers , setAllUsers] = useState([]);

    const [searchResults , setSearchResults] = useState([]);//רשימת המשתמשים שמצאנו בחיפוש
    const [searchLoading , setSearchLoading] = useState(false);//האם עכשיו מחפשים
    const [searchError , setSearchError] = useState("");//אם חיפוש נכשל

    const [loading , setLoading] = useState(true);
    const [errorMsg , setErrorMsg] = useState("");

    useEffect(() => {
        async function loadFollowersData() {
            setLoading(true);
            setErrorMsg("");

            try {
                if (!user || !user.userId) {
                    setErrorMsg("Missing logged-in user");
                    return;
                }
                const followingResponse = await getFollowing(user.userId);
                const fetchedFollowingIds = followingResponse.data?.users || [];
                setFollowingIds(fetchedFollowingIds);

                const followersResponse = await getFollowers(user.userId);
                const fetchedFollowersIds = followersResponse.data?.users || [];
                setFollowersIds(fetchedFollowersIds);

                const allUsersResponse = await getAllUsers();
                const fetchedAllUsers = allUsersResponse.data?.userList || [];
                setAllUsers(fetchedAllUsers);

            } catch (err) {
                console.error(err);
                setErrorMsg("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }
        loadFollowersData();

    }, [user]);


    async function refreshFollowingOnly(){ //חרי שאני עושה Follow למישהו אני רוצה לעדכן את הרשימה של followingIds מהשרת
        try {
            if (!user?.userId){
                return;
            }
            const followingResponse = await getFollowing(user.userId);
            setFollowingIds(followingResponse.data?.users || []);
        }catch (error){
            console.log(error)
        }
    }

    async function handleSearch(text){
        const cleanText = (text || "").trim();
        if (cleanText.length === 0){
            setSearchResults([]);
            setSearchLoading(false);
            setSearchError("");
            return;
        }

        setSearchLoading(true);
        setSearchError("");

        try{
            const response = await searchUsers(cleanText);
            const users = response.data?.users || [];
            setSearchResults(users);
        }catch {
            setSearchError("search failed")
            setSearchResults([])
        }finally {
            setSearchLoading(false);
        }
    }


    async function doFollowAction(actionFunc, targetUserId) {
        try {
            if (!user?.userId) return;

            const response = await actionFunc(user.userId, targetUserId);

            if (response.data?.success) {
                await refreshFollowingOnly();
            } else {
                console.log("Action failed. Server response:", response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleFollow(targetUserId){
        return doFollowAction(follow, targetUserId);
    }

    async function handleUnfollow(targetUserId){
        return doFollowAction(unfollow, targetUserId);
    }


    const followingSet = new Set(followingIds);
    const followersSet = new Set(followersIds);

    const followingUsers = allUsers.filter(u => followingSet.has(u.userId));
    const followersUsers = allUsers.filter(u => followersSet.has(u.userId));

    const canRender = !loading && !errorMsg;

    return(
        <div className="dashboard">
            <h2>Dashboard</h2>

            {loading && <div>Loading...</div>}
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}


                {!loading  && !errorMsg && (
                    <Profile
                        initUsername={user?.username || ""}
                        initImage={user?.imageUrl || ""}
                        initFollowing={followingUsers}
                        initFollowers={followersUsers}
                    />
                )}


            {canRender && (
                <div className="users-list">
                    <h3>Following</h3>

                    {followingUsers.length === 0 ? (
                        <div style={{ opacity: 0.7 }}>no users to display..</div>
                    ) : (
                        followingUsers.map((u) => (
                            <UserRow
                                key={u.userId}
                                user={u}
                                myUserId={user.userId}
                                isFollowing={true}
                                onFollow={handleFollow}
                                onUnfollow={handleUnfollow}
                            />
                        ))
                    )}
                </div>
            )}


            {canRender  &&(
                <UsersList title="Followers" users={followersUsers} />
            )}


            {canRender &&(
                <UserSearch
                    myUserId = {user.userId}
                    followingIds = {followingIds}
                    results={searchResults}
                    loading={searchLoading}
                    error={searchError}
                    onSearch={handleSearch}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                />
            )}

        </div>
    )
}export default Dashboard;
