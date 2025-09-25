Feature: Managing media and media type

    Background: Admin login
        Given I login to admin dashboard with username 'username' and password 'password'

    @smoke @regression @sanity
    Scenario: Validating the presense of Document, Image and Remote video media typesa are configured
        When I navigate to "/admin/structure/media"
        Then I validate the existance of the media types:
            | MediaType    |
            | Document     |
            | Image        |
            | Remote video |
            | Video        |
        And I logout of the application

@smoke @regression @sanity
Scenario: Adding and updating Image media
    When I navigate to "/admin/content/media" 
    And I click on "Add media" button
    When I add an image with the name "Test Image", file "mediaTestData/testImage1.png", and alt text "Test Alt Text"
    Then I should see the "Test Image" in the media library
    And I update the "Image" for "Test Image" with "mediaTestData/testImage2.png" and alt text "Updating the image" and assert its presense in the media table
    When I delete the "Test Image" media
    And I logout of the application

@smoke @regression @sanity
Scenario: Add a new Remote Video
    When I navigate to "/admin/content/media" 
    And I click on "Add media" button
    And I add a remote video with the name "Test Video" and URL "https://www.youtube.com/watch?v=oOvURgHcd4w&list=PLUDwpEzHYYLseflPNg0bUKfLmAbO2JnE9"
    Then I should see the remote video in the media library at the top of the table
    When I delete the video media
    And I logout of the application

@smoke @regression @sanity
Scenario: Adding and updating File media
    When I add an "Document" with the name "Test Document", file "mediaTestData/testPDF.pdf"
    Then I should see the "Test Document" in the media library
    And I update the "File" for "Test Document" with "mediaTestData/Physicians-Report-Special-Edition-2012.pdf" and alt text "Updating the audio" and assert its presense in the media table
    When I delete the "Test Document" media
    And I logout of the application

@smoke @regression @sanity
Scenario: Adding and updating Video media
    When I add an "Video" with the name "Test Video", file "mediaTestData/test_video.mp4"
    Then I should see the "Test Video" in the media library
    And I update the "Video" for "Test Video" with "mediaTestData/test_video.mp4" and alt text "Updating the video" and assert its presense in the media table
    When I delete the "Test Video" media
    And I logout of the application


#NOT APPLICABLE
# @smoke @regression @sanity
# Scenario Outline: Add, validate, and delete a '<mediaTypeName>' media type
#     When I add and validate a media type "<mediaTitle>" with description "<mediaDescription>" and source "<mediaTypeName>"
#     Then I delete the "<mediaTitle>" media Type
#     And I logout of the application
#     Examples:
#         | mediaTypeName | mediaTitle            | mediaDescription                  |
#         | File          | Document PDF for test | Used to upload documents PDF only |
#         | Image         | Image only for test   | Upload image only                 |
#         | Video         | Video only for test   | Upload local video only           |
