package annuaire;

import java.util.ArrayList;

public class PersonneSQL {
	public Integer id;
	public String prenom;
	public String nom;
	public ArrayList<AdresseSQL> adresses = new ArrayList<AdresseSQL>();

	public PersonneSQL(Integer id, String prenom, String nom) {
		this.id = id;
		this.prenom = prenom;
		this.nom = nom;
	}
}
