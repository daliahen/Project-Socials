package org.example.backend.services;

import Response.BasicResponse;
import Utils.DbUtils;
import org.example.backend.entities.Post;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static Response.Error.ERROR_MISSING_AUTHOR_USER_ID;
import static Response.Error.ERROR_MISSING_POST_TEXT;
//אחראי ליצור פוסט נצטרך לוודא שפוסט לא ריק ושהוא תקין ולדעת מי כתב אותו
//createPost

//נצטרך להביא פוסטים של איזה USER מסוים למען הפיד ולמען הצגת הפרופיל שלו
//GET POSTS BY USER


//20 פוסטים אחרונים בפיד של מי שאנחנו עוקבים אחריהם וזה
// תלוי באחרי מי אנחנו עוקבים ובזמן של הפוסטים מתי הם נוצרו
//GET FEED

@Service
public class PostService {

    private DbUtils  dbUtils;


    public BasicResponse createPost(long authorUserId , String text){

        if (authorUserId <= 0){
            return new BasicResponse(false , ERROR_MISSING_AUTHOR_USER_ID);
        }

        if (text == null || text.trim().isEmpty()){
            return new BasicResponse(false , ERROR_MISSING_POST_TEXT);
        }
        dbUtils.createPostOnDb(authorUserId , text.trim());
        return new BasicResponse(true , null);
    }

    public List<Post> getPostsByUserId(long authorUserId) {
        return dbUtils.getAllPosts(authorUserId);
    }

    public List<Post> getFeed(long userId) {
        return dbUtils.getFeedPosts(userId);
    }
}
