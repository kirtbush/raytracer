Feature: Is this a matrix?
  Did these functions create and manipulate matrices correctly

  Scenario: Constructing and inspecting a 4x4 matrix
    Given the following 4x4 matrix M:
    | 1 | 2 | 3 | 4 |
    | 5.5 | 6.5 | 7.5 | 8.5 |
    | 9 | 10 | 11 | 12 |
    | 13.5 | 14.5 | 15.5 | 16.5 |
    Then M[0,0] = 1
    And M[0,3] = 4
    And M[1,0] = 5.5
    And M[1,2] = 7.5
    And M[2,2] = 11
    And M[3,0] = 13.5
    And M[3,2] = 15.5  

  Scenario: A 2x2 matrix ought to be representable
    Given the following 2x2 matrix M:
    | -3 | 5 |
    | 1 | -2 |
    Then the size of M is 2
  Scenario: A 3x3 matrix ought to be representable
    Given the following 3x3 matrix M:
    | -3 | 5 | 0 |
    | 1 | -2 | -7 |
    | 0 | 1 | 1 |
    Then the size of M is 3
