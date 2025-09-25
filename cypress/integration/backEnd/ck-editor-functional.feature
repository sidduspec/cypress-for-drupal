Feature: CKEditor Functionality

  Background:
    Given I login to admin dashboard with username 'username' and password 'password'
    When I navigate to '/admin/content'

  @smoke @regression @sanity @Ckeditor
  Scenario: Create a basic page to test CKEditor functionalities
    And I create a "Basic Page" with the following details:
      | Field                 | Value             | FieldType |
      | content_title         | Testing Ck editor | input     |
      | basic_action_submit   | Save              | button    |

  @smoke @regression @sanity @Ckeditor
  Scenario: Validate Bold text content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "bold" and type in "Testing bold content"
    Then I save basic page "Testing Ck editor" and validate the content "Testing bold content" format is 'bold'

  @smoke @regression @sanity @Ckeditor
  Scenario: Validate Italic text content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "italic" and type in "Testing italic content"
    Then I save basic page "Testing Ck editor" and validate the content "Testing italic content" format is 'italic'

  @smoke @regression @sanity
  Scenario: Validate Link content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "link" and type in "google.com"
    Then I save basic page "Testing Ck editor" and validate the content "google.com" format is 'link'

  @smoke @regression @sanity
  Scenario: Validate Bulleted list content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "bulleted" and type in "/htmlTestData/bulletedList.html" from fixture
    Then I save basic page "Testing Ck editor" and validate the content "/htmlTestData/bulletedList.html" format is 'bulleted'

  @smoke @regression @sanity
  Scenario: Validate Numbered list content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "numbered" and type in "/htmlTestData/numberedList.html" from fixture
    Then I save basic page "Testing Ck editor" and validate the content "/htmlTestData/numberedList.html" format is 'numbered'

  @smoke @regression @sanity
  Scenario: Validate Upload Image content in CKEditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I apply formatting "image" and type in "https://damsafety-d10-dev.s3.eu-north-1.amazonaws.com/s3fs-public/1280px-Barrage_de_Roselend_2_0.jpg"
    Then I save basic page "Testing Ck editor" and validate the content "https://damsafety-d10-dev.s3.eu-north-1.amazonaws.com/s3fs-public/1280px-Barrage_de_Roselend_2_0.jpg" format is 'image'

  @smoke @regression @sanity
  Scenario Outline: Validate the headings "<heading>" and paragraph in Ckeditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I select "<heading>" and insert text "<headingText>"
    Then I save basic page "Testing Ck editor" and I should see the contents "<headingText>" in the frontend with their respective "<tag>"
    Examples:
      | heading   | tag | headingText         |
      | Heading 2 | h2  | This is a heading 2 |
      | Heading 3 | h3  | This is a heading 3 |
      | Heading 4 | h4  | This is a heading 4 |
      | Heading 5 | h5  | This is a heading 5 |
      | Heading 6 | h6  | This is a heading 6 |
      | Paragraph | p   | This is a paragraph |

  @smoke @regression @sanity
  Scenario: Validate the Horizontal line in Ckeditor
    When I edit the CKEditor in content "Testing Ck editor"
    And I enter some data "This is dummy data" and after that select "Horizontal line"
    Then I should see the Horizontal line after the content "This is dummy data" in the frontend for the content "Testing Ck editor"

  @smoke @regression @sanity
  Scenario: Delete the basic page created
    When I delete the basic page "Testing Ck editor"

