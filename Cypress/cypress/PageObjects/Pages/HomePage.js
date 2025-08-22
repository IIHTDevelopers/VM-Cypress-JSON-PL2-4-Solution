
class HomePage {
  // Defining Elements
  elements = {
    
    // Test Case 9
    upgradeLink: () => cy.get('a.orangehrm-upgrade-link'),


    // Test case 2
    empOnLeaveSetting : () => cy.get("i.oxd-icon.bi-gear-fill.orangehrm-leave-card-icon").should('be.visible'),

    // Test Case 3 
    subTabLocators: () => cy.get("span.oxd-text.oxd-text--span.oxd-main-menu-item--name"),
    listOfElementLocator: () => cy.get('a.oxd-topbar-body-nav-tab-item'),

    // Test Case 4
    searchButtonDashboard: () => cy.get("input.oxd-input.oxd-input--active").should('be.visible'),

    // Test Case 5
    collapseButton: () => cy.get("button.oxd-icon-button.oxd-main-menu-button").should('be.visible'),

    // Test Case 6
    profileIcon: () => cy.get('p.oxd-userdropdown-name'),
    logoutOption: () => cy.contains('Logout'),
  };

  // Test Case 1: Verify Logout Functionality
  empOnLeave() {
    // Checking We are on Dashboard
    cy.contains('Dashboard').should('be.visible');

    // Clicking on Setting button of Employee on Leave 
    this.elements.empOnLeaveSetting().click();
  }



  // Test Case 3 : Checking Unique Endpoint in Subtabs
  clickSidebarTab(tab) {

    // clicking on the Tab with specific Tab name 
    this.elements.subTabLocators().contains("Recruitment").click();

    // Check for subtabs list under the Main tab
    this.elements.listOfElementLocator().contains(tab).click();

  }

  // Test Case 4 : Verify Search Functionality
  checkingSearchFunctionality() {
    // Checking We are on Homepage 
    cy.contains('Dashboard').should("be.visible");

    // Type "Dashboard" in Search box 
    this.elements.searchButtonDashboard().click().type("Dashboard");
  }


  // Test Case 5
  checkForCollapseButtonWork() {
    // Checking Cy is on Homepage
    cy.contains('Dashboard').should("be.visible");

    // click on Collapse button
    this.elements.collapseButton().click();
  }

  // Test Case 6: Verify Logout Functionality
  LogoutFuntionCheck() {
    this.elements.profileIcon()
      .should('be.visible')
      .click({ force: true });

    cy.wait(2000);
    this.elements.logoutOption()
      .should('be.visible')
      .click({ force: true });
  }







}


export default HomePage;
