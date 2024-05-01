
# Application E-commerce de Maquillage

Ce projet est une application de vente et d'achat de maquillage, avec une architecture backend développée en utilisant Spring Boot et un frontend réalisé avec React JS.

## Backend de l'Application E-commerce de Maquillage:

Ce projet est le backend d'une application de vente et d'achat de maquillage, construite avec Spring Boot. Il fournit les services RESTful nécessaires pour gérer les utilisateurs, les produits, les commandes, les paiements, les catégories et les paniers.

### Description des Packages:

- `config`: Contient les configurations de sécurité et d'authentification JWT.
- `controller`: Les contrôleurs RESTful pour gérer les requêtes HTTP.
- `entity`: Les entités JPA qui représentent les données de la base de données.
- `exception`: Les classes pour gérer les exceptions personnalisées.
- `payload`: Les classes pour représenter les requêtes et réponses JWT.
- `repository`: Les interfaces de repository JPA pour interagir avec la base de données.
- `service`: Les services pour implémenter la logique métier.
- `util`: Les classes utilitaires pour diverses tâches.

### Dépendances Requises:

- Spring Boot 2.x
- Spring Security
- Spring Data JPA
- MySQL Connector
- JSON Web Token (JWT)

### Configuration:

1. Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine.
2. Créez une base de données nommée `ecommerce`.
3. Modifiez les propriétés de la base de données dans le fichier `application.properties`.
4. Exécutez l'application en utilisant Maven ou votre IDE préféré.

### Utilisation:

L'application expose des points de terminaison RESTful pour effectuer des opérations CRUD sur les utilisateurs, les produits, les commandes, etc. Assurez-vous de vous authentifier avec un token JWT valide pour accéder aux ressources protégées.

## FrontEnd:

Le frontend est développé en utilisant React.js. L'architecture proposée suit une organisation par composants et pages pour une gestion efficace de l'interface utilisateur.

### Utilitaires:

Le dossier "util" dans le frontend contient le fichier "auth.js" pour la gestion de l'authentification côté client.



### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/3.1.5/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/3.1.5/maven-plugin/reference/html/#build-image)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/3.1.5/reference/htmlsingle/index.html#using.devtools)
* [Spring Web](https://docs.spring.io/spring-boot/docs/3.1.5/reference/htmlsingle/index.html#web)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)

