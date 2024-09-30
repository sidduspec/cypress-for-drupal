Feature: Add, Edit and Delete of content

    Background: Login
        Given the user login to drupal admin dashboard with username 'username' and password 'password'

    @smoke
    Scenario: Create a test Article
        When the user navigates to the content creation page '/node/add'
        And the user selects 'Article' from the admin list
        And the user enter the title 'Test Article' in the field 'drupal_content_title'
        And the user enter the body 'This is a test article' in the CKeditor field 'drupal_CKeditor_textarea'
        And the user click on the 'drupal_content_save_button' button
        Then the article should be created successfully
        And the user should see the message 'Article Test Article has been created.'
        And the user log out of the application as the content is created successfully

    @smoke
    Scenario: Publish the draft test Article
        When the user navigates to the content listing page '/admin/content'
        And the user filter for unpublished content 'Test Article' and clicks on 'drupal_content_list_page_edit_content_button' to edit
        And the user select 'Published' from 'drupal_content_save_as_dropdown' to publish the article
        And the user click on the 'drupal_content_save_button' button
        Then the user should see the message 'Article Test Article has been updated.'
        And the article 'Test Article' should be published
        When the user filter for Article 'Test Article' and clicks on 'drupal_content_list_page_edit_content_button' to navigate to edit page
        Then the user delete the Article

    @smoke
    Scenario: Creating a Basic Page
        When the user navigates to the content creation page '/node/add'
        And the user selects 'Basic page' from the admin list
        And the user enter the title 'Test Page' in the field 'drupal_content_title'
        And the user enter the body 'This is a test page.' in the CKeditor field 'drupal_CKeditor_textarea'
        And the user select 'Published' from 'drupal_content_save_as_dropdown' to publish the article
        And the user click on the 'drupal_basic_page_save_button' button
        Then the user should see the message 'Basic page Test Page has been created.'

