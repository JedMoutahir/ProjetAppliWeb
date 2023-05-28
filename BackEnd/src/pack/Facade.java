package pack;

import java.io.File;
import java.nio.file.*;
import java.io.*;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.ejb.Singleton;
import javax.json.*;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

@Singleton
@Path("/")
public class Facade {

	String imagePath;
	String imageUploadPath;
	String outputPath;
	String avatarPath;
	boolean dev = false;

	@PersistenceContext
	EntityManager em;

	public Facade() {
		super();
		if(this.dev) {
			this.imagePath = "C:/Users/Jed/Desktop/cours_ENSEEIHT/Web/Projet/ProjetAppliWeb/ImageClassification/deleted_images/";
			this.imageUploadPath = "C:/Users/Jed/Desktop/cours_ENSEEIHT/Web/Projet/ProjetAppliWeb/ImageClassification/bank_images/";
			this.outputPath = "C:/Users/Jed/Desktop/cours_ENSEEIHT/Web/Projet/ProjetAppliWeb/ImageClassification/output/";
			this.avatarPath = "C:/Users/Jed/Desktop/cours_ENSEEIHT/Web/Projet/ProjetAppliWeb/frontend/avatars/";
            
		} else {
			this.imagePath = "C:/Users/rachi/OneDrive/Bureau/2A N7/S8/Appli web/ProjetAppliWeb/ImageClassification/deleted_images/";
			this.imageUploadPath = "C:/Users/rachi/OneDrive/Bureau/2A N7/S8/Appli web/ProjetAppliWeb/ImageClassification/bank_images/";
			this.outputPath = "C:/Users/rachi/OneDrive/Bureau/2A N7/S8/Appli web/ProjetAppliWeb/ImageClassification/output/";
			this.avatarPath = "C:/Users/rachi/OneDrive/Bureau/2A N7/S8/Appli web/ProjetAppliWeb/frontend/avatars/";
		}
	}
	
//	@POST
//    @Path("/analyze")
//    @Consumes({ "multipart/form-data" })
//	@Produces({"application/json"})
//    public String analyze(@MultipartForm FileUploadForm form) {
//        String fileName = form.getFileName();
//        String completeFilePath = "/tmp/" + fileName;
//        String Output = "Error in analyze in Facade.java";
//        try {
//          System.out.println(fileName);
//          File file = new File(completeFilePath);
//          System.out.println(completeFilePath);
//          if (!file.exists()) file.createNewFile();
//          FileOutputStream fos = new FileOutputStream(file);
//          fos.write(form.getFileData());
//          fos.flush();
//          fos.close();
//          System.out.println("File " + fileName + " successfully uploaded. Waiting for AI server.");
//          File fileOutput = new File(completeFilePath + ".labelOutput");
//          Date date = new Date();
//          long timeMilli = date.getTime();
//          while (!file.exists() || date.getTime() - timeMilli < 4000 ) {
//        	  // The image is still processing
//          }
//          FileInputStream fis = new FileInputStream(fileOutput);
//          int content;
//          String fileContent = "";
//          // reads a byte at a time, if it reached end of the file, returns -1
//          System.out.println("Beginning to read : ");
//          while ((content = fis.read()) != -1) {
//              System.out.println((char)content);
//              fileContent += (char) content;
//          }
//          fis.close();
//          System.out.println(fileContent);
//          return fileContent;
//        } catch (Exception e) {
//          e.printStackTrace();
//        } finally {
//        	return Output;
//        }
//    }
	
	@POST
	@Path("/login")
	@Produces({ "application/json" })
	@Consumes({ "application/json" })
	public JsonObject checkCredentials(JsonObject credentials) {
	    String username = credentials.getString("username");
	    String password = credentials.getString("password");

	    try {
	        User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
	                      .setParameter("username", username)
	                      .getSingleResult();

	        boolean success = user.getPassword().equals(password);

	        JsonObject response = Json.createObjectBuilder()
	                                  .add("success", success)
	                                  .add("id", user.getId_user())
	                                  .build();

	        return response;
	    } catch (NoResultException e) {
	        JsonObject response = Json.createObjectBuilder()
	                                  .add("success", false)
	                                  .build();

	        return response;
	    }
	}
	
