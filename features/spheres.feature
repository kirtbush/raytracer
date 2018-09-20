Feature: Spheres and intersections
    Did these functions create and intersect spheres

    Scenario: A ray intersects a sphere at two points
        Given r ← ray(point(0, 0, -5), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0] = 4
        And xs[1] = 6
    Scenario: A ray intersects a sphere at a tangent
        Given r ← ray(point(0, 1, -5), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0] = 5
        And xs[1] = 5

    Scenario: A ray misses a sphere
        Given r ← ray(point(0, 2, -5), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 0

    Scenario: A ray originates inside a sphere
        Given r ← ray(point(0, 0, 0), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0] = -1
        And xs[1] = 1

    Scenario: A sphere is behind a ray
        Given r ← ray(point(0, 0, 5), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0] = -6
        And xs[1] = -4