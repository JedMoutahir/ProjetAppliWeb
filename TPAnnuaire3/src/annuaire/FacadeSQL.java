package annuaire;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;



@Singleton

public class FacadeSQL {
	Connection con;

	String requete;
	
	@PostConstruct
	void init() throws SQLException, ClassNotFoundException {
	String db_url = "jdbc:hsqldb:hsql://localhost/xdb";
	String db_user = "sa";
	Class.forName("org.hsqldb.jdbcDriver");
	con = DriverManager.getConnection(db_url, db_user, null);
	}

	public void ajoutPersonne(String nom, String prenom) {
		requete = "INSERT INTO personne (prenom, nom) VALUES ('" +prenom+"', '"+nom+"')";
		try {
			Statement stmt = con.createStatement();
			stmt.executeQuery(requete);
		} catch (SQLException e) {
	          e.printStackTrace();
		}
	}
	
	public void ajoutAdresse(String rue, String ville) {
		requete = "INSERT INTO adresse (rue, ville) VALUES ('" +rue+"', '"+ville+"')";
		try {
			Statement stmt = con.createStatement();
			stmt.executeQuery(requete);
		} catch (SQLException e) {
	          e.printStackTrace();
		}
	}
	
	public void associer(int personneId, int adresseId) {
		requete = "UPDATE adresse SET personneid = '"+personneId+"' WHERE (id='"+adresseId+"')";
		try {
			Statement stmt = con.createStatement();
			stmt.executeQuery(requete);
		} catch (SQLException e) {
	          e.printStackTrace();
		}
				
	}
	
	public Collection<PersonneSQL> listePersonnes(){
		ArrayList<PersonneSQL> lp = new ArrayList<PersonneSQL>();
		requete = "SELECT * FROM personne";

		try {
			Statement sta = con.createStatement();
			ResultSet res = sta.executeQuery(requete);
			while (res.next()) {
		        String prenom = res.getString("prenom");
		        String nom = res.getString("nom");
		        Integer id = Integer.parseInt(res.getString("id"));
		        PersonneSQL p = new PersonneSQL(id, prenom, nom);
		        
		        requete = "SELECT * FROM adresse WHERE personneid='"+id+"'";
		        Statement sta2 = con.createStatement();
				ResultSet res2 = sta2.executeQuery(requete);
				while (res2.next()) {
					String rue = res2.getString("rue");
					String ville = res2.getString("ville");
					Integer id2 = Integer.parseInt(res2.getString("id"));
					AdresseSQL a = new AdresseSQL(id2, rue, ville);
					p.adresses.add(a);
				}
				lp.add(p);
		      }
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return lp;
	};
	
	public Collection<AdresseSQL> listeAdresses(){
		ArrayList<AdresseSQL> la = new ArrayList<AdresseSQL>();
		requete = "SELECT * FROM adresse";

		try {
			Statement sta = con.createStatement();
			ResultSet res = sta.executeQuery(requete);
			while (res.next()) {
		        String rue = res.getString("rue");
		        String ville = res.getString("ville");
		        Integer id = Integer.parseInt(res.getString("id"));
		        AdresseSQL a = new AdresseSQL(id, rue, ville);
				la.add(a);
		      }
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return la;
	};

}