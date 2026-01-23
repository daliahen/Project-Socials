package org.example.backend.Response;

public class IsFollowingResponse extends BasicResponse{

    private boolean following;

    public IsFollowingResponse(boolean success, Integer errorCode, boolean following) {
        super(success, errorCode);
        this.following = following;
    }

    public boolean isFollowing() {
        return following;
    }
}
