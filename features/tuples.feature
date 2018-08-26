Feature: Is this a tuple?
  Did these functions create a point and vector correctly

  Scenario: A tuple with w=1.0 is a point
    Given a ← tuple: 4.3, -4.2, 3.1, 1.0
    Then a.x = 4.3
    And a.y = -4.2
    And a.z = 3.1
    And a.w = 1.0
    And a is a point
    And a is not a vector

  Scenario: A tuple with w=0 is a vector
    Testing a tuple that is a vector
    Given a ← tuple: 4.3, -4.2, 3.1, 0.0
    Then a.x = 4.3
    And a.y = -4.2
    And a.z = 3.1
    And a.w = 0.0
    And a is not a point
    And a is a vector

  Scenario: "point" describes tuples with w=1
    Given p ← point: 4,-4,3
    Then p = tuple: 4, -4, 3, 1

  Scenario: "vector" describes tuples with w=0
    Given v ← vector: 4,-4,3
    Then v = tuple: 4, -4, 3, 0
  
  Scenario Outline: two floating values should be equal
    Given two values to compare <first>, <second>
    Then first = second
    Examples:
    | first | second | 
    | 1.23456677777  | 1.23456677778  |
    | 1.23456677777  | 1.23456675777  |
    | 1.23456677777  | 1.23456677777  |

  Scenario Outline: two floating values should not be equal
    Given two values to compare <first>, <second>
    Then first != second
    Examples:
    | first | second | 
    | 1.23456677777  | 1.23466677777  |
    | 1.23456677777  | 2.0  |
    | 1.23456677777  | 999.22337  |

  Scenario: Adding two tuples
    Given first ← tuple: 3, -2, 5, 1
    And second ← tuple: -2, 3, 1, 0
    Then first plus second should equal tuple: 1, 1, 6, 1
  
  Scenario: Subtracting two points
    Given the first point(3, 2, 1)
    And the second point(5, 6, 7)
    Then firstPoint - secondPoint = vector(-2, -4, -6)

  Scenario: Subtracting a vector from a point
    Given a point(3, 2, 1)
    And a vector(5, 6, 7)
    Then the point minus the vector = point(-2, -4, -6)

  Scenario: Subtracting two vectors
    Given a firstVector(3, 2, 1)
    And a secondVector(5, 6, 7)
    Then the firstVector - secondVector = vector(-2, -4, -6)
