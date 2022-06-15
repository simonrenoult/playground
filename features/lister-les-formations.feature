Feature: Lister les formations

  Scenario: quand il n'y a aucune formation
    Given il y a 0 formation
    When je liste les formations
    Then le système retourne 0 formation


  Scenario: quand il y a 1 formation
    Given il y a 1 formation
    When je liste les formations
    Then le système retourne 1 formation

  Scenario: quand il y a 5 formations
    Given il y a 5 formations
    When je liste les formations
    Then le système retourne 5 formations
