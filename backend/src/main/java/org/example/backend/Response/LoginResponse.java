package org.example.backend.Response;

public class LoginResponse extends BasicResponse{

    private String token;
    private Long expiresAt;

    public LoginResponse(boolean success, Integer errorCode, String token ,  Long expiresAt) {
        super(success, errorCode);
        this.token = token;
        this.expiresAt = expiresAt;
    }

    public String getToken() {
        return token;
    }

    public Long getExpiresAt() {
        return expiresAt;
    }
}
