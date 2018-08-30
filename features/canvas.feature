Feature: We would like to create a canvas to view our objects on
  Did these functions create the objects correctly

  Scenario: Creating a canvas
    Given c ← canvas(10, 20)
    Then c.width = 10
    And c.height = 20
    And every pixel of c is color(0, 0, 0)

  Scenario: Writing pixels to a canvas
    Given c ← canvas(10, 20)
    And red ← color(1, 0, 0)
    When write_pixel(c, 2, 3, red)
    Then pixel_at(c, 2, 3) = red

  Scenario: Constructing the PPM header
    Given c ← canvas(5, 3)
    When ppm ← canvas_to_ppm(c)
    Then lines 1-3 of ppm are """
    