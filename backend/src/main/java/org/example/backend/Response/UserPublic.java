package org.example.backend.Response;

public class UserPublic {

    private long userId;
    private String username;
    private String imageUrl;

    public UserPublic(long userId, String username, String imageUrl) {
        this.userId = userId;
        this.username = username;
        this.imageUrl = imageUrl;
    }

    public long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
