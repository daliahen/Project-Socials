package org.example.backend.Utils;

import jakarta.annotation.PostConstruct;
import org.example.backend.entities.Post;
import org.example.backend.entities.User;

import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class DbUtils { // כל השאילתות יעברו לפה , צריך להגיד איך מתחברים לDATABASE


    private Connection connection;

    @PostConstruct // תרוץ מיד שאפליקציה עולה
    public void init() {
        String host = "localhost";
        String username = "root";
        String password = "1234";

        String url = "jdbc:mysql://localhost:3306/social_project"; // נרשום פה את השם של הסכימה שלנו

        try {
            this.connection = DriverManager.getConnection(url, username, password);
            System.out.println("Connected to database successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public void createUserOnDb(User user) {
        try {
            PreparedStatement preparedStatement = this.connection.prepareStatement("INSERT INTO users (username, password, image_url)" + " VALUES (?, ?, ?)");

            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.setString(3, user.getImageURL());

            preparedStatement.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public List<User> getAllUsers() {
        try {
            List<User> users = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id , username , password , image_url FROM users");

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                User user = new User();
                user.setUserId(resultSet.getLong("id"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setImageURL(resultSet.getString("image_url"));
                users.add(user);
            }
            return users;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean usernameExists(String username) {
        try {
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id FROM users where username = ?");
            preparedStatement.setString(1, username);
            preparedStatement.setMaxRows(1);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public User getUserByUsername(String username) {
        try {
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id, username, password, image_url FROM users WHERE username = ?");
            preparedStatement.setString(1, username);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (!resultSet.next()) {
                return null;
            }
            User user = new User();
            user.setUserId(resultSet.getLong("id"));
            user.setUsername(resultSet.getString("username"));
            user.setPassword(resultSet.getString("password"));
            user.setImageURL(resultSet.getString("image_url"));
            return user;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public User getUserById(long userId) {
        try {
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id, username, password, image_url FROM users WHERE id = ?");
            preparedStatement.setLong(1, userId);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (!resultSet.next()) {
                return null;
            }
            User user = new User();
            user.setUserId(resultSet.getLong("id"));
            user.setUsername(resultSet.getString("username"));
            user.setPassword(resultSet.getString("password"));
            user.setImageURL(resultSet.getString("image_url"));
            return user;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> searchUsersByUsername(String text) {
        try {
            List<User> users = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection.prepareStatement(
                    "SELECT id, username, image_url FROM users WHERE username LIKE ?"
            );
            preparedStatement.setString(1, "%" + text + "%");
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                User user = new User();
                user.setUserId(resultSet.getLong("id"));
                user.setUsername(resultSet.getString("username"));
                user.setImageURL(resultSet.getString("image_url"));
                users.add(user);
            }
            return users;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateUserImage(long userId, String imageURL) {
        try {
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("UPDATE users SET image_url = ? WHERE id = ?");
            preparedStatement.setString(1 , imageURL);
            preparedStatement.setLong(2 , userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    //posts

    public void createPostOnDb(long authorUserId, String text) {
        try {
            PreparedStatement preparedStatement = this.connection.prepareStatement("INSERT INTO posts(author_user_id, text)" + "VALUES (? , ?)");

            preparedStatement.setLong(1, authorUserId);
            preparedStatement.setString(2, text);

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    private Post mapResultSetToPost(ResultSet resultSet) {
        try {
            Post post = new Post();
            post.setPostId(resultSet.getLong("id"));
            post.setAuthorUserId(resultSet.getLong("author_user_id"));
            post.setText(resultSet.getString("text"));

            Timestamp ts = resultSet.getTimestamp("created_at");
            if (ts != null) {
                post.setCreatedAt(ts.toLocalDateTime());
            }

            return post;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public List<Post> getAllPosts(long authorUserId) {

        try {
            List<Post> posts = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id , author_user_id , text , created_at FROM posts"
                    + " WHERE  author_user_id = ? ORDER BY created_at DESC ");
            preparedStatement.setLong(1, authorUserId);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                posts.add(mapResultSetToPost(resultSet));
            }
            return posts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Post> getFeedPosts(long followerUserId) {
        try {
            List<Post> posts = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection.prepareStatement("SELECT id , posts.author_user_id , text , created_at  "
                    + "FROM posts JOIN  followers ON  author_user_id = followed_user_id"
                    + " WHERE follower_user_id = ? ORDER BY created_at DESC LIMIT 20");

            preparedStatement.setLong(1, followerUserId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                posts.add(mapResultSetToPost(resultSet));
            }
            return posts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }



    // followers


    public void follow(long followerUserId , long followedUserId) {
        try {
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("INSERT INTO followers(follower_user_id, followed_user_id)" +
                            " VALUES (? , ?)");
            preparedStatement.setLong(1 , followerUserId);
            preparedStatement.setLong(2 , followedUserId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public  void unfollow(long followerUserId , long followedUserId) {
        try {
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("DELETE FROM followers WHERE follower_user_id = ? AND followed_user_id = ?");
            preparedStatement.setLong(1 , followerUserId);
            preparedStatement.setLong(2 , followedUserId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Long> getFollowing(long followerUserId) {
        try {
            List<Long> following = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("SELECT followed_user_id FROM followers WHERE follower_user_id = ?");
            preparedStatement.setLong(1 , followerUserId);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                following.add(resultSet.getLong("followed_user_id"));
            }
            return following;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Long> getFollowers(long followedUserId){
        try {
            List<Long> followers = new ArrayList<>();
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("SELECT follower_user_id From followers WHERE followed_user_id = ?");
            preparedStatement.setLong(1 , followedUserId);

            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                followers.add(resultSet.getLong("follower_user_id"));
            }
            return followers;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public boolean isFollowing(long followerUserId , long followedUserId) {
        try {
            PreparedStatement preparedStatement = this.connection
                    .prepareStatement("SELECT 1 FROM followers WHERE follower_user_id = ? AND followed_user_id = ?");
            preparedStatement.setLong(1 , followerUserId);
            preparedStatement.setLong(2 , followedUserId);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }







}






