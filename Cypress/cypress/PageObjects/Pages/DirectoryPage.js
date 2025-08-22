class DirectoryPage {


    elements = {

        // Define locators for elements on the Directory page
        // Test case 13
        directoryTab: () => cy.contains('span.oxd-main-menu-item--name', 'Directory'),
        directoryCard: () => cy.get('.oxd-grid-item.oxd-grid-item--gutters').find('.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-directory-card'),
        phoneEmailCopyButton : ()=> cy.get('p.oxd-text.oxd-text--p.oxd-text--toast-title').eq(0),

    }



    copyingEmpTelephone() {

        // visitin Directory Tab
        this.elements.directoryTab().click();

        // Clicking on First Employee Directory card
        this.elements.directoryCard().eq(0).click();
        // fidning if {Phone of Email} is visible

        cy.get('.orangehrm-directory-card-hover-body.orangehrm-directory-card-hover-icon')
            .eq(0)
            .trigger('mouseover', { force: true }) // Force hover even if it's not fully visible
            .within(() => {
                cy.wait(500); // optional: wait for icon to appear

                cy.get('i.oxd-icon.bi-files')
                .should('be.visible') // Ensure the icon is now visible
                .click({ force: true }); // Click the copy icon
            });
                
    }


}



export default DirectoryPage;