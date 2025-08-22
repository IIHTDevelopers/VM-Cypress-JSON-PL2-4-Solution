class ProfilePage {

  elements = {
    myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),
    profileImageWrapper: () => cy.get('.orangehrm-edit-employee-image-wrapper'),
    fileInput: () => cy.get('input[type="file"]'),
    saveButton: () => cy.contains('button', 'Save'),
    uploadedImage: () => cy.get('.orangehrm-edit-employee-image-wrapper img'),

    // Test case 12 
    personalTab: () => cy.contains('a.orangehrm-tabs-item' , 'Personal Details'),
    firstNameField: () => cy.get('input[name="firstName"]'),
    saveButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space'),

  };



  // Test case 12 

  editProfileName(uniqueName) {

    this.elements.myInfoTab().click();
    cy.wait(2000);
    // going to Qualification Module
    this.elements.personalTab().click();
    cy.wait(1000);

    // Edit Unique name
    this.elements.firstNameField().clear().type(uniqueName);

    this.elements.saveButton().eq(0).click();
  }
}

export default ProfilePage;
