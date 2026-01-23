package org.example.backend.Request;

public class UpdateProfileImageReq {
    private long userId;
    private String imageUrl;

    public UpdateProfileImageReq() {
    }

    public UpdateProfileImageReq(long userId, String imageUrl) {
        this.userId = userId;
        this.imageUrl = imageUrl;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
