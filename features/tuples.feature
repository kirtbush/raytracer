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
  
#floating value comparison tests
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

#addition and subtraction
  Scenario: Adding two tuples
    Given first ← tuple: 3, -2, 5, 1
    And second ← tuple: -2, 3, 1, 0
    Then first plus second should equal tuple: 1, 1, 6, 1
  
  Scenario: Subtracting two points
    Given p1 ← point(3, 2, 1)
    And p2 ← point(5, 6, 7)
    Then p1 - p2 = vector(-2, -4, -6)

  Scenario: Subtracting a vector from a point
    Given p ← point(3, 2, 1)
    And v ← vector(5, 6, 7)
    Then p - v = point(-2, -4, -6)

  Scenario: Subtracting two vectors
    Given v1 ← vector(3, 2, 1)
    And v2 ← vector(5, 6, 7)
    Then v1 - v2 = vector(-2, -4, -6)

#subtraction from zero
  Scenario: Subtracting a vector from the zero vector
    Given zero ← vector(0, 0, 0)
    And v ← vector(1, -2, 3)
    Then zero - v = vector(-1, 2, -3)

  Scenario: Negating a tuple
    Given a ← tuple(1, -2, 3, -4)
    Then -a = tuple(-1, 2, -3, 4)

#multiplcation and division of vectors (for scaling)
#e.g. what lies 3.5 times farther in that direction
  Scenario: Multiplying a tuple by a scalar
    Given a ← tuple(1, -2, 3, -4)
    Then a * 3.5 = tuple(3.5, -7, 10.5, -14)

  Scenario: Multiplying a tuple by a fraction
    Given a ← tuple(1, -2, 3, -4)
    Then a * 0.5 = tuple(0.5, -1, 1.5, -2)
    
  Scenario: Dividing a tuple by a scalar
    Given a ← tuple(1, -2, 3, -4)
    Then a / 2 = tuple(0.5, -1, 1.5, -2)

#magnitude
  Scenario: Magnitude of vector(1, 0, 0)
    Given v ← vector(1, 0, 0)
    Then magnitude(v) = 1
  Scenario: Magnitude of vector(0, 1, 0)
    Given v ← vector(0, 1, 0)
    Then magnitude(v) = 1
  Scenario: Magnitude of vector(0, 0, 1)
    Given v ← vector(0, 0, 1)
    Then magnitude(v) = 1
  Scenario: Magnitude of vector(1, 2, 3)
    Given v ← vector(1, 2, 3)
    Then magnitude(v) = √14
  Scenario: Magnitude of vector(-1, -2, -3)
    Given v ← vector(-1, -2, -3)
    Then magnitude(v) = √14

#normalization
  Scenario: Normalizing vector(4, 0, 0) gives (1, 0, 0)
    Given v ← vector(4, 0, 0)
    Then normalize(v) = vector(1, 0, 0)
  Scenario: Normalizing vector(1, 2, 3)
    Given v ← vector(1, 2, 3)
    # vector(1/√14, 2/√14, 3/√14)
    Then normalize(v) = approximately vector(0.26726, 0.53452, 0.80178)
  Scenario: The magnitude of a normalized vector
    Given v ← vector(1, 2, 3)
    When norm ← normalize(v)
    Then magnitude(norm) = 1

#dot
  Scenario: The dot product of two tuples
    Given a ← vector(1, 2, 3)
    And b ← vector(2, 3, 4)
    Then a dot b = 20

#cross
  Scenario: Cross product of two vectors
    Given a ← vector(1, 2, 3)
    And b ← vector(2, 3, 4)
    Then a cross b = vector(-1, 2, -1)
    And b cross a = vector(1, -2, 1)