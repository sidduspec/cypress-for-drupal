Feature: Validate UHG Admin Reports and Site Health

  Background: Admin login
    Given I login to admin dashboard with username 'username' and password 'password'

  @smoke @regression @sanity
  Scenario: Validate there are no errors in the status report
    When I navigate to "/admin/reports/status"
    Then I should see zero "Errors" in the status report

  @smoke @regression @sanity
  Scenario: Validate there are no warnings in the status report
    When I navigate to "/admin/reports/status"
    Then I should see zero "Warnings" in the status report

  @smoke @regression @sanity
  Scenario: Verify Cron Configuration in Admin Settings
    When I navigate to "/admin/config/system/cron"
    Then I should see that detailed cron logging is "disabled"
    When I verify that the last cron run was within "24 hours"

  @smoke @regression @sanity
  Scenario: Validating the broken link for UHG
    When I check for the broken links in the current environment
