

# Galerie Photo

Cette applicaton web permet de visionner et de gérer une galerie photo.

# Usage rapide

Un serveur web faisant tourner l'application a été déployé, il vous permettra de la tester sans avoir à l'installer.

## Page d'accueil

- http://51.15.206.126

## API

- http://51.15.206.126/api/PZvv8Mqae8jFuUa4/

## Administration

- http://51.15.206.126/admin/

## Guide de démarrage
Ces instructions vous permettront de récupérer ce projet et de le lancer sur une machine locale de développement à des fins de tests.

### Prérequis

Vous devez posséder un serveur web et y installer

```
PHP 7 & MySQL
```

### Installation

Il suffira d'importer la base de données fournie dans le dossier sur votre machine  **/DB File/photogallery.sql**
Et d'éditer la configuration SQL du fichier, en précisant vos identifiants **/Lib/PDOFactory.class.php**

La configuration locale la plus commune pour PDOFactory.class.php est :

```
'localhost' en serveur
'root' en utilisateur
'' OU 'root' en mot de passe
```
L'application web sera consultable via le dossier **/Web/**, il est indispensable  de mettre en place un VirtualHost,

* Pensez bien à activer les VirtualHosts extras de votre serveur apache (fichier **/etc/apache2/httpd.conf** sur Debian) :

```
# Virtual hosts
Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

* Il faut ensuite modifier le fichier httpd-vhosts.conf (**/etc/apache2/extra/httpd-vhosts.conf** sur Debian) :

```
```
<VirtualHost *:80>
  ServerAdmin webmaster@localhost

  # Mettez ici le nom de domaine que vous avez utilisé dans le fichier hosts.
  ServerName photogallery

  # Mettez ici le chemin vers lequel doit pointer le domaine.
  DocumentRoot /Applications/MAMP/htdocs/PhotoGallery/Web
  <Directory /Applications/MAMP/htdocs/PhotoGallery/Web>
    Options Indexes FollowSymLinks MultiViews

    Header set Access-Control-Allow-Origin "*"

    # Cette directive permet d'activer les .htaccess.
    AllowOverride All

    # Si le serveur est accessible via l'Internet mais que vous n'en faites qu'une utilisation personnelle
    # pensez à interdire l'accès à tout le monde
    # sauf au localhost, sinon vous ne pourrez pas y accéder !
    deny from all
    allow from localhost
  </Directory>
</VirtualHost>
```
Pour finir il faut rajouter la ligne suivante dans son fichier hosts (**/etc/hosts** sur Linux, **C:\Windows\System32\drivers\etc\hosts sous Windows**)  :

```
127.0.0.1 photogallery
```
L'application sera directement testable en local via http://photogallery/
## Tester l'application

Vous pouvez vous authentifier à l'administration (http://photogallery/admin/)  :
```
Utilisateur : admin
Mot de passe : mdp
```

L'application est directement consultable ici : http://51.15.206.126

## Versioning

GitHub a été utilisé pour maintenir un versionning du projet.

## Auteurs

- **Brian SABATIER**  (21907858)
- **Alexy ROUSSEAU** (21910036)
- **Axel DENOUAL** (21600639)
- **François DALLOCCHIO** (2170281)