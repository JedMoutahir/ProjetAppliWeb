package pack;

import javax.persistence.*;
import java.awt.Image;
import java.util.List;

@Entity
public class Post {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_post;
	private String date;
	private int likes;
	private String tag;
	private String general_tag;
	//private Image image;
	private String title;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToMany(mappedBy = "savedPosts")
    private List<User> users;
	
	public Post() {
		super();
		date = "";
		tag = "";
		general_tag = "";
		title = "";
	}

	//Getters / Setters

	public int getId_post() {
		return id_post;
	}

	public void setId_post(int id_post) {
		this.id_post = id_post;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getGeneral_tag() {
		return general_tag;
	}

	public void setGeneral_tag(String general_tag) {
		this.general_tag = general_tag;
	}
//
//	public Image getImage() {
//		return image;
//	}
//
//	public void setImage(Image image) {
//		this.image = image;
//	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
