Feature: Materials feature
    Functions that represent different types of materials

    Background: base config for lighting test
        Given m ← material()
        And position ← point(0, 0, 0)

    Scenario: The default material
        Given m ← material()
        Then m.color = color(1, 1, 1)
        And m.ambient = 0.1
        And m.diffuse = 0.9
        And m.specular = 0.9
        And m.shininess = 200
    Scenario: A sphere has a default material
        Given s ← sphere()
        When m ← s.material
        Then m = material()
    Scenario: A sphere may be assigned a material
        Given s ← sphere()
        And m ← material()
        And m.ambient ← 1
        When s.material ← m
        Then s.material = m

    Scenario: Lighting with the eye between the light and the surface
        Given eyev ← vector(0, 0, -1)
        And normalv ← vector(0, 0, -1)
        And light ← point_light(point(0, 0, -10), color(1, 1, 1))
        When result ← lighting(m, light, position, eyev, normalv)
        Then result = color(1.9, 1.9, 1.9)

    Scenario: Lighting with the eye between light and surface, eye offset 45°
        Given eyev ← vector(0, √2/2, -√2/2)
        And normalv ← vector(0, 0, -1)
        And light ← point_light(point(0, 0, -10), color(1, 1, 1))
        When result ← lighting(m, light, position, eyev, normalv)
        Then result = color(1.0, 1.0, 1.0)

    Scenario: Lighting with eye opposite surface, light offset 45°
        Given eyev ← vector(0, 0, -1)
        And normalv ← vector(0, 0, -1)
        And light ← point_light(point(0, 10, -10), color(1, 1, 1))
        When result ← lighting(m, light, position, eyev, normalv)
        Then result = color(0.7364, 0.7364, 0.7364)

    Scenario: Lighting with eye in the path of the reflection vector
        Given eyev ← vector(0, -√2/2, -√2/2)
        And normalv ← vector(0, 0, -1)
        And light ← point_light(point(0, 10, -10), color(1, 1, 1))
        When result ← lighting(m, light, position, eyev, normalv)
        Then result = color(1.6364, 1.6364, 1.6364)

    Scenario: Lighting with the light behind the surface
        Given eyev ← vector(0, 0, -1)
        And normalv ← vector(0, 0, -1)
        And light ← point_light(point(0, 0, 10), color(1, 1, 1))
        When result ← lighting(m, light, position, eyev, normalv)
        Then result = color(0.1, 0.1, 0.1)
