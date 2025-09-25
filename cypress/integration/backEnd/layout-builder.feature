# Feature: Landing page layout builder

#     Background: Admin login
#         Given I login to admin dashboard with username 'username' and password 'password'
#         When I navigate to '/admin/content'

    # @smoke @regression @sanity
    # Scenario: Adding landing page content
    #     When I create a "Landing Page" with the following details:
    #         | Field                   | Value                            | FieldType |
    #         | content_title           | PI - Landing page layout builder | input     |
    #         | basic_action_submit     | Save                             | button    |

    # @smoke @regression @sanity
    # Scenario: Adding section to the landing page content using layout builder
    #     When I add the section "One column" from edit layout for "PI - Landing page layout builder"
    #         | Field                   | Value                                                             | FieldType |
    #         | add_section_admin_label | Test section                                                       | input     |
    #         | add_section_id          | testid                                                            | input     |
    #         | add_section_style       | Container - Consistent spacing on left and right of the component | checkbox  |
    #         | basic_action_submit     | Add section                                                       | button    |
    #     When I click on 'basic_action_save' button

    # @smoke @regression @sanity
    # Scenario: Adding "<blockType>" component block to the landing page content using layout builder
    #     When I edit the content 'PI - Landing page layout builder' and navigate to layout page
    #     Then I add the block "<blockType>" to the section index 0 with the details:
    #         | Field                     | Value           | FieldType |
    #         | block_title               | <blockTitle>    | input     |
    #         | block_display_title_check | Display title   | checkbox  |
    #         | add_section_style         | Block Container | checkbox  |
    #         | basic_action_submit       | Add block       | button    |
    #     When I click on 'basic_action_save' button
    #     When I click on 'View' to view the page
    #     Then I should see the section with title "<blockTitle>"
    #     And I should see the block "<viewBlock>"
    #     Examples:
    #         | blockType                | blockTitle                       | viewBlock               |
    #         | CourseType - Course      | CourseType - Course testing      | block_course_type       |
    #         | Credit Type- Course      | CourseType - Credit testing      | block_credit_type       |
    #         | Document Type - Resource | Document Type - Resource testing | block_doc_type          |
    #         | Specialty - Course       | Specialty - Course testing       | block_specialty_course  |
    #         | Target Audience - Course | Target Audience - Course testing | block_target_aud_course |
    #         | Topic - Resource         | Topic - Resource testing         | block_topic_resource    |

    # @smoke @regression @sanity
    # Scenario: Adding "Benefits & Perks" component block to the landing page content using layout builder
    #     When I edit the content 'PI - Landing page layout builder' and navigate to layout page
    #     Then I add the block "Benefits & Perks" to the section index 0 with the details:
    #         | Field                      | Value                                             | FieldType |
    #         | block_title                | Testing Benefits & Perks                          | input     |
    #         | block_display_title_check  | Display title                                     | checkbox  |
    #         | block_benefits_title       | testing                                           | input     |
    #         | block_benefits_item1_title | Item 1 title                                      | input     |
    #         | block_benefits_description | /htmlTestData/news.html                           | ckSection |
    #         | block_benefits_item1_icon  | \mediaTestData\benefits.png                       | file      |
    #         | add_section_style          | Block Container                                   | checkbox  |
    #         | add_section_style         | Block Bottom Gap - Spacing on bottom of the block | checkbox  |
    #         | basic_action_submit        | Add block                                         | button    |
    #     When I click on 'basic_action_save' button
    #     When I click on 'View' to view the page
    #     Then I should see the section with title "Testing Benefits & Perks"
    #     And I should see the block "block_benefits_block_view"

    # @smoke @regression @sanity
    Scenario: Adding "Block reference" component block to the landing page content using layout builder
        When I edit the content 'PI - Landing page layout builder' and navigate to layout page
        Then I add the block "Block reference" to the section index 0 with the details:
            | Field                          | Value                                             | FieldType |
            | block_title                    | Testing Block reference                           | input     |
            | block_display_title_check      | Display title                                     | uncheck   |
            | block_block_reference_dropdown | Homepage Feature Blocks                           | select    |
            |                                | 3000                                              | wait      |
            | add_section_style              | Block Container                                   | checkbox  |
            | add_section_style              | Block Bottom Gap - Spacing on bottom of the block | checkbox  |
            | basic_action_submit            | Add block                                         | button    |
        When I click on 'basic_action_save' button
        When I click on 'View' to view the page
        Then I should see the section with title "Testing Block reference"
        And I should see the block "block_block_referenc_view"





