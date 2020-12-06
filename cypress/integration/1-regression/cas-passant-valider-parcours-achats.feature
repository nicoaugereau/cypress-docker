Feature: Valider un parcours d'achats
  
  Background:
    Given l'utilisateur visite le "front"

  Scenario: Identification utilisateur standard
    Given l'utilisateur n'est pas identifié
    When je m'identifie avec un profil "standard"
    Then je suis identifié
  
