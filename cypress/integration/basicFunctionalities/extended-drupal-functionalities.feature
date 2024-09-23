Feature: Extended Functional Testing of Drupal Application

    Background: Login to Druapl admin dashboard
        Given the user login to drupal admin dashboard with username 'admin_user' and password 'admin_password'

    @smoke
    Scenario: Adding a user
        When the user navigate to '/admin/people' to add user
        And the user clicks on 'durpal_add_user_button' button to navigate to create user page
        And the user enters mandtotory field values to create a user
            | Field                                  | Value              | FieldType |
            | drupal_add_user_email_field            | test@specbee3.com  | input     |
            | drupal_add_user_username_field         | testspe3           | input     |
            | drupal_add_user_password_field         | test@123           | input     |
            | drupal_add_user_confirm_password_field | test@123           | input     |
            | drupal_add_user_status_button          | Blocked            | button    |
            | drupal_add_user_roles_checkbox         | Author             | button    |
            | drupal_add_user_submit_button          | Create new account | button    |
        Then the user should see the message 'Created a new user account'
        When the user navigate to '/admin/people' to add user
        Then the test user 'testspe3' is deleted from the system

    @smoke
    Scenario: Creating a Taxonomy Term
        When the user navigates to '/admin/structure'
        And the user selects 'Taxonomy' from the admin list
        And the user selects 'Tags' and click on 'drupal_taxonomy_list_items_button'
        And the user click on the 'Add term' button
        And the user enter the title 'Test Tag' in the field 'drupal_taxonomy_term_name_field'
        And the user click on the 'Save' button
        Then the user should see the message 'Created new term'
        And the user deletes the taxonomy term 'Test Tag'

    @smoke
    Scenario: Creating and Managing a Menu
        When the user navigates to '/admin/structure'
        And the user selects 'Menus' from the admin list
        And the user click on the 'Add menu' button
        And the user enters random title 'Test Menu' in the field 'drupal_menu_name_field'
        And the user click on the 'Save' button
        Then the user should see the message stating the successful Menu creation
        When the user clicks 'Add link'
        And the user adds a link 'Home' with the path '<front>' to the 'druapl_menu_link_field'
        And the user click on the 'Save' button
        Then the link 'Home' should be added to the menu
        And the user deletes the menu 'Test Menu'

    @smoke
    Scenario: Configuring a Block
        When the user navigates to '/admin/structure/block'
        And the user selects the 'Pre-header' region from 'drupal_block_title_list' and clicks on 'Place block'
        And the user selects the 'Search form' block  from 'drupal_block_content_list' and clicks on 'Place block'
        And the user clicks the 'Save block' button at 'drupal_save_block_button'
        Then the user should see the message 'The block configuration has been saved.'
        When the user clicks the 'Save blocks' button at 'drupal_save_blocks_button'
        Then the user should see the message 'The block settings have been updated.'
        When the user deletes the block 'Search form' from the 'Pre-header' region
        Then the user should see the message 'The block Search form has been removed from the Pre-header region.'

    @smoke
    Scenario: Configuring Site Maintenance Mode
        When the user navigates to '/admin/config'
        And the user selects 'Maintenance mode' from config page 'drupal_config_page'
        And the user enables maintenance mode by clicking on 'drupal_config_maintenance_mode_checkbox' checkbox
        And the user click on the 'Save configuration' button
        Then the site should be in maintenance mode
        And the user should see the message 'The configuration options have been saved.'
        When the user disable maintenance mode by clicking on 'drupal_config_maintenance_mode_checkbox' checkbox
        And the user click on the 'Save configuration' button
        Then the user should see the message 'The configuration options have been saved.'


