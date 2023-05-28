package pack;

import javax.persistence.*;
import java.util.List;
import java.awt.Image;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_user;
	private String email;
	private String password;
	private String username;
	private int followers;
	private int following;
	private String avatar_filename;
	private int post_count;
	private String bio;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> posts;
	
	@ManyToMany
    @JoinTable(
            name = "user_saved_posts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private List<Post> savedPosts;
	
	@ManyToMany
    @JoinTable(
            name = "user_following",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    private List<User> followingList;
	
	public User() {
		super();
		this.email = "";
		this.password = "";
		this.username ="";
		this.bio = "";
		this.avatar_filename = "";
	}
	// Getters / Setters
	public int getId_user() {
		return id_user;
	}
	public void setId_user(int id_user) {
		this.id_user = id_user;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getFollowers() {
		return followers;
	}
	public void setFollowers(int followers) {
		this.followers = followers;
	}
	public int getFollowing() {
		return following;
	}
	public void setFollowing(int following) {
		this.following = following;
	}
	public String getAvatar_filename() {
		return avatar_filename;
	}
	public void setAvatar_filename(String avatar_filename) {
		this.avatar_filename = avatar_filename;
	}
	public int getPost_count() {
		return post_count;
	}
	public void setPost_count(int post_count) {
		this.post_count = post_count;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public List<Post> getPosts() {
		return posts;
	}
	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}
	public List<Post> getSavedPosts() {
		return savedPosts;
	}
	public void setSavedPosts(List<Post> posts) {
		this.savedPosts = posts;
	}
	public void incrementPostCount() {
		// TODO Auto-generated method stub
		this.post_count ++;
	}
	public List<User> getFollowingList() {
		return followingList;
	}
	public void setFollowingList(List<User> followingList) {
		this.followingList = followingList;
	}
}