#     @smoke @regression @sanity
#     Scenario: Adding "Block reference" component block to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Block reference" to the section index 0 with the details:
#             | Field                              | Value                       | FieldType |
#             | component_reference_block_dropdown | Exposed form: news-newsroom | select    |
#             |                                    | 3000                        | wait      |
#             | basic_action_submit                | Add block                   | button    |
#             |                                    | 2000                        | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the section with title "Categories"
#         And I should see the block "component_block_reference_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Card" component block to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Card" to the section index 0 with the details:
#             | Field                    | Value                       | FieldType |
#             | component_card_title     | Test card                   | input     |
#             | layout_add_media_button  |                             | button    |
#             | file_input               | media/uhg-press-release.jpg | file      |
#             | component_card_link_url  | <no-link>                   | input     |
#             | component_card_link_text | <no-link>                   | input     |
#             | CKeditor_textarea        | /htmlTestData/news.html     | ckeditor  |
#             | basic_action_submit      | Add block                   | button    |
#             |                          | 2000                        | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the section with title "Test Card"
#         And I should see the block "component_card_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Content reference" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Content reference" to the section index 0 with the details:
#             | Field                             | Value     | FieldType     |
#             | component_content_reference_input | Homepage  | typeAndSelect |
#             | component_display_mode            | Default   | select        |
#             | basic_action_submit               | Add block | button        |
#             |                                   | 2000      | wait          |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the section with title "Homepage"
#         And I should see the block "component_block_content_reference_section"

#     @smoke @regression @sanity
#     Scenario: Adding "CTA Button" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "CTA Button" to the section index 0 with the details:
#             | Field                          | Value             | FieldType     |
#             | component_cta_button_url       | Contact Us        | typeAndSelect |
#             |                                | 2000              | wait          |
#             | component_cta_button_link_text | Contact Us - test | input         |
#             | basic_action_submit            | Add block         | button        |
#             |                                | 2000              | wait          |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the button text "Contact Us - test"
#         And I should see the block "component_block_cta_button_section"

#     @smoke @regression @sanity
#     Scenario: Adding "People" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "People" to the section index 0 with the details:
#             | Field                        | Value                    | FieldType |
#             | component_people_title       | Testing people component | input     |
#             | component_person_name        | Test Name                | input     |
#             | component_person_designation | Test Designation         | input     |
#             | basic_action_submit          | Add block                | button    |
#             |                              | 2000                     | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the section with title "Testing people component"
#         And I should see the block "component_block_people_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Text" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Text" to the section index 0 with the details:
#             | Field                        | Value                   | FieldType |
#             | component_text_title         | Testing text component  | input     |
#             | component_text_section_title | Test Name               | input     |
#             | CKeditor_textarea            | /htmlTestData/news.html | ckeditor  |
#             | basic_action_submit          | Add block               | button    |
#             |                              | 2000                    | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the section with title "Testing text component"
#         And I should see the block "component_block_text_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Webform" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Webform" to the section index 0 with the details:
#             | Field                           | Value     | FieldType |
#             | component_webform_from_dropdown | Contact   | select    |
#             | basic_action_submit             | Add block | button    |
#             |                                 | 2000      | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the block "component_block_webform_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Accordion" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page' and navigate to layout page
#         Then I add the block "Accordion" to the section index 0 with the details:
#             | Field                          | Value                   | FieldType |
#             | component_accordion_item_title | Testing Accordion       | input     |
#             | CKeditor_textarea              | /htmlTestData/news.html | ckeditor  |
#             | basic_action_submit            | Add block               | button    |
#             |                                | 2000                    | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the block "component_block_accordion_section"

#     @smoke @regression @sanity
#     Scenario: Adding "Media" component to the landing page content using layout builder
#         When I edit the content 'United Home - Landing page layout builder' and navigate to layout page
#         Then I add the block "Media" to the section index 0 with the details:
#             | Field                  | Value                       | FieldType |
#             | basic_add_media_button |                             | button    |
#             | file_input             | media/uhg-press-release.jpg | file      |
#             | media_alternate_text   | test media                  | input     |
#             | media_save_selected    | Save                        | button    |
#             | media_insert_selected  | Insert selected             | button    |
#             | basic_action_submit    | Add block                   | button    |
#             |                        | 2000                        | wait      |
#         When I click on 'basic_action_save' button
#         And I click on 'View' to view the page
#         Then I should see the block "component_block_media_section"

#     @smoke @regression @sanity
#     Scenario: Deleting the landing page content
#         When I delete the landing page "United Home - Landing page layout builder"
#         Then I should not see the "United Home - Landing page layout builder" anymore
#         And I should see the message "The Landing Page United Home - Landing page layout builder has been deleted."
#         And I logout of the application