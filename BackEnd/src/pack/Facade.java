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
	@Path("/listposts")
	@Produces({ "application/json" })
	public JsonArray listPosts() {
	    List<Post> posts = em.createQuery("SELECT p FROM Post p", Post.class).getResultList();

	    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
	    for (Post post : posts) {
	        arrayBuilder.add(Json.createObjectBuilder()
	            .add("id_post", post.getId_post())
	            .add("date", post.getDate())
	            .add("likes", post.getLikes())
	            .add("tag", post.getTag())
	            .add("general_tag", post.getGeneral_tag())
	            .add("title", post.getTitle())
	        );
	    }

	    return arrayBuilder.build();
	}

	@POST
	@Path("/addperson")
    @Consumes({ "application/json" })
	public void addPerson(Person p) {
		System.out.println("coucou");
		em.persist(p);
	}

	@POST
	@Path("/addaddress")
    @Consumes({ "application/json" })
	public void addAddress(Address a) {
		em.persist(a);
	}
	
	@GET
	@Path("/listpersons")
    @Produces({ "application/json" })
	public Collection<Person> listPersons() {
		return em.createQuery("from Person", Person.class).getResultList();
	}
	
	@GET
	@Path("/listaddresses")
    @Produces({ "application/json" })
	public Collection<Address> listAddress() {
		return em.createQuery("from Address", Address.class).getResultList();	
	}
	
	@POST
	@Path("/associate")
    @Consumes({ "application/json" })
	public void associate(Association as) {
		System.out.println(as.getPersonId() +" "+ as.getAddressId());
		Person p = em.find(Person.class, as.getPersonId());
		Address a = em.find(Address.class, as.getAddressId());
		a.setOwner(p);
	}
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response uploadImage(JsonObject json) {
	    String destinationFolder = "C:/Users/rachi/OneDrive/Bureau/2A N7/S8/Appli web/ProjetAppliWeb/ImageClassification/bank_images/";
	    try {
	        String filename = json.getString("filename");
	        JsonArray contentArray = json.getJsonArray("content");
	        JsonObject contentObject = contentArray.getJsonObject(0);
	        String base64Content = contentObject.getString("stream");
	        byte[] fileContent = Base64.getDecoder().decode(base64Content);
	        InputStream fileInputStream = new ByteArrayInputStream(fileContent);

	        // Save the image to the destination folder
	        saveImage(fileInputStream, destinationFolder, filename);

	        JsonObject response = Json.createObjectBuilder()
	                .add("success", true)
	                .add("message", "Image uploaded successfully")
	                .build();

	        return Response.ok(response).build();
	    } catch (IOException | NullPointerException e) {
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
