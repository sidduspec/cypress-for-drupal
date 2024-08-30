Feature: Contact Form Submission workflow

    Background: User Navigation
        Given the user visit the '/contact-us' form of discover semi
    
    @smoke
    Scenario: Contact Form Submission
        When the user fills in the contact form
            | Field                              | Value        | FieldType |
            | discover_contact_form_firstname    | Siddu        | input     |
            | discover_contact_form_lastname     | HS           | input     |
            | discover_contact_form_email        | siddu@hs.com | input     |
            | discover_contact_form_country_code | India        | select    |
            | discover_contact_form_organization | SpecBee      | input     |
            | discover_contact_form_reason       | Advocacy     | select    |
            | discover_contact_form_message      | test message | input     |
            | discover_contact_form_submit       | Submit       | button    |
        Then the user should see the message "Thank you for connecting with us!"
