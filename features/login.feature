Feature: Login to Delta Vacations
  As a user of Delta Vacations Pro
  I want to log in to the system
  So that I can access the dashboard

  Scenario: Successful login with valid credentials
    Given a user navigates to the login page
    When the user enters their agency ID, username, and password
    And clicks the login button
    Then the user is redirected to the dashboard