	@POST
	@Path("/signup")
	@Produces({ "application/json" })
	@Consumes({ "application/json" })
	public JsonObject createUser(JsonObject userData) {
	    String username = userData.getString("username");
	    String password = userData.getString("password");

	    List<User> existingUsers = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
	                                .setParameter("username", username)
	                                .getResultList();

	    if (!existingUsers.isEmpty()) {
	        JsonObject response = Json.createObjectBuilder()
	                                  .add("success", false)
	                                  .add("message", "Username already exists")
	                                  .build();

	        return response;
	    } else {
	        User newUser = new User();
	        newUser.setUsername(username);
	        newUser.setPassword(password);

	        em.persist(newUser);

	        JsonObject response = Json.createObjectBuilder()
	                                  .add("success", true)
	                                  .add("message", "User created successfully")
	                                  .build();

	        return response;
	    }
	}
	
	@GET
	@Path("/listPosts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listPosts() {
        List<Post> posts = em.createQuery("SELECT p FROM Post p", Post.class).getResultList();

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (Post post : posts) {
            String imageContent = encodeImageContent(this.imagePath + post.getTitle());
            String avatarContent = encodeImageContent(avatarPath + post.getUser().getAvatar_filename());

            JsonObject userObject = Json.createObjectBuilder()
                    .add("username", post.getUser().getUsername())
                    .add("bio", post.getUser().getBio())
                    .add("followers", post.getUser().getFollowers())
                    .add("following", post.getUser().getFollowing())
                    .add("posts_count", post.getUser().getPost_count())
                    .add("avatar", avatarContent)
                    .build();

            JsonObject postObject = Json.createObjectBuilder()
                    .add("id", post.getId_post())
                    .add("filename", post.getTitle())
                    .add("post", imageContent)
                    .add("likes", post.getLikes())
                    .add("tag", post.getTag())
                    .add("general_tag", post.getGeneral_tag())
                    .add("user", userObject)
                    .build();

            jsonArrayBuilder.add(postObject);
        }

        JsonArray jsonArray = jsonArrayBuilder.build();
        JsonObject responseJson = Json.createObjectBuilder()
                .add("posts", jsonArray)
                .build();

        return Response.ok(responseJson).build();
    }

