package backend;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;

import org.json.JSONObject;

@Singleton
public class Facade {
	
	@PersistenceContext
	EntityManager emf;
	
	public JSONObject getUser(int id_user) {

		JSONObject json = null;
		
		try {

			User user = emf.find(User.class, id_user);

			json.put("id_user", user.getId_user());
			json.put("email", user.getEmail());
			json.put("password", user.getPassword());
			json.put("username", user.getUsername());
			json.put("followers", user.getFollowers());
			json.put("following", user.getFollowing());
			//json.put("Avatar", user.getAvatar());
			json.put("post_count", user.getPost_count());
			json.put("bio", user.getBio());
			
			String post_ids = "";
			
			for(Post post : user.getPosts()){
				post_ids += Integer.toString(post.getId_post()) + ", ";
			}
			
			json.put("post_ids", post_ids);

			return json;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return json;

	}
}