Feature: Component placing via layout builder

    Background: Login to Druapl admin dashboard
        Given the user login to drupal admin dashboard with username 'username' and password 'password'

    @smoke
    Scenario: Placing Components on the Article using Layout Builder in Drupal 10
        Given the user navigates to '/node/34/layout'
        When the user selects the 'Announcements Feed' component from the available components list
        And the user click on the 'drupal_layoutbuilder_add_block_button' button to apply the component
        And the user click on the 'drupal_layoutbuilder_save_layout_button' button to save the layout
        Then the user should see the message 'The layout override has been saved.'
        And the user should see the Announcement Feed block 'drupal_homepage_announcement_feed_block' on the landing page

