Feature: Contact Form Submission workflow

    Background: User Navigation
        Given the user navigates to '/contact'

    @smoke @contactform
    Scenario: Contact Form Submission
        When the user fill in the contact form
            | Field                  | Value        | FieldType |
            | contact_form_firstname | Siddu        | input     |
            | contact_form_email     | siddu@hs.com | input     |
            | contact_form_subject   | SpecBee      | input     |
            | contact_form_message   | test message | input     |
            | contact_form_submit    | Send message | button    |
        Then the user should see the message "Your message has been sent."

    @smoke @contactform
    Scenario: Validate current date and time field in the contact form
        Then the user should see a field labeled "Contact date and time"
        And the user should see the message "Leave blank to use the time of form submission."