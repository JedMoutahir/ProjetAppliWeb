package backend;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;

@Singleton
public class Facade {
	
	@PersistenceContext
	EntityManager emf;

}