package org.example.backend.entities;

public class User {
    private long userId; // זה יהיה הPK שלנו עם AUTO INCREMENT
    private String username;
    private String password; // בעתיד נעשה HASH נרצה לבצע הצפנה, נעשה את זה בSERVICE לדבר עם רומא
    private String imageURL;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public User() {

    }

    public User(String name, String password) {
        this.username = name;
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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
