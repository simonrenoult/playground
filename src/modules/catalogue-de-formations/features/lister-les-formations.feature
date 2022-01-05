Feature: Lister les formations

  Scenario: quand il n'y a aucune formation
    Given il y a 0 formations
    When je liste les formations
    Then le système retourne 0 formations
