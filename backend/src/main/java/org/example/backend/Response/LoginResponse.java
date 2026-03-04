package org.example.backend.Response;

public class LoginResponse extends BasicResponse{

    private String token;
    private UserPublic user;

    public LoginResponse(boolean success, Integer errorCode, String token ,  UserPublic user) {
        super(success, errorCode);
        this.token = token;
        this.user = user;
    }

    public UserPublic getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

}
