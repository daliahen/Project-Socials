package org.example.backend.Response;

public class LoginResponse extends BasicResponse{

    private String token;
    private Long expiresAt;
    private UserPublic user;

    public LoginResponse(boolean success, Integer errorCode, String token ,  Long expiresAt , UserPublic user) {
        super(success, errorCode);
        this.token = token;
        this.expiresAt = expiresAt;
        this.user = user;
    }

    public UserPublic getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

    public Long getExpiresAt() {
        return expiresAt;
    }
}
