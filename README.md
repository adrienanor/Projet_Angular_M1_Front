# Présentation de notre Projet Angular M1

**Développeurs** : Adrien Anor, Matthias Bardy, Morgan Sauvignon. <br><br>

Voici le repository du front end de notre projet web.<br><br><br>

# Lien de l'application web 

Pour avoir accès à notre application web, veuillez cliquer sur le lien suivant : https://front-projet-angular.onrender.com/
 <br><br><br>

# Se connecter à l'application web

Une fois dans l'application, si vous voulez vous connecter en tant qu'**élève**, suivez la procèdure d'inscription en cliquant sur le bouton **"S'inscrire"**.
<br><br>
Cependant, si vous voulez vous connecter en tant qu'**administrateur**, utilisez les identifiants suivant : 
<br><br>
**• Identifiant** : admin 
<br>
**• Mot de passe** : admin
<br><br><br>

# Fonctionnalité de l'application web 
Nous avons tout implémenter sauf l'authentification grâce au Tokens. 
<br><br>
Notre base de données est constitués de trois collections : assignments, matieres et utilisateurs
<br><br>
Nous sommes capables de nous inscrire et nous connecter. Quand nous nous inscrivons, nous rajoutons l'utilisateur dans la base de données. Quand on se connecte, on regarde dans notre base de données si notre utilisateur existe. 
<br><br>
Si je ne suis pas connecté : Je suis capable de regarder le détaillé des rendus et de les trier, mais aussi je peux accéder à la liste des matières et des élèves. 
<br>
Si je suis connecté en tant qu'élève : Je suis capable de faire en plus la modification des rendus et d'ajouter un devoir ou une matière. 
<br>
Si je suis connecté en tant qu'administrateur : Je suis capable de faire en plus une suppression des rendus. 
<br><br>
Pour le tableau des assignments, nous avons le filtre par rendu, et la barre de recherche. Nous sommes capables de récupérer donc les assignments dans notre base de données, d'en ajouter et d'en supprimer suivant notre niveau de droits. 
<br>
Nous pouvons consulter la liste des matières et la liste des élèves, puis en ajouter suivant nos besoins. Cet ajout est directement effectuer dans notre base de données. Quand nous voulons les afficher, nous récupérer ces enregistrement dans mongoDB. 

<br><br><br>
# Lien de la vidéo de présentation de notre application web
Lien : https://unice-my.sharepoint.com/:f:/g/personal/morgan_sauvignon_etu_unice_fr/ErlOqtiZ86pHtG4IqYYMyG0ByUmFETap6M5MpyTOUJyqKg?e=VBf5Kf
