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

	@OneToMany
	private List<Post> posts;
	
	public User() {
		super();
		email = "";
		password = "";
		username ="";
		bio = "";
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
}
