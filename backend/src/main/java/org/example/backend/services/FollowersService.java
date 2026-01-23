package org.example.backend.services;


import org.example.backend.Response.BasicResponse;
import org.example.backend.Utils.DbUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.example.backend.Response.Error.*;

@Service
public class FollowersService {

    private DbUtils dbUtils;

    public FollowersService(DbUtils dbUtils) {
        this.dbUtils = dbUtils;
    }


    public BasicResponse follow (long followerUserId , long followedUserId) {
        BasicResponse validate = validateFollower(followerUserId, followedUserId);
        if (!validate.isSuccess()){
            return validate;
        }
        if (dbUtils.isFollowing(followerUserId, followedUserId)){
            return new BasicResponse(false , ERROR_ALREADY_FOLLOWING);
        }
        dbUtils.follow(followerUserId, followedUserId);
        return new BasicResponse(true , null);
    }



    public  BasicResponse unfollow (long followerUserId , long followedUserId) {
        BasicResponse validate = validateFollower(followerUserId, followedUserId);
        if (!validate.isSuccess()){
            return validate;
        }
        if (!dbUtils.isFollowing(followerUserId, followedUserId)){
            return new BasicResponse(false , ERROR_NOT_FOLLOWING);
        }
        dbUtils.unfollow(followerUserId, followedUserId);
        return new BasicResponse(true , null);
    }


    public BasicResponse validateFollower(long followerUserId , long followedUserId) {
        if (followerUserId <= 0){
            return new BasicResponse(false , ERROR_MISSING_FOLLOWER_USER_ID);
        }
        if (followedUserId <= 0){
            return new BasicResponse(false , ERROR_MISSING_FOLLOWED_USER_ID);
        }
        if (followerUserId == followedUserId){
            return new BasicResponse(false , ERROR_CANNOT_FOLLOW_SELF);
        }
        if(dbUtils.getUserById(followerUserId) == null){
            return new BasicResponse(false , ERROR_USER_NOT_FOUND);
        }
        if (dbUtils.getUserById(followedUserId) == null){
            return new BasicResponse(false , ERROR_USER_NOT_FOUND);
        }

        return new BasicResponse(true , null);
    }


    public List<Long> getFollowing(long userId) {
        if (userId <= 0) {
            return new ArrayList<>();
        }
        return dbUtils.getFollowing(userId);
    }

    public List<Long> getFollowers(long userId) {
        if (userId <= 0) {
            return new ArrayList<>();
        }
        return dbUtils.getFollowers(userId);
    }

    public boolean isFollowing(long followerUserId, long followedUserId) {
        if (followedUserId <= 0 ||  followerUserId <= 0) {
            return false;
        }
        if (followerUserId == followedUserId){
            return false;
        }
        return  dbUtils.isFollowing(followerUserId, followedUserId);
    }

}
