
# Travel App

Notre application 'Travel App' a été développée avec le framework Ionic/Angular en utilisant Firebase Authentication et Firebase Realtime Database pour le stockage des données en temps réel. Elle permet aux utilisateurs de découvrir et de planifier leurs voyages aux différentes villes marocaines.

# Fonctionnalités principales
Interface Authentification utilisateur: 
Les utilisateurs peuvent créer un compte et se connecter à l'application (avec email et mot de passe ou bien avec Google) pour accéder à leurs propres espaces. Au cas ou le mot de passe est oublié l'utilisateur peut le réinitialiser (l'interface "password-reset").

#### Interface principale "cities" : 
Elle contient une toolbar composée de deux boutons une pour la liste des réservations de l'utilisateur connecté  et l'autre pour se déconnecter.
Pour le corps de l'interface il y a une liste des  différentes villes du Maroc avec des thumbnail, le nom de la ville, la région et un 'rating' statique. On a stocké  ces informations dans un fichier Json local.

#### Interface "city-details" :
Elle est composée d'un slider des images de la ville et un paragraphe descriptif, puis le bouton 'Réserver' qui nous redirige vers le formulaire de réservation.

#### Interface "reservation" :
C'est un reactive form pour la réservation. On a choisi d'utiliser ce type de formulaire grâce à ses avantages tels que :
- la validation des données: la vérification de la validité d'un email, la vérification de la longueur minimale d'un champ,etc. 
- la gestion réactive de l'état des formulaires: détecter les modifications des champs, les erreurs de validation et l'état global du formulaire en temps réel.
- la facilité d'utilisation :  on peut facilement définir des groupes de champs, des validateurs personnalisés et des messages d'erreur associés.

#### Interface "confirmation":
Après validation du formulaire l'utilisateur est redirigé vers cette interface  qui contient les données de sa réservation.

#### Interface "reservation-history":
l'utilisateur visualise toutes les réservations qui a effectué. Il y a l'option 'delete' pour la suppression d'une réservation. (on accède à cette interface par le bouton qui est dans l'interface principale)

 




## Demo

https://github.com/ibtissamNG/ionicTravelApp/assets/102632724/9035b23d-b9e8-4ac2-bc46-1822fce414b8

