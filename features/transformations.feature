Feature: Can we transforms objects?
  Did these functions manipulateand transform objects correctly

  Scenario: Multiplying by a translation matrix
    Given transform ← translation(5, -3, 2)
    And p ← point(-3, 4, 5)
    Then transform * p = point(2, 1, 7)

  Scenario: Multiplying by the inverse of a translation matrix
    Given transform ← translation(5, -3, 2)
    And inv ← inverse(transform)
    And p ← point(-3, 4, 5)
    Then inv * p = point(-8, 7, 3) 

  Scenario: Translation does not affect vectors
    Given transform ← translation(5, -3, 2)
    And v ← vector(-3, 4, 5)
    Then transform * v = v   