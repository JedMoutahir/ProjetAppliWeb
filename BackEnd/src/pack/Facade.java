package pack;

import java.io.File;
import java.io.*;
import java.util.Collection;
import java.util.Date;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

@Singleton
@Path("/")
public class Facade {

	@PersistenceContext
	EntityManager em;
	
	@POST
    @Path("/upload")
    @Consumes({ "multipart/form-data" })
    public void upload(@MultipartForm FileUploadForm form) {
        String fileName = form.getFileName();
        String completeFilePath = "C:/Users/rachi/OneDrive/Bureau/test/" + fileName;
        try {
          System.out.println(fileName);
          File file = new File(completeFilePath);
          if (!file.exists()) file.createNewFile();
          FileOutputStream fos = new FileOutputStream(file);
          fos.write(form.getFileData());
          fos.flush();
          fos.close();
        } catch (Exception e) {
          e.printStackTrace();
        }
    }
	
	@POST
    @Path("/analyze")
    @Consumes({ "multipart/form-data" })
	@Produces({"application/json"})
    public String analyze(@MultipartForm FileUploadForm form) {
        String fileName = form.getFileName();
        String completeFilePath = "/tmp/" + fileName;
        String Output = "Error in analyze in Facade.java";
        try {
          System.out.println(fileName);
          File file = new File(completeFilePath);
          System.out.println(completeFilePath);
          if (!file.exists()) file.createNewFile();
          FileOutputStream fos = new FileOutputStream(file);
          fos.write(form.getFileData());
          fos.flush();
          fos.close();
          System.out.println("File " + fileName + " successfully uploaded. Waiting for AI server.");
          File fileOutput = new File(completeFilePath + ".labelOutput");
          Date date = new Date();
          long timeMilli = date.getTime();
          while (!file.exists() || date.getTime() - timeMilli < 4000 ) {
        	  // The image is still processing
          }
          FileInputStream fis = new FileInputStream(fileOutput);
          int content;
          String fileContent = "";
          // reads a byte at a time, if it reached end of the file, returns -1
          System.out.println("Beginning to read : ");
          while ((content = fis.read()) != -1) {
              System.out.println((char)content);
              fileContent += (char) content;
          }
          fis.close();
          System.out.println(fileContent);
          return fileContent;
        } catch (Exception e) {
          e.printStackTrace();
        } finally {
        	return Output;
        }
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
	
}
