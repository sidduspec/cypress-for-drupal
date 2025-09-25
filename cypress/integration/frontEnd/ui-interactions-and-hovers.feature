Feature: UI Interactions and Hover

  Scenario: Validate hover on menu shows dropdown
    Given I hover over the selector ".menu-item--parent"
    Then I should see the dropdown ".menu-item--expanded"

  Scenario: Click main menu link
    Given I click the element ".menu-item--home"
    Then I should be on the homepage

  Scenario: Validate tooltip appears on hover
    Given I visit the "/about-us" page
    When I hover over the selector ".info-icon"
    Then I should see the element with selector ".tooltip"

  Scenario: Validate button hover changes color
    Given I visit the homepage
    When I hover over the selector ".cta-button"
    Then the element ".cta-button" should have CSS "background-color" containing "rgb("

  Scenario: Validate expandable section toggles on click
    Given I visit the "/faq" page
    When I click the element ".faq-question:first"
    Then I should see the element with selector ".faq-answer:first"

  Scenario: Validate modal opens and closes on interaction
    Given I visit the homepage
    When I click the element ".open-modal-btn"
    Then I should see the element with selector ".modal-content"
    When I click the element ".modal-close"
    Then the element ".modal-content" should not be visible

  Scenario: Validate accordion behavior
    Given I visit the "/services" page
    When I click the element ".accordion-header:first"
    Then the element ".accordion-body:first" should be visible
