Feature: Lights feature
    Did these functions create a light source and cast it into the scene
    
    Scenario: A point light has a position and intensity
        Given intensity ← color(1, 1, 1)
        And position ← point(0, 0, 0)
        When light ← point_light(position, intensity)
        Then light.position = position
        And light.intensity = intensity