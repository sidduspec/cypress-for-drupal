Feature: Unified visual regression - run individually

  Background:
    Given I load pages based on the configured pages fixture

  @uat_baseline
  Scenario: Capture UAT baseline for damsafety1
    Given I prepare appConfig for 'damsafety' to capture baseline for uat
    And I visually compare all pages in the fixture

  @dev_baseline
  Scenario: Capture DEV baseline for damsafety
    Given I prepare appConfig for 'damsafety' to capture baseline for dev
    And I visually compare all pages in the fixture

  @figma_seed
  Scenario: Figma → UAT run for damsafety
    Given I prepare appConfig for 'damsafety' to run visual check with uat
    And I visually compare all pages in the fixture

  @figma_seed
  Scenario: Figma → DEV run for damsafety
    Given I prepare appConfig for 'damsafety' to run visual check with dev
    And I visually compare all pages in the fixture

  @pair_run
  Scenario: Live → UAT regression for damsafety
    Then I run the visual regression for 'damsafety' comparing 'live_vs_uat'
    And I visually compare all pages in the fixture

  @pair_run
  Scenario: UAT → DEV regression for damsafety1
    Then I run the visual regression for 'damsafety1' comparing 'uat_vs_dev'
    And I visually compare all pages in the fixture

  @pair_run_live_dev
  Scenario: Live → DEV regression for damsafety
    Then I run the visual regression for 'damsafety' comparing 'live_vs_dev'
    And I visually compare all pages in the fixture
