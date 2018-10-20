Feature: Let's create a world with a view and objects and a camera
    Is my world created correctly

    Scenario: Creating a world
        Given w ← world()
        Then w contains no objects
        And w has no light source

    Scenario: The default world
        Given light ← point_light(point(-10, 10, -10), color(1, 1, 1))
        And s1 ← sphere() with:
            | color    | (0.8, 1.0, 0.6) |
            | diffuse  | 0.7             |
            | specular | 0.2             |
        And s2 ← sphere() with:
            | transform | scaling(0.5, 0.5, 0.5) |
        When world ← default_world()
        Then world.light = light
        And world contains s1
        And world contains s2

    Scenario: Intersect a world with a ray
        Given world ← default_world()
        And ray ← ray(point(0, 0, -5), vector(0, 0, 1))
        When xs ← intersect_world(world, ray)
        Then xs.count = 4
        And xs[0].t = 4
        And xs[1].t = 4.5
        And xs[2].t = 5.5