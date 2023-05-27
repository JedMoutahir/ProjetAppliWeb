package pack;

import java.io.File;
import java.nio.file.*;
import java.io.*;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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

	@PersistenceContext
	EntityManager em;
	
//	@POST
//    @Path("/upload")
//    @Consumes({ "multipart/form-data" })
//    public void upload(@MultipartForm FileUploadForm form) {
//        String fileName = form.getFileName();
//        String completeFilePath = "C:/Users/rachi/OneDrive/Bureau/test/" + fileName;
//        try {
//          System.out.println(fileName);
//          File file = new File(completeFilePath);
//          if (!file.exists()) file.createNewFile();
//          FileOutputStream fos = new FileOutputStream(file);
//          fos.write(form.getFileData());
//          fos.flush();
//          fos.close();
//        } catch (Exception e) {
//          e.printStackTrace();
//        }
//    }
	
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
            JsonObject userObject = Json.createObjectBuilder()
                    .add("username", post.getUser().getUsername())
                    .add("bio", post.getUser().getBio())
                    .add("followers", post.getUser().getFollowers())
                    .add("following", post.getUser().getFollowing())
                    .add("posts_count", post.getUser().getPost_count())
                    .build();

            JsonObject postObject = Json.createObjectBuilder()
                    .add("id", post.getId_post())
                    .add("name", post.getTitle())
                    .add("post", post.getId_post())
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
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response uploadImage(JsonObject json) {
	    String destinationFolder = "C:/Users/Jed/Desktop/cours_ENSEEIHT/Web/Projet/ProjetAppliWeb/ImageClassification/bank_images/";
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
            saveImage(fileInputStream, destinationFolder, filename);
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

	        System.out.println("creating the post");
            // Create a new post and link it to the user
            Post post = new Post();
            post.setTitle(filename);
            post.setUser(user);

	        System.out.println("storing the post");
            // Save the post to the database
            em.persist(post);

	        System.out.println("Sending the answer");
            JsonObject response = Json.createObjectBuilder()
                    .add("success", true)
                    .add("id", post.getId_post())
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
	
	
}
