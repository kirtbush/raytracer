Feature: Lets store intersections of objects and their position
    Did these functions calculate intersection and t value correctly?

    Scenario: An intersection encapsulates `t` and `object`
        Given s ← sphere()
        When i ← intersection(3.5, s)
        Then i.t = 3.5
        And i.object = s
    Scenario: Aggregating intersections
        Given s ← sphere()
        And i1 ← intersection(1, s)
        And i2 ← intersection(2, s)
        When xs ← intersections(i1, i2)
        Then xs.count = 2
        And xs[0].t = 1
        And xs[1].t = 2

    Scenario: Intersect sets the object on the intersection
        Given r ← ray(point(0, 0, -5), vector(0, 0, 1))
        And s ← sphere()
        When xs ← intersect(s, r)
        Then xs.count = 2
        And xs[0].object = s
        And xs[1].object = s