	private String encodeImageContent(String imagePath) {
        try {
            File file = new File(imagePath);
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] imageBytes = new byte[(int) file.length()];
            fileInputStream.read(imageBytes);
            fileInputStream.close();
            
            String base64Content = Base64.getEncoder().encodeToString(imageBytes);
            return base64Content;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

	@POST
	@Path("/upload")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response uploadImage(JsonObject json) {
	    try {
	        String filename = json.getString("filename");
	        System.out.println("filename : " + filename);
	        JsonArray contentArray = json.getJsonArray("content");
	        System.out.println("content : " + contentArray);
	        JsonObject contentObject = contentArray.getJsonObject(0);
	        String base64Content = contentObject.getString("stream");
	        byte[] fileContent = Base64.getDecoder().decode(base64Content);
	        InputStream fileInputStream = new ByteArrayInputStream(fileContent);
	        
	        System.out.println("saving the image");
	        // Save the image to the destination folder
            saveImage(fileInputStream, this.imageUploadPath, filename);
	        System.out.println("image saved");

            int userId = json.getInt("id");
	        System.out.println("user id : " + userId);

            // Get the user from the database
            User user = em.find(User.class, userId);
            if (user == null) {
    	        System.out.println("user not found");
                JsonObject response = Json.createObjectBuilder()
                        .add("success", false)
                        .add("message", "User not found")
                        .build();
                return Response.status(Response.Status.NOT_FOUND).entity(response).build();
            }
            
            System.out.println("Waiting for the python deamon to generate the tags");
            
            while(existFile(this.imageUploadPath, filename)) {
            	// wait
            	System.out.println("waiting");
            	try {
					TimeUnit.MILLISECONDS.sleep(200);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
            
            System.out.println("Searching the output file");
            
            String generalTag = getTag(this.outputPath, filename);
            
	        System.out.println("creating the post");
            // Create a new post and link it to the user
            Post post = new Post();
            post.setTitle(filename);
            post.setUser(user);
            post.user.incrementPostCount();
            post.setGeneral_tag(generalTag);
	        System.out.println("storing the post");
            // Save the post to the database
            em.persist(post);

	        System.out.println("Sending the answer");
            JsonObject response = Json.createObjectBuilder()
                    .add("success", true)
                    .add("id", post.getId_post())
                    .add("general_tag", generalTag)
                    .add("message", "Image uploaded successfully")
                    .build();
            return Response.ok(response).build();

        } catch (IOException | NullPointerException e) {
        	e.printStackTrace();
            JsonObject response = Json.createObjectBuilder()
                    .add("success", false)
                    .add("message", "Error uploading the image")
                    .build();

            return Response.serverError().entity(response).build();
        }
    }

	private String getTag(String path, String filename) {
		// TODO Auto-generated method stub
		String generalTag = "";
		File outputFile = new File(path + filename + ".output");
		if(outputFile.exists()) {
			System.out.println("output file found");
			try {
                BufferedReader reader = new BufferedReader(new FileReader(outputFile));
                String line = reader.readLine();
                if (line != null) {
                    String[] words = line.split("\n");
                    if (words.length > 0) {
                        String firstWord = words[0];
                        System.out.println("First word: " + firstWord);
                        generalTag = firstWord;
                    } else {
                        System.out.println("No words found in the file.");
                    }
                } else {
                    System.out.println("Empty file.");
                }
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Output file not found.");
        }
		return generalTag;
	}

	private boolean existFile(String path, String filename) {
		// TODO Auto-generated method stub
        File file = new File(path + filename);
        return file.exists();
	}

	private void saveImage(InputStream inputStream, String destinationFolder, String filename) throws IOException {
	    File folder = new File(destinationFolder);

	    // If the destination folder doesn't exist, create it
	    if (!folder.exists()) {
	        folder.mkdirs();
	    }

	    // Save the image file to the destination folder
	    File outputFile = new File(folder, filename);
	    Files.copy(inputStream, outputFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
	}
	
	@POST
	@Path("/like")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response likePost(JsonObject json) {
	    int postId = json.getInt("id_post");

	    // Retrieve the post from the database
	    Post post = em.find(Post.class, postId);

	    if (post == null) {
	        // Post not found in the database
	        JsonObject responseJson = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "Post not found")
	                .build();

	        return Response.status(Response.Status.NOT_FOUND)
	                .entity(responseJson)
	                .build();
	    }

	    // Increment the like count
	    int likeCount = post.getLikes();
	    likeCount++;
	    post.setLikes(likeCount);

	    // Update the post in the database
	    em.merge(post);

	    // Build the response JSON
	    JsonObject responseJson = Json.createObjectBuilder()
	            .add("success", true)
	            .add("like_count", likeCount)
	            .add("message", "Like added successfully")
	            .build();

	    return Response.ok(responseJson).build();
	}
	
	@POST
	@Path("/changeAvatar")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changeAvatar(JsonObject json) {
	    try {
	        String filename = json.getString("filename");
	        System.out.println("filename: " + filename);

	        JsonArray contentArray = json.getJsonArray("content");
	        JsonObject contentObject = contentArray.getJsonObject(0);
	        String base64Content = contentObject.getString("stream");
	        byte[] fileContent = Base64.getDecoder().decode(base64Content);
	        InputStream fileInputStream = new ByteArrayInputStream(fileContent);

	        // Save the image to the destination folder
	        saveImage(fileInputStream, this.avatarPath, filename);

	        int userId = json.getInt("id");
	        System.out.println("user id: " + userId);

	        // Get the user from the database
	        User user = em.find(User.class, userId);
	        if (user == null) {
	            System.out.println("user not found");
	            JsonObject response = Json.createObjectBuilder()
	                    .add("success", false)
	                    .add("message", "User not found")
	                    .build();
	            return Response.status(Response.Status.NOT_FOUND).entity(response).build();
	        }

	        // Update the user's avatar
	        user.setAvatar_filename(filename);

	        System.out.println("updating the user's avatar");
	        // Save the updated user to the database
	        em.merge(user);

	        System.out.println("sending the response");
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", true)
	                .add("message", "Avatar changed successfully")
	                .build();
	        return Response.ok(response).build();

	    } catch (IOException | NullPointerException e) {
	        e.printStackTrace();
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "Error changing the avatar")
	                .build();

	        return Response.serverError().entity(response).build();
	    }
	}
	
	@POST
	@Path("/profile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserProfile(JsonObject json) {
		int userId = json.getInt("id_user");
	    System.out.println("user id: " + userId);

	    // Get the user from the database
	    User user = em.find(User.class, userId);
	    if (user == null) {
	        System.out.println("user not found");
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "User not found")
	                .build();
	        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
	    }

	    // Get the user's posts
	    List<Post> posts = user.getPosts();
        String avatarContent = encodeImageContent(avatarPath + user.getAvatar_filename());

	    // Build the JSON response
	    JsonObjectBuilder userBuilder = Json.createObjectBuilder()
	            .add("id_user", user.getId_user())
	            .add("username", user.getUsername())
	            .add("followers", user.getFollowers())
	            .add("following", user.getFollowing())
	            .add("post_count", user.getPost_count())
	            .add("avatar", avatarContent)
	            .add("filename", user.getAvatar_filename());

	    JsonArrayBuilder postsBuilder = Json.createArrayBuilder();
	    for (Post post : posts) {
	        JsonObjectBuilder postBuilder = Json.createObjectBuilder()
	                .add("id_post", post.getId_post())
	                .add("title", post.getTitle())
	                .add("date", post.getDate())
	                .add("likes", post.getLikes())
	                .add("tag", post.getTag())
	                .add("general_tag", post.getGeneral_tag())
	                .add("image", encodeImageContent(this.imagePath + post.getTitle()));

	        postsBuilder.add(postBuilder);
	    }

	    JsonObject response = Json.createObjectBuilder()
	            .add("success", true)
	            .add("user", userBuilder)
	            .add("posts", postsBuilder)
	            .build();

	    return Response.ok(response).build();
	}
	
	@POST
	@Path("/savedPosts")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSavedPosts(JsonObject json) {
		int userId = json.getInt("id_user");
	    System.out.println("user id: " + userId);

	    // Get the user from the database
	    User user = em.find(User.class, userId);
	    if (user == null) {
	        System.out.println("user not found");
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "User not found")
	                .build();
	        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
	    }

	    // Get the saved posts for the user
	    List<Post> savedPosts = user.getSavedPosts();

	    // Build the JSON response
	    JsonArrayBuilder savedPostsBuilder = Json.createArrayBuilder();
	    for (Post post : savedPosts) {
	        JsonObjectBuilder postBuilder = Json.createObjectBuilder()
	                .add("id_post", post.getId_post())
	                .add("title", post.getTitle())
	                .add("date", post.getDate())
	                .add("likes", post.getLikes())
	                .add("tag", post.getTag())
	                .add("general_tag", post.getGeneral_tag())
	                .add("image", encodeImageContent(this.imagePath + post.getTitle()));

	        savedPostsBuilder.add(postBuilder);
	    }

	    JsonObject response = Json.createObjectBuilder()
	            .add("success", true)
	            .add("savedPosts", savedPostsBuilder)
	            .build();

	    return Response.ok(response).build();
	}
	
	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response savePost(JsonObject json) {
	    int userId = json.getInt("id_user");
	    int postId = json.getInt("id_post");

	    // Get the user from the database
	    User user = em.find(User.class, userId);
	    if (user == null) {
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "User not found")
	                .build();
	        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
	    }

	    // Get the post from the database
	    Post post = em.find(Post.class, postId);
	    if (post == null) {
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "Post not found")
	                .build();
	        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
	    }

	    // Check if the post is already saved by the user
	    List<Post> savedPosts = user.getSavedPosts();
	    if (savedPosts.contains(post)) {
	        JsonObject response = Json.createObjectBuilder()
	                .add("success", false)
	                .add("message", "Post already saved by the user")
	                .build();
	        return Response.ok(response).build();
	    }

	    // Add the post to the user's saved posts and save the user entity
	    savedPosts.add(post);
	    user.setSavedPosts(savedPosts);
	    em.persist(user);

	    JsonObject response = Json.createObjectBuilder()
	            .add("success", true)
	            .add("message", "Post saved successfully")
	            .build();
	    return Response.ok(response).build();
	}
}
