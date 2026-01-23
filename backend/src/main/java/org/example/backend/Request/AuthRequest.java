package org.example.backend.Request;

public class AuthRequest { // זאת מחלקה שבעצם מייצגת לי נתונים של לקוח לשרת - להתייעץ עם רומא
    private String username;
    private String password;

    public AuthRequest() { // הבנאי חייב להיות ריק כי SPRING יוצר לי אובייקט
    }

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
