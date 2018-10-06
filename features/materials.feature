Feature: Materials feature
    Functions that represent different types of materials

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
