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

    Scenario: A sphere's default transformation
        Given s ← sphere()
        Then s.transform = identity_matrix
    Scenario: Changing a sphere's transformation
        Given s ← sphere()
        And t ← translation(2, 3, 4)
        When set_transform(s, t)
    Scenario: Intersecting a scaled sphere with a ray
        Given r ← ray(point(0, 0, -5), vector(0, 0, 1))
        And s ← sphere()
        When set_transform(s, scaling(2, 2, 2))
        And xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0].t = 3
        And xs[1].t = 7
    Scenario: Intersecting a translated sphere with a ray
        Given r ← ray(point(0, 0, -5), vector(0, 0, 1))
        And s ← sphere()
        When set_transform(s, translation(5, 0, 0))
        And xs ← intersect(s, r)
        Then xs.count = 0

    #Normals
    Scenario: The normal on a sphere at a point on the x axis
        Given s ← sphere()
        When n ← normal_at(s, point(1, 0, 0))
        Then n = vector(1, 0, 0)
    Scenario: The normal on a sphere at a point on the y axis
        Given s ← sphere()
        When n ← normal_at(s, point(0, 1, 0))
        Then n = vector(0, 1, 0)
    Scenario: The normal on a sphere at a point on the z axis
        Given s ← sphere()
        When n ← normal_at(s, point(0, 0, 1))
        Then n = vector(0, 0, 1)
    Scenario: The normal on a sphere at a non-axial point
        Given s ← sphere()
        When n ← normal_at(s, point(√3/3, √3/3, √3/3))
        Then n = vector(√3/3, √3/3, √3/3)
    Scenario: The normal is a normalized vector
        Given s ← sphere()
        When n ← normal_at(s, point(√3/3, √3/3, √3/3))
        Then n = normalize(n)

    Scenario: Computing the normal on a translated sphere
        Given s ← sphere()
        And set_transform(s, translation(0, 1, 0))
        When n ← normal_at(s, point(0, 1.70711, -0.70711))
        Then n = vector(0, 0.70711, -0.70711)
    Scenario: Computing the normal on a scaled sphere
        Given s ← sphere()
        And set_transform(s, scaling(1, 0.5, 1))
        When n ← normal_at(s, point(0, √2/2, -√2/2))
        Then n = vector(0, 0.97014, -0.24254)