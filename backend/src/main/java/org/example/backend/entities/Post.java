package org.example.backend.entities;

import java.time.LocalDateTime;

public class Post {// אנחנו ניצור בSQL טבלת MANY TO MANY של עוקבים נעקבים
    private long postId;
    private String text;
    private LocalDateTime createdAt; //נמיין ונחזיר 20 ראשונים
    private long authorUserId;

    public Post() {
    }

    public Post(long postId) {
        this.postId = postId;
    }

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getAuthorUserId() {
        return authorUserId;
    }

    public void setAuthorUserId(long authorUserId) {
        this.authorUserId = authorUserId;
    }
}
