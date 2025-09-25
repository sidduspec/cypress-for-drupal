Feature: Fonts, CSS and Layout Verification

  Scenario: Check body font and layout
    Given I visit the homepage
    Then the element "body" should have CSS "font-family" containing "Open Sans"
    And the element "#main" should have CSS "margin" containing "auto"

  Scenario: Validate header and footer styling
    Given I visit the homepage
    Then the element "header" should have CSS "background-color" not empty
    And the element "footer" should have CSS "padding-top" not empty

  Scenario: Ensure main content is centered and constrained
    Given I visit the homepage
    Then the element ".main-content" should have CSS "max-width" containing "1200"
    And the element ".main-content" should have CSS "margin-left" containing "auto"
    And the element ".main-content" should have CSS "margin-right" containing "auto"

  Scenario: Validate consistent heading font family
    Given I visit the homepage
    Then the element "h1" should have CSS "font-family" containing "Open Sans"
    And the element "h2" should have CSS "font-family" containing "Open Sans"

  Scenario: Validate button styling
    Given I visit the homepage
    Then the element "button" should have CSS "border-radius" containing "4"
    And the element "button" should have CSS "font-weight" containing "bold"

  Scenario: Ensure no font fallback warnings in console
    Given I visit the homepage
    Then the page should not contain any JavaScript error
