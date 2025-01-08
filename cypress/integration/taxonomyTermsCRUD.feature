Feature: Managing Taxonomy Terms in UHG

    Background: Admin login
        Given I login to admin dashboard with username 'username' and password 'password'

    @smoke @regression @sanity
    Scenario Outline: Manage Taxonomy Terms for <Taxonomy>
        When I navigate to '/admin/structure/taxonomy'
        And I create a term with the name "<TermName>" and description "<Description>" for the vocabulary "<Taxonomy>"
        Then I should see the message "Created new term <TermName>."
        Then I should see the term "<TermName>" in the list of "<Taxonomy>" vocabulary
        When I edit the term "<TermName>" to "<UpdatedTermName>"
        Then I should see the updated term "<UpdatedTermName>" in the list of "<Taxonomy>" vocabulary
        When I delete the term "<UpdatedTermName>" from the "<Taxonomy>" vocabulary
        Then I should see the message "Deleted term <UpdatedTermName>."
        Then I should not see the term "<UpdatedTermName>" anymore
        And I logout of the application
        Examples:
            | Taxonomy     | TermName      | Description             | UpdatedTermName   |
            | Category     | News Category | This is a news category | Updated Category  |
            | Tags         | Event Tag     | Tag used for events     | Updated Event Tag |
            | Tags - Media | Image Tag     | Tag for image media     | Updated Image Tag |
