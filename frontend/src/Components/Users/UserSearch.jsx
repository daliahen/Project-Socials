import Inputs from "../Inputs.jsx";
import {useRef, useState} from "react";
import UserRow from "./UserRow.jsx";

function UserSearch({myUserId , followingIds = [] , results = [] ,
                    loading = false , error = "" , onSearch , onFollow , onUnfollow }){

    const [query , setQuery] = useState(""); //משתנה שישמור את מה שהמשתמש כותב באינפוט של החיפוש

    const debounceRef = useRef(null);

    function handleChange(event){
        const value = event.target.value; // כל פעם שמקלידים באינפוט פונקציה תרוץ ונעדכן אינפוט על המסך
        setQuery(value);
        if (debounceRef.current){
            clearTimeout(debounceRef.current) // אל תשלח חיפוש עדיין ,משתמש עדיין מקליד
        }
        debounceRef.current = setTimeout(() => {
            const clean = value.trim();
            if (clean.length >= 1){
                onSearch(clean);
            }else {
                onSearch("")
            }
        }, 400);// זמן המתנה של DEBOUNCE
    }


    return(
        <div className="user-search" style={{ marginTop: "16px" }}>
            <h3>Search users</h3>

            <Inputs
                label={"Search"}
                value={query}
                onChange={handleChange}
                placeholder={"Type a username.."}
            />

            {loading && <div>Searching...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {query.trim().length >= 1 && !loading && (
                <div style={{ marginTop: "10px" }}>
                    {results.length === 0 ? (
                        <div style={{ opacity: 0.7 }}>No results</div>
                    ) : (

                        results.map((u) => {
                            const isFollowing = followingIds.includes(u.userId);
                            return(
                                <UserRow
                                    key={u.userId}
                                    user={u}
                                    myUserId={myUserId}
                                    isFollowing={isFollowing}
                                    onFollow={onFollow}
                                    onUnfollow={onUnfollow}
                                />
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
export default UserSearch;