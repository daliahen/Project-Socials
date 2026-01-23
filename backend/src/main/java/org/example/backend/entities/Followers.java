package org.example.backend.entities;

public class Followers {

    private long followerUserId;
    private long followedUserId;

    public Followers() {
    }

    public Followers(long followerUserId, long followedUserId) {
        this.followerUserId = followerUserId;
        this.followedUserId = followedUserId;
    }

    public long getFollowerUserId() {
        return followerUserId;
    }

    public void setFollowerUserId(long followerUserId) {
        this.followerUserId = followerUserId;
    }

    public long getFollowedUserId() {
        return followedUserId;
    }

    public void setFollowedUserId(long followedUserId) {
        this.followedUserId = followedUserId;
    }
}
