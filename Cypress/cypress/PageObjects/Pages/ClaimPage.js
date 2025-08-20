class ClaimPage {
    elements = {
        // Test case 15
        claimTab: () => cy.contains('span.oxd-main-menu-item--name', 'Claim'),
        configureDropdown: () => cy.get('.oxd-topbar-body-nav-tab-item').contains('Configuration'),
        eventButton: () => cy.get('a.oxd-topbar-body-nav-tab-link').contains('Event'),
        addEventButton: () => cy.get("i.oxd-icon.bi-plus.oxd-button-icon"),
        eventNameInput: () => cy.get('label').contains('Event Name').parents('.oxd-input-group').find('input'),
        eventsaveButton : () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').should('be.visible'),



    }




    // TEst Case 15
    claimEventAdding(uniqueEventName) {
        // visitin Maintannance Tab 
        this.elements.claimTab().click();

        // Visitin Dropdown COnfigure 
        this.elements.configureDropdown().click();

        // Selecting Event and Visiting 
        this.elements.eventButton().click();

        // Add Event button
        this.elements.addEventButton().click();

        // Adding Unique Event Name for Verification 
        this.elements.eventNameInput().type(uniqueEventName)

        // Saving the event detials 
        this.elements.eventsaveButton().click();

    }


}
export default ClaimPage;