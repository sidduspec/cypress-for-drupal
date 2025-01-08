Feature: Managing media and media type

    Background: Admin login
        Given I login to admin dashboard with username 'username' and password 'password'

    @smoke @regression @sanity
    Scenario Outline: Add, validate, and delete a '<mediaTypeName>' media type
        When I add and validate a media type "<mediaTitle>" with description "<mediaDescription>" and source "<mediaTypeName>"
        Then I delete the "<mediaTitle>" media Type
        And I logout of the application
        Examples:
            | mediaTypeName | mediaTitle            | mediaDescription                  |
            | File          | Document PDF for test | Used to upload documents PDF only |
            | Image         | Image only for test   | Upload image only                 |
            | Video file    | Video only for test   | Upload local video only           |

    @smoke @regression @sanity
    Scenario: Velidating the presense of Document, Image and Remote video media typesa are configured
        When I navigate to "/admin/structure/media"
        Then I validate the existance of the media types:
            | MediaType    |
            | Document     |
            | Image        |
            | Remote video |
        And I logout of the application

    @smoke @regression @sanity
    Scenario: Adding and updating Document media
        When I add a document with the name "Test Document" and file "media/testPDF.pdf"
        Then I should see the "Test Document" in the media library
        And I update the "Document" for "Test Document" with "media/Updated-document.pdf" and assert its presense in the media table
        And I logout of the application

    @smoke @regression @sanity
    Scenario: Adding and updating Image media
        When I add an image with the name "Test Image", file "media/testImage.jpg", and alt text "Test Alt Text"
        Then I should see the "Test Image" in the media library
        And I update the "Image" for "Test Image" with "media/updatedTestImage.jpg" and alt text "Updating the image" and assert its presense in the media table
        And I logout of the application

    @smoke @regression @sanity
    Scenario: Add a new Remote Video
        When I add a remote video with the name "Test Video" and URL "https://www.youtube.com/watch?v=oOvURgHcd4w&list=PLUDwpEzHYYLseflPNg0bUKfLmAbO2JnE9"
        Then I should see the remote video in the media library at the top of the table
        And I logout of the application
