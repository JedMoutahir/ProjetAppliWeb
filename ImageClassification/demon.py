# Scan le dossier pour voir si il y a une image
# Si oui, la traite et la supprime
# Le traitement: analyse tags, mettre dans un string ecrit dans un fichier texte avec une bonne extension .output

# Verifie en boucle si il y a un fichier dans le dossier bank_images

import os
from PIL import Image
import imag_recog
import shutil

# Chemin du dossier contenant les images
dossier_images = "bank_images/"

# Vérification du dossier en boucle
while True:
    # Liste tous les fichiers dans le dossier
    fichiers = os.listdir(dossier_images)

    # Vérifie s'il y a des fichiers dans le dossier
    if fichiers:
        # Parcours de tous les fichiers dans le dossier
        for fichier in fichiers:
            # Vérifie si le fichier est une image
            if fichier.endswith((".png", ".jpg", ".jpeg")):
                
                # Ouvre l'image
                image = Image.open(dossier_images + fichier)

                # Analyse l'image
                tags = imag_recog.label_image(image)

                # Crée le fichier .output et écrit les tags dedans
                with open(dossier_images + fichier + ".output", "w") as f:
                    for tag in tags:
                        f.write(tag + "\n")

                # Déplace le fichier .output dans le dossier output
                shutil.move(dossier_images + fichier + ".output", "output/" + fichier + ".output")

                # Déplace l'image dans le dossier deleted_images
                shutil.move(dossier_images + fichier, "deleted_images/" + fichier)



