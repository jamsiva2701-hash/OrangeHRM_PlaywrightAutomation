@employee-lifecycle
Feature: OrangeHRM Employee Lifecycle Management

  Scenario: Verify complete employee lifecycle using UI and API
    Given User launches OrangeHRM application
    When User logs in with valid credentials from test data
    Then User should verify dashboard is displayed
    
    When User adds a new employee from test data with profile picture
    Then User should verify employee is added successfully
    
    When User searches the employee by employee id from test data
    And User updates job title and employment status from test data
    Then User should verify employee details are updated successfully
    
    When User validates the employee details using API
    Then User should verify API details match with UI data
    
    When User deletes the employee from UI
    Then User should verify employee is deleted in UI and API
    
    When User logs out from OrangeHRM
    Then User should verify login page is displayed
