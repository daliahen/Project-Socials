import {useState} from "react";
import {createPost} from "../../api/api.jsx";
import Inputs from "../Inputs.jsx";
import Buttons from "../Buttons.jsx";

function CreatePost({currentUserId , onPostCreated}){

    const [postText , setPostText] = useState("");
    const[isPublishing, setIsPublishing] =useState(false);
    const [errorMessage , setErrorMessage] = useState("");

    async function handlePublish (){
        const cleanText = (postText || "").trim();

        if (!currentUserId){
            setErrorMessage("Missing logged in user");
            return;
        }
        if (!cleanText){
            setErrorMessage("Post cannot be empty");
            return;
        }

        //send request
        setIsPublishing(true);
        setErrorMessage("");

        try {
            const response = await createPost(currentUserId , cleanText);
            if (!response.data.success){
                setErrorMessage("Publish failed");
                return
            }
            setPostText("");//success/
            if (onPostCreated){ //tell dashboard refresh the feed
                await onPostCreated();
            }
        }catch {
            setErrorMessage("Publish failed");
        }finally {
            setIsPublishing(false);
        }
    }

    return(

        <div>
            <h3>Create post :) </h3>

            <Inputs
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write something..."
                disabled={isPublishing}
            />

            <div style={{ marginTop: 8 }}>
                <Buttons
                    text="Publish"
                    onClick={handlePublish}
                    disabled={postText.trim().length === 0}
                    loading={isPublishing}
                />
            </div>

            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        </div>
    );
}export default CreatePost;