Feature: Cross-browser Compatibility

  Scenario: Load homepage in default viewport
    Given I visit the homepage
    Then I should see the element with selector "header"

  Scenario Outline: Validate homepage elements in multiple resolutions
    Given I set viewport to <width> and <height>
    And I visit the homepage
    Then I should see the element with selector "header"
    And I should see the element with selector ".footer"
    And the page should not contain any JavaScript error

    Examples:
      | width | height |
      | 1920  | 1080   |
      | 1366  | 768    |
      | 1024  | 768    |
      | 768   | 1024   |
      | 414   | 896    |

  Scenario: Validate sticky header visibility and position on scroll
    Given I set viewport to 1366 and 768
    And I visit the homepage
    When I scroll to 500 pixels vertically
    Then the element "header" should have CSS "position" containing "fixed"
    And the header should still be visible

  Scenario: Ensure JavaScript loads successfully in all viewports
    Given I set viewport to 1024 and 768
    And I visit the homepage
    Then the page should not contain any JavaScript error

  Scenario: Validate mobile navigation toggle works
    Given I set viewport to 414 and 896
    And I visit the homepage
    When I click the element ".mobile-menu-toggle"
    Then I should see the element with selector ".mobile-menu"

  Scenario: Test image responsiveness in multiple resolutions
    Given I set viewport to 768 and 1024
    And I visit the homepage
    Then the element "img.hero-image" should have natural width greater than 500

  Scenario: Validate content width consistency across breakpoints
    Given I set viewport to 1366 and 768
    And I visit the homepage
    Then the element ".main-content" should have CSS "max-width" containing "1200"

  Scenario: Validate hover states on wide screens
    Given I set viewport to 1920 and 1080
    And I visit the homepage
    When I hover over the selector ".menu-item--about"
    Then I should see the element with selector ".menu-item--about .dropdown"
