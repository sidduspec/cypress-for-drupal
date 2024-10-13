Feature: Google Lighthouse Audit
  As a tester
  I want to run Lighthouse audit on a list of URLs
  So that I can check their performance and accessibility

  Scenario: Run Lighthouse audit on all URLs
    Given I have a list of URLs to test
    When I run the lighthouse for the url 'https://drupal-automation.specbee.site/en'
    When I run lighthouse audit for all URLs 'lighthouse/urls.json'