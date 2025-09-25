Feature: Core and Custom Functionality Validation

  @regression
  Scenario: Verify core pages and custom blocks render without errors
    Given I visit the "/user/login" page
    Then I should see "Username"
    And I should see "Password"
    And the element "login_form" should be visible
    And I should see the button "Log in"
    Then the page should not contain any PHP or DB error

  @regression
  Scenario: Validate custom block is visible on homepage
    Given I visit the homepage
    Then I should see the block with selector "random_block_selector"
    Then the page should not contain any PHP or DB error

  @regression
  Scenario: Verify anonymous user can access public nodes
    Given I visit the "/dams101" page
    Then I should see the content title "Dams 101"
    And I should see an image with selector "image_selector"
    Then the page should not contain any PHP or DB error

  @regression
  Scenario: Verify authenticated user dashboard is accessible
    Given I login to admin dashboard with username 'username' and password 'password'
    And I visit the "/user" page
    Then I should see "Member for"
    And I should see the link "edit"
    Then the page should not contain any PHP or DB error

  @regression
  Scenario: Validate menu links route correctly
    Given I visit the homepage
    When I click the element "random_element_to_click"
    Then I should see the content title "Dam safety - Test Article"
    Then the page should not contain any PHP or DB error

  @regression
  Scenario: Validate 404 page behavior
    Given I visit the "/test" page
    Then I should see "Page Not Found"
