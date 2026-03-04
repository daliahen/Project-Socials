import { useEffect, useState} from "react";
import "../Styles/Dashboard.css";
import {Profile} from "../Components/Profile/Profile.jsx";
import {useAuth} from "../Contexts/AuthContext.jsx";
import {getFollowers, getFollowing , getAllUsers , searchUsers , follow , unfollow } from "../api/api.jsx";
import UsersList from "../Components/Users/UsersList.jsx";
import UserSearch from "../Components/Users/UserSearch.jsx";
import UserRow from "../Components/Users/UserRow.jsx";
import CreatePost from "../Components/Posts/CreatePost.jsx";
import Feed from "../Components/Posts/Feed.jsx";
import UserPosts from "../Components/Posts/UserPosts.jsx";

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

    const [feedRefreshKey , setFeedRefreshKey] = useState(0);


    useEffect(() => {
        async function loadDashboardData() {
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

        loadDashboardData();
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

    function formatPostTime(createdAt) {
        if (!createdAt){
            return "Unknown time";
        }
        const postDate = new Date(createdAt)
        if (Number.isNaN(postDate.getTime())){
            return "Invalid";
        }
        return postDate.toLocaleString();
    }

    function handlePostCreated(){
        setFeedRefreshKey(prev => prev + 1);
    }

    const followingSet = new Set(followingIds);
    const followersSet = new Set(followersIds);

    const followingUsers = allUsers.filter(u => followingSet.has(u.userId));
    const followersUsers = allUsers.filter(u => followersSet.has(u.userId));

    const canRender = !loading && !errorMsg;


    const userByIdMap = {};
    allUsers.forEach((userObject) => {
        userByIdMap[userObject.userId] = userObject;
    });

    return(

        <div className="dashboardPage">
            <div className="dashboardShell">

                <header className="dashHeader">
                    <div>
                        <h2 className="dashTitle">Dashboard</h2>
                        <div className="dashSub">Your feed, posts and connections :) </div>
                    </div>

                    <div className="dashHeaderRight">
                    </div>
                </header>

                {loading && <div className="dashNotice">Loading...</div>}
                {errorMsg && <div className="dashError">{errorMsg}</div>}

                {canRender && (
                    <div className="dashGrid">


                        {/* left */}
                        <div className="dashCol">
                            <section className="dashCard">
                                <Profile
                                    initUsername={user?.username || ""}
                                    initImage={user?.imageUrl || ""}
                                    initFollowing={followingUsers}
                                    initFollowers={followersUsers}
                                />
                            </section>

                            <section className="dashCard">
                                <CreatePost
                                    currentUserId={user.userId}
                                    onPostCreated={handlePostCreated}
                                />
                            </section>

                            <section className="dashCard">
                                <Feed
                                    currentUserId={user.userId}
                                    usersById={userByIdMap}
                                    refreshKey={feedRefreshKey}
                                />
                            </section>
                        </div>


                        <section className="dashCard">
                            <UserPosts
                                currentUserId={user.userId}
                                usersById={userByIdMap}
                                refreshToken={feedRefreshKey} // שימוש באותו מפתח רענון
                            />
                        </section>

                        {/* right */}
                        <aside className="dashSide">
                            <section className="dashCard">
                                <h3 className="dashSectionTitle">Following</h3>


                                {followingUsers.length === 0 ? (
                                    <div className="dashMuted">No users to display…</div>
                                ) : (
                                    <div className="dashList">
                                        {followingUsers.map((userObject) => (
                                            <UserRow
                                                key={userObject.userId}
                                                user={userObject}
                                                myUserId={user.userId}
                                                isFollowing={true}
                                                onFollow={handleFollow}
                                                onUnfollow={handleUnfollow}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section className="dashCard">
                                <UsersList title="Followers" users={followersUsers} />
                            </section>

                            <section className="dashCard">
                                <UserSearch
                                    myUserId={user.userId}
                                    followingIds={followingIds}
                                    results={searchResults}
                                    loading={searchLoading}
                                    error={searchError}
                                    onSearch={handleSearch}
                                    onFollow={handleFollow}
                                    onUnfollow={handleUnfollow}
                                />
                            </section>
                        </aside>

                    </div>
                )}

            </div>
        </div>
    );
}export default Dashboard;
