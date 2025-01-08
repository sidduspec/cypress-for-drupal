Feature: UHG Content and content type flows

    Background: Admin login
        Given I login to admin dashboard with username 'username' and password 'password'

    # @smoke @regression @sanity
    # Scenario: Basic Page create operation
    #     When I navigate to '/admin/content'
    #     And I create a "Basic page" with the following details:
    #         | Field                        | Value                   | FieldType |
    #         | content_title                | PI - Basic test page    | input     |
    #         | content_intro_summary_button |                         | button    |
    #         | CKeditor_textarea            | /htmlTestData/news.html | ckeditor  |
    #         | basic_action_submit          | Save                    | button    |
    #     And I navigate to '/admin/content'
    #     Then I should see the basic page "PI - Basic test page" in the content table

    # @smoke @regression @sanity
    # Scenario: Basic page edit operation
    #     When I navigate to '/admin/content'
    #     And I edit the "PI - Basic test page" with the details:
    #         | Field                        | Value                        | FieldType |
    #         | content_title                | PI - Basic test page updated | input     |
    #         | content_intro_summary_button |                              | button    |
    #         | CKeditor_textarea            | /htmlTestData/news.html      | ckeditor  |
    #         | basic_action_submit          | Save                         | button    |
    #     And I navigate to '/admin/content'
    #     Then I should see the basic page "PI - Basic test page updated" in the content table

    # @smoke @regression @sanity
    # Scenario: Basic page delete operation
    #     When I navigate to '/admin/content'
    #     When I delete the basic page "PI - Basic test page updated"
    #     Then I should not see the "PI - Basic test page updated" anymore
    #     And I logout of the application

    @smoke @regression @sanity
    Scenario: PI - Article create operation
        When I navigate to '/admin/content'
        And I create a "Article" with the following details:
            | Field                 | Value                          | FieldType |
            | content_title         | PI - Test Article              | input     |
            | content_article_issue | Fall 2022                      | input     |
            | CKeditor_textarea     | /htmlTestData/testArticle.html | ckeditor  |
            | basic_action_submit   | Save                           | button    |
        Then I validate the article "PI - Test Article" exists
        When I navigate to '/admin/content'
        Then I should see the basic page "PI - Test Article" in the content table

    @smoke @regression @sanity
    Scenario: PI - Article edit operation
        When I navigate to '/admin/content'
        And I edit the "PI - Test Article" with the details:
            | Field                 | Value                             | FieldType |
            | content_title         | PI - Test Article Updated         | input     |
            | content_article_issue | Fall 2021                         | input     |
            | CKeditor_textarea     | /htmlTestData/updatedArticle.html | ckeditor  |
            | basic_action_submit   | Save                              | button    |
        Then I validate the article "PI - Test Article Updated" exists
        When I navigate to '/admin/content'
        Then I should see the basic page "PI - Basic test page updated" in the content table

    @smoke @regression @sanity
    Scenario: PI - Article delete operation
        When I navigate to '/admin/content'
        When I delete the basic page "PI - Test Article Updated"
        Then I should not see the "PI - Test Article Updated" anymore
        And I logout of the application

# @smoke @regression @sanity
# Scenario: Adding landing page content
#     When I navigate to '/admin/content'
#     And I create a "Landing Page" with the following details:
#         | Field                   | Value             | FieldType |
#         | content_title           | PI - Landing page | input     |
#         | content_layout_dropdown | Default one col   | select    |
#         | content_state           | Published         | select    |
#         | basic_action_submit     | Save              | button    |
#     Then I add the default layout to the "Landing Page Title" landing page
#         | Field                             | Value                       | FieldType |
#         | content_add_new_bullboard         | Add new billboard           | button    |
#         | content_billboard_title           | Test billboard              | textarea  |
#         | content_billboard_type            | Narrow                      | dropdown  |
#         | content_billboard_add_media       | Add media                   | button    |
#         | file_input                        | media/uhg-press-release.jpg | file      |
#         | media_alternate_text              | test media                  | input     |
#         | media_save_selected               | Save                        | button    |
#         | content_billboard_insert_selected | Insert selected             | button    |
#         |                                   | 2000                        | wait      |
#         | content_billboard_create_button   | Create billboard            | button    |
#         |                                   | 2000                        | wait      |
#         | basic_action_submit               | Save                        | button    |
#         |                                   | 2000                        | wait      |
#     Then I should see the title "Test billboard" on the billboard

# @smoke @regression @sanity
# Scenario: Deleting the landing page content
#     When I navigate to '/admin/content'
#     When I delete the landing page "PI - Landing page"
#     Then I should not see the "PI - Landing page" anymore
#     And I should see the message "The Landing Page PI - Landing page has been deleted."
#     And I logout of the application

# @smoke @regression @sanity
# Scenario: Full E2E Flow for News Page
#     When I navigate to '/admin/content'
#     And I create a "News" with the following details:
#         | Field                             | Value                       | FieldType |
#         | content_title                     | State Highlights            | input     |
#         | content_news_category             | Press Releases              | select    |
#         | CKeditor_textarea                 | /htmlTestData/news.html     | ckeditor  |
#         | layout_add_media_button           |                             | button    |
#         | file_input                        | media/uhg-press-release.jpg | file      |
#         | media_alternate_text              | test media                  | input     |
#         | media_save_selected               | Save                        | button    |
#         | content_billboard_insert_selected | Insert selected             | button    |
#         |                                   | 2000                        | wait      |
#         | content_state                     | Published                   | select    |
#         | basic_action_submit               | Save                        | button    |
#     Then I should see the "State Highlights" on the News Page

# @smoke @regression @sanity
# Scenario: Editing the News page content "State Highlights"
#     When I navigate to '/admin/content'
#     When I edit the "State Highlights" with the details:
#         | Field                 | Value                     | FieldType |
#         | content_title         | State Highlights of 2024  | input     |
#         | content_news_category | Press Releases            | select    |
#         | CKeditor_textarea     | /htmlTestData/sample.html | ckeditor  |
#         | basic_action_submit   | Save                      | button    |
#     Then I click on the "State Highlights of 2024" from content page to view
#     And I should see the "State Highlights of 2024" on the News Page
#     And I should see the news content at "content_news_content_field"
#     And I logout of the application

# @smoke @regression @sanity
# Scenario: Delete the news page content
#     When I navigate to '/admin/content'
#     When I delete the news page "State Highlights of 2024"
#     Then I should not see the "State Highlights of 2024" anymore
#     And I should see the message "The News State Highlights of 2024 has been deleted."
#     And I logout of the application