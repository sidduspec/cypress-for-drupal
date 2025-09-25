Feature: Responsive Design Validation

  Scenario Outline: Validate layout on different viewports
    Given I set viewport to <width> and <height>
    And I visit the homepage
    Then the responsive element ".site-header" should be visible
    And the responsive element ".footer" should be visible

    Examples:
      | width | height |
      | 1920  | 1080   |
      | 1366  | 768    |
      | 768   | 1024   |
      | 375   | 667    |

  Scenario: Validate mobile menu visibility on small screen
    Given I set viewport to 375 and 667
    And I visit the homepage
    When I click the element ".mobile-menu-toggle"
    Then the element ".mobile-menu" should be visible

  Scenario: Validate menu visibility on large screens
    Given I set viewport to 1920 and 1080
    And I visit the homepage
    Then the element ".mobile-menu-toggle" should not be visible
    And the element ".main-menu" should be visible

  Scenario: Check image responsiveness
    Given I set viewport to 768 and 1024
    And I visit the homepage
    Then the element "img.hero-image" should have natural width greater than 500

  Scenario: Ensure columns stack vertically on mobile
    Given I set viewport to 375 and 667
    And I visit the "/contact" page
    Then the element ".contact-form" should be visible
    And the element ".sidebar" should be below ".contact-form"

  Scenario: Validate font size adapts on mobile
    Given I set viewport to 375 and 667
    And I visit the homepage
    Then the element "h1" should have CSS "font-size" less than "32px"
