class AdminPage {


  elements = {
    adminTab: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),


    // Test case 8
    addAdminButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Add'),
    editButton: () => cy.get('i.bi-pencil-fill').first(),
    editFormContainer: () => cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title'),
    userRoleDropdown: () => cy.get('label:contains("User Role")').parents('.oxd-input-group').find('.oxd-select-text--after'),
    userRoleOption: (role) => cy.get('.oxd-select-dropdown').contains(role),




    // Test case 9
    statusDropdown: () => cy.get('label:contains("Status")').parents('.oxd-input-group').find('.oxd-select-text-input'),
    statusOption: (status) => cy.get('.oxd-select-dropdown').contains(status),
    usernameInput: () => cy.get('label:contains("Username")').parents('.oxd-input-group').find('input'),
    passwordInput: () => cy.get('label:contains("Password")').parents('.oxd-input-group').find('input[type="password"]').first(),
    confirmPasswordInput: () => cy.get('label:contains("Confirm Password")').parents('.oxd-input-group').find('input[type="password"]'),
    saveButton: () => cy.get('button[type="submit"]').contains('Save'),

    

    // Test CAse 10
    userRoleSortIcon: () => cy.contains('div.oxd-table-header-cell', 'User Role').find('i.oxd-icon-button__icon.oxd-table-header-sort-icon'),
    deleteIcon: () => cy.get('i.oxd-icon.bi-trash').eq(1),
    confirmDeleteBtn: () => cy.get('.oxd-button--label-danger').contains('Yes, Delete'),
    usernameCell: () => cy.get('.oxd-table-body .oxd-table-row').eq(1).find('.oxd-table-cell').eq(1),
    // successToast: () => cy.get('.oxd-toast').contains('Successfully Deleted'),



  }

  // Test Case 8
  passwordMismatchError() {
    // Taking Data for Form using JSONFixtures
    cy.fixture('Data/AddUserForm').then((data) => {
      this.elements.adminTab().should('be.visible').click();
      this.elements.addAdminButton().should('be.visible').click();
      cy.wait(2000);

      //Selection from userdropdown
      this.elements.userRoleDropdown().click();
      this.elements.userRoleOption(data.role).click();
      // Get input Placeholders 
      cy.get('input[placeholder="Type for hints..."]').type('A', { force: true });

      // Using dropdown
      cy.get('.oxd-autocomplete-dropdown')
        .should('be.visible')                        // wait for dropdown
        .find('div[role="option"] span')            // target list items
        .first()
        .click({ force: true });                    // click first result

      // Select Status
      this.elements.statusDropdown().click({ force: true });

      this.elements.statusOption(data.status).click({ force: true });

      cy.wait(500);
      this.elements.usernameInput().type(`${data.username}_${Date.now()}`);

      cy.wait(500);
      this.elements.passwordInput().type(data.password);

      cy.wait(1000);
      // typing Wrong Password For Mismatching
      this.elements.confirmPasswordInput().type(data.confirmPasswordWrong);

      // this.elements.saveButton().click({ force: true });
    });
  }


// Test Case 9: Add Admin User
  addAdminUserForm() {
    cy.fixture('Data/AddUserForm').then((data) => {
      cy.wait(2000);
      cy.log('Role:', data.role); // Log value
      expect(data.role).to.exist; // Optional safety check
      // Navigate to Admin tab and click Add
      this.elements.adminTab().should('be.visible').click();
      cy.wait(2000);

      this.elements.addAdminButton().should('be.visible').click();

      this.elements.userRoleDropdown().click();
      cy.wait(2000);

      this.elements.userRoleOption(data.role).click();

      cy.get('input[placeholder="Type for hints..."]').type('A', { force: true });
      cy.wait(2000);


      cy.get('.oxd-autocomplete-dropdown')
        .should('be.visible')                        // wait for dropdown
        .find('div[role="option"] span')            // target list items
        .first()
        .click({ force: true });                    // click first result

      // Select Status
      this.elements.statusDropdown().click({ force: true });
      cy.wait(2000);

      this.elements.statusOption(data.status).click({ force: true });

      this.elements.usernameInput().type(`${data.username}_${Date.now()}`);
      cy.wait(2000);

      this.elements.passwordInput().type(data.password);
      this.elements.confirmPasswordInput().type(data.confirmPassword);

      // Submit the form
      this.elements.saveButton().should('be.visible').click();

  });
}

  // Test Case 10: Verify User Deletion
  deleteUserFromTable() {
    this.elements.adminTab().click();
    cy.wait(1000);

    // Click the sort icon to sort by User Role descending
    this.elements.userRoleSortIcon().click({ force: true });
    cy.wait(1500); // Allow table to update
    

    cy.get('div.oxd-table-header-sort-dropdown')
      .should('be.visible');

    // Step 3: Click the "Descending" option inside it
    cy.get('div.oxd-table-header-sort-dropdown')
      .contains('span.oxd-text--span', 'Descending')
      .click({ force: true });

    // Capture username of the first row
    this.elements.usernameCell()
      .invoke('text')
      .then((username) => {
        cy.wrap(username.trim()).as('deletedUsername');
      });

    // Delete the user
    this.elements.deleteIcon().click({ force: true });
    this.elements.confirmDeleteBtn().click({ force: true });
  }

  
}



export default AdminPage;
