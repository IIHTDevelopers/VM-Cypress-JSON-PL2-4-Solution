class MaintenancePage {
    elements = {
        // Test case 14
        maintainanceTab: () => cy.contains('span.oxd-main-menu-item--name', 'Maintenance'),
        passwordInput: 'input[name="password"]',
        loginButton: 'button[type="submit"]',

    }




    // TEst Case 14 
    maintainanceOnlyAdminAcsess() {
        // visitin Maintannance Tab 
        this.elements.maintainanceTab().click();

        cy.fixture('Data/LoginData').then((credentials) => {
            // Then filling Admin password 
            cy.get(this.elements.passwordInput).type(credentials.password);
            cy.get(this.elements.loginButton).click();
        });
    }

}

export default MaintenancePage;