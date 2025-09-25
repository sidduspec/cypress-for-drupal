Feature: Damsafety Content Type CRUD operations

    Background: Admin login
        Given I login to admin dashboard with username 'username' and password 'password'

    @smoke @regression @sanity
    Scenario: Basic Page create operation
        When I navigate to '/admin/content'
        And I create a "Basic Page" with the following details:
            | Field                                                    | Value                       | FieldType     |
            | content_title                                            |                             | isMandatory   |
            | content_title                                            | Damsafety - Basic test page | input         |
            | CKeditor_textarea                                        | /htmlTestData/news.html     | ckeditor      |
            | content_basicpage_add_media_button                       | Add media                   | button        |
            | content_basicpage_upload_media                           | \mediaTestData\Banner.png   | file          |
            | content_media_alt_text_field                             | Testing media               | input         |
            | content_media_Save_button                                | Save                        | button        |
            | content_media_insert_selected                            | Insert selected             | button        |
            | content_basicpage_sidebar_section                        |                             | button        |
            | content_basicpage_sidebar_header                         | Additional Resources        | select        |
            | content_basicpage_sidebar_content_reference1_textarea    | Homepage                    | typeAndSelect |
            | content_basicpage_sidebar_content_ref_link1_textarea     | Homes Built into Dams       | typeAndSelect |
            | content_basicpage_sidebar_content_ref_linktext1_textarea | Testing the link ref        | input         |
            | content_publish_dropdown                                 | Published                   | select        |
            | basic_action_submit                                      | Save                        | button        |
        Then I should see a success message "Basic Page Damsafety - Basic test page has been created."
        And I should see the "Damsafety - Basic test page" in the page title
        And I capture the page url as 'basicTestPage'
        And I navigate to '/admin/content'
        Then I should see the basic page "Damsafety - Basic test page" in the content table
        When I logout of the application
    # And I navigate to 'basicTestPage'
    # And I start visual testing with name "basicTestPage"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Basic Page edit operation
        When I navigate to '/admin/content'
        And I edit the "Damsafety - Basic test page" with the details:
            | Field                      | Value                               | FieldType |
            | content_title              | Damsafety - Basic test page updated | input     |
            | CKeditor_textarea          | /htmlTestData/testData1.html        | ckeditor  |
            | content_media_remove_image |                                     | button    |
            | basic_action_submit        | Save                                | button    |
        Then I should see a success message "Basic Page Damsafety - Basic test page updated has been updated."
        And I should see the basic page "Damsafety - Basic test page updated" in the content table
        When I click on the "Damsafety - Basic test page updated" from content page to view
        And I should see the "Damsafety - Basic test page updated" in the page title
        And I capture the page url as 'basicTestPageUpdated'
        And I navigate to '/admin/content'
        Then I should see the basic page "Damsafety - Basic test page updated" in the content table
        When I logout of the application
    # And I navigate to 'basicTestPageUpdated'
    # And I start visual testing with name "basicTestPageUpdated"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Basic page delete operation
        When I navigate to '/admin/content'
        When I delete the basic page "Damsafety - Basic test page updated"
        Then I should not see the "Damsafety - Basic test page updated" anymore
        And I logout of the application

    @smoke @regression @sanity
    Scenario: Article create operation
        When I navigate to '/admin/content'
        And I create a "Article" with the following details:
            | Field                                       | Value                         | FieldType |
            | content_title                               | Dam safety - Test Article     | input     |
            | content_article_body_section                | /htmlTestData/paragraph.html  | ckSection |
            | content_article_hero_image_add_media_button | Add media                     | button    |
            |                                             | 1000                          | wait      |
            | content_article_image_upload                | \mediaTestData\testImage2.png | file      |
            | content_article_image_alt_text              | Test image                    | input     |
            | content_article_image_Save_button           | Save                          | button    |
            | media_insert_selected                       | Insert selected               | button    |
            |                                             | 2000                          | wait      |
            | content_article_category                    | About                         | select    |
            | content_publish_dropdown                    | Published                     | select    |
            | basic_action_submit                         | Save                          | button    |
        Then I should see a success message "Article Dam safety - Test Article has been created."
        And I should see the "Dam safety - Test Article" in the page title
        And I capture the page url as 'ArticleTestPage'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Article" in the content table
        When I logout of the application
    # And I navigate to 'ArticleTestPage'
    # And I start visual testing with name "ArticleTestPage"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Article Update operation
        When I navigate to '/admin/content'
        And I edit the "Dam safety - Test Article" with the details:
            | Field                                                    | Value                             | FieldType     |
            | content_title                                            | Dam safety - Test Article updated | input         |
            | content_basicpage_sidebar_section                        |                                   | button        |
            | content_basicpage_sidebar_header                         | Additional Resources              | select        |
            | content_basicpage_sidebar_content_reference1_textarea    | Homepage                          | typeAndSelect |
            | content_basicpage_sidebar_content_ref_link1_textarea     | Homes Built into Dams             | typeAndSelect |
            | content_basicpage_sidebar_content_ref_linktext1_textarea | Testing the link ref              | input         |
            | basic_action_submit                                      | Save                              | button        |
        Then I should see a success message "Article Dam safety - Test Article updated has been updated."
        And I click on the "Dam safety - Test Article updated" from content page to view
        And I should see the "Dam safety - Test Article updated" in the page title
        And I capture the page url as 'ArticleTestPageUpdated'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Article updated" in the content table
        When I logout of the application
    # And I navigate to 'ArticleTestPageUpdated'
    # And I start visual testing with name "ArticleTestPageUpdated"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Article content delete operation
        When I navigate to '/admin/content'
        When I delete the basic page "Dam safety - Test Article updated"
        Then I should see a success message "Article Dam safety - Test Article updated has been deleted."
        Then I should not see the "Dam safety - Test Article updated" anymore
        And I logout of the application

    @smoke @regression @sanity
    Scenario: Reference create operation
        When I navigate to '/admin/content'
        And I create a "Reference" with the following details:
            | Field                                  | Value                                    | FieldType     |
            | content_title                          | Dam safety - Test Reference              | input         |
            | content_reference_resourcce_type       | Reports                                  | typeAndSelect |
            | content_reference_title                | Test Reference Title 1                   | input         |
            | content_reference_author               | Test Author                              | input         |
            | content_reference_organization         | Test Org                                 | input         |
            | content_reference_year                 | 2025                                     | select        |
            | content_reference_data                 | 10/10/2025                               | date          |
            | content_reference_asdso_session_title  | ASDSO session Title 1                    | input         |
            | content_reference_ISBN_ISSN            | 6649875                                  | input         |
            | content_reference_abstract             | /htmlTestData/paragraph.html             | ckSection     |
            | content_reference_url                  | Go To Alaska Dam Safety Program Homepage | typeAndSelect |
            | content_reference_linkText             | Go To Alaska Dam Safety Program Homepage | input         |
            | content_reference_full_paper_pdf_media | Add media                                | button        |
            | content_reference_full_paper_doc       |                                          | button        |
            | media_insert_selected                  | Insert selected                          | button        |
            |                                        | 1000                                     | wait          |
            | basic_action_submit                    | Save                                     | button        |
        Then I should see a success message "Reference Dam safety - Test Reference has been created."
        And I should see the "Dam safety - Test Reference" in the page title
        And I capture the page url as 'ReferenceTestPage'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Reference" in the content table
        When I logout of the application
    # And I navigate to 'ReferenceTestPage'
    # And I start visual testing with name "ReferenceTestPage"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Reference Update operation
        When I navigate to '/admin/content'
        And I edit the "Dam safety - Test Reference" with the details:
            | Field                                 | Value                               | FieldType     |
            | content_title                         | Dam safety - Test Reference updated | input         |
            | content_reference_resourcce_type      | Reports                             | typeAndSelect |
            | content_reference_title               | Test Reference Title 1              | input         |
            | content_reference_author              | Test Author                         | input         |
            | content_reference_organization        | Test Org                            | input         |
            | content_reference_year                | 2024                                | select        |
            | content_reference_data                | 10/10/2024                          | date          |
            | content_reference_asdso_session_title | ASDSO session Title 1               | input         |
            | content_reference_ISBN_ISSN           | 6649875                             | input         |
            | content_reference_abstract            | /htmlTestData/testData1.html        | ckSection     |
            | content_reference_url                 | Homepage                            | typeAndSelect |
            | content_reference_linkText            | Testing Article 1                   | input         |
            | basic_action_submit                   | Save                                | button        |
        Then I should see a success message "Reference Dam safety - Test Reference updated has been updated."
        And I click on the "Dam safety - Test Reference updated" from content page to view
        And I should see the "Dam safety - Test Reference updated" in the page title
        And I capture the page url as 'ReferenceTestPageUpdated'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Reference updated" in the content table
        When I logout of the application
    # And I navigate to 'ReferenceTestPageUpdated'
    # And I start visual testing with name "ReferenceTestPageUpdated"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Reference content delete operation
        When I navigate to '/admin/content'
        When I delete the basic page "Dam safety - Test Reference updated"
        Then I should see a success message "The Reference Dam safety - Test Reference updated has been deleted."
        Then I should not see the "Dam safety - Test Reference updated" anymore
        And I logout of the application


    @smoke @regression @sanity
    Scenario: Event create operation
        When I navigate to '/admin/content'
        And I create a "Event" with the following details:
            | Field                           | Value                           | FieldType |
            | content_title                   | Dam safety - Test Event         | input     |
            | content_event_description       | /htmlTestData/eventContent.html | ckSection |
            | content_enent_catregory         | Partner                         | select    |
            | content_enent_location          | Colorado Springs, CO            | input     |
            | content_event_start_date        | 10/1/2025                       | date      |
            | content_event_end_date          | 12/1/2025                       | date      |
            | content_event_hero_image_button | Add media                       | button    |
            | content_event_image             |                                 | button    |
            | media_insert_selected           | Insert selected                 | button    |
            |                                 | 1000                            | wait      |
            | content_publish_dropdown        | Published                       | select    |
            | basic_action_submit             | Save                            | button    |
        Then I should see a success message "Event Dam safety - Test Event has been created."
        And I should see the "Dam safety - Test Event" in the page title
        And I capture the page url as 'EventTestPage'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Event" in the content table
        When I logout of the application
    # And I navigate to 'EventTestPage'
    # And I start visual testing with name "EventTestPage"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Event Update operation
        When I navigate to '/admin/content'
        And I edit the "Dam safety - Test Event" with the details:
            | Field                                                    | Value                              | FieldType     |
            | content_title                                            | Dam safety - Test Event updated    | input         |
            | content_basicpage_sidebar_header                         | Additional Resources               | select        |
            | content_basicpage_sidebar_content_reference1_textarea    | ASDSO Webinar Instructors Homepage | typeAndSelect |
            | basic_action_submit                                      | Save                               | button        |
        Then I should see a success message "Event Dam safety - Test Event updated has been updated."
        And I click on the "Dam safety - Test Event updated" from content page to view
        And I should see the "Dam safety - Test Event updated" in the page title
        And I capture the page url as 'EventTestPageUpdated'
        And I navigate to '/admin/content'
        Then I should see the basic page "Dam safety - Test Event updated" in the content table
        When I logout of the application
    # And I navigate to 'EventTestPageUpdated'
    # And I start visual testing with name "EventTestPageUpdated"
    # And I check the page for visual correctness
    # Then I end visual testing

    @smoke @regression @sanity
    Scenario: Event content delete operation
        When I navigate to '/admin/content'
        When I delete the basic page "Dam safety - Test Event updated"
        Then I should see a success message "The Event Dam safety - Test Event updated has been deleted."
        Then I should not see the "Dam safety - Test Event updated" anymore
        And I logout of the application


