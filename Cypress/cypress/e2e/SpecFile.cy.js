import LoginPage from '../PageObjects/Pages/LoginProfilePage';
import ProfilePage from '../PageObjects/Pages/ProfilePage';
import HomePage from '../PageObjects/Pages/HomePage';
import AdminPage from '../PageObjects/Pages/AdminPage';
import LeavesPage from '../PageObjects/Pages/LeavesPage';
import DirectoryPage  from '../PageObjects/Pages/DirectoryPage';  
import MaintenancePage from '../PageObjects/Pages/MaintainancePage'
import ClaimPage from '../PageObjects/Pages/ClaimPage';

describe('Automation Suite for Yaksha Application', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const homePage = new HomePage();
  const adminPage = new AdminPage();
  const leavePage = new LeavesPage();
  const directoryPage = new DirectoryPage();
  const maintenancePage = new MaintenancePage();
  const claimPage = new ClaimPage();

  let testIndex = 1;

  beforeEach(() => {

    // As per the requirment of TS-1 we have to perform login in that so we are skippping beforeEach Block for that TS-1
    if (testIndex !== 1) {
      loginPage.performLogin();
    }
    testIndex++;
  });

  // Test Case 1
  it('TS-1: Verify Succesfully Login', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page
        loginPage.performLoginSuccesfull();
      })
      .then(() => {
        verifyLoginSuccesfull(); // Verify LogIn Functionality
      });
  });

  // Test Case 2
  it('TS-2: Verify a popup saying employee on leave today appears on clicking the Setting icon', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Leaves Page , Creating holiday
        homePage.empOnLeave()
      })
      .then(() => {
        cy.wait(2000);
        // Verify the holiday is created
        verifyEmpOnLeavePopUp();
      });

  });

''
  // Test Case 3
  it('TS-3: Verify URL endpoint should contain selected tab from the sidebar' , () => {
    // Accesing Avaialble Sidebar Tabs name from JSON File 
    cy.fixture('Data/AllTabsLabel').then((data) => {
    data.tabs.forEach((tab) => {

      // Performing Action for Accesing Subtab Endpoint
      homePage.clickSidebarTab(tab);

      // Verify Endpoint is Correct as The tab name
      verifySubEndpointIsCorrect(tab);

      // Navigate to Homepage again fro Next Tab
      navigateToHome(); // Return to Dashboard/home
    });
  });
  });

  // Test Case 4
  it('TS-4: Verify the Search Functionality', () => {
    cy.wrap(null).then(() => {
        // Navigate to HomePage and check for Search Fucntionality
        homePage.checkingSearchFunctionality();    

      }).then(() => {
        cy.wait(2000);
        verifySearchFunctionalityWorking(); // Verify Search result contain only one value and correct one only
      });

  });

  
  it('TS-5: Verify the sidebar Collapse Button Functionality', () => {
    cy.wrap(null).then(() => {

      // this Can't be done because verifying object is out os scope
      homePage.checkForCollapseButtonWork(); 
            
      }).then(() => {
        cy.wait(2000);
        // Verify the hover functionality works
        verifySubtabCollapse();  
      });

  });


  // Test Case 6
  it('TS-6: Verify Log Out Functionality', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Home Page and Performing
        homePage.LogoutFuntionCheck();
      })
      .then(() => {
        verifyLogoutCompleted(); // Verify Logout Functionality
      });
  });



  // Test Case 7
  it('TS-7: Verify New holidays could be created', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Leaves Page , Creating holiday
        leavePage.leaveCreation()
      })
      .then(() => {
        cy.wait(2000);
        // Verify the holiday is created
        verifyHoldiayCreaded();
      });

  });

  // Test Case 8 : Verify Password Mismatch Error display
  it('TS-8: Verify Password Mismatch Error display', () => {
    cy.wrap(null).then(() => {
      // Navigate to Admin tab and click Add
        adminPage.passwordMismatchError();    

      }).then(() => {
        cy.wait(2000);
        verifyPasswordMismatchError(); // Verify the error message Password Mismatch
      });

  });

  // Test Case 9
  it('TS-9: Verify Admin can add record', () => {
    cy.wrap(null).then(() => {
        // Navigate to Admin Page and add a new admin user
        adminPage.addAdminUserForm();    

      }).then(() => {
        cy.wait(2000);
        verifyAddAdmin(); // Verify the error message Password Mismatch
      });

  });



  // Test Case 10 : Verify User should be deleted from the table
 it('TS-10: Verify User should be deleted from the table', () => {
    cy.wrap(null).then(() => {

      // this Can't be done because verifying object is out os scope
      adminPage.deleteUserFromTable(); 
            
      }).then(() => {
        cy.wait(2000);
        // Verify the hover functionality works
        verifyDeleteUser();  
      });

  });


   // Test Case 11 : Verify "Work week" form could be saved successfully 
 it('TS-11: Verify "Work week" form could be saved successfully ', () => {
    cy.wrap(null).then(() => {

      // this Can't be done because verifying object is out os scope
      leavePage.addWorkWeekFromLeave(); 
            
      }).then(() => {
        cy.wait(2000);
        // Verify the hover functionality works
        verifyWorkWeekAdded();  
      });

  });


   // Test Case 12 : Verify the Personal details get updated successfully 
 it('TS-12: Verify the Personal details get updated successfully ', () => {
    // Start
    const uniqueName = "UniqueName_&" + Date.now();
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.editProfileName(uniqueName);
      })
      .then(() => {
        verifyEditProfileName(uniqueName); // Verif Emp Name get edited Succesfully
      });
  });


  // Test Case 13 : Verify work Telephone could be copied to clipboard
  it('TS-13:Verify work Telephone could be copied to clipboard', () => {
      // Start
      cy.wrap(null).then(() => {
          // Navigate to Directory Page & Performing Actions
         directoryPage.copyingEmpTelephone();
        })
        .then(() => {
          verifySuccesTelephoneCopy(); // Verif Emp Name get edited Succesfully
        });
  });


  // Test Case 14 : Verify the Maintenance tab only allows admin to access
  it('TS-14: Verify the Maintenance tab only allows admin to access', () => {
      // Start
      cy.wrap(null).then(() => {
          // Navigate to Directory Page & Performing Actions
         maintenancePage.maintainanceOnlyAdminAcsess();
        })
        .then(() => {
          verifyMaintainanceOnlyAdminAcsess(); // Verif Emp Name get edited Succesfully
        });
  });



  // Test Case 15 : Verify the events added successfully gets added to the claim dropdown
  it('TS-15: Verify the events added successfully gets added to the claim dropdown', () => {
      
    // Generating unique Event name for Verification  process 
    const uniqueEventName = "UniqueEventName_&" + Date.now();
    // Start
      cy.wrap(null).then(() => {
          // Navigate to Directory Page & Performing Actions
         claimPage.claimEventAdding(uniqueEventName);
        })
        .then(() => {
          verifyClaimEventAddedSuccess(uniqueEventName); // Verif Emp Name get edited Succesfully
        });
  });


  // ---------------------- Helper Functions ----------------------

});




// Helper function moved outside the describe block
// Test Case 1: Verify Login Functionality is working or not
function verifyLoginSuccesfull() {
  cy.url().should('include', '/dashboard');
  cy.contains('Dashboard').should('be.visible');
};

// Test Case 2: Verify Employee on Leave pop up will appears
function verifyEmpOnLeavePopUp() {
  // Checking for Employee on Leave Pop up is Visible or not
  cy.get('p.oxd-text.oxd-text--p.oxd-text--card-body').contains('Employees on Leave Today');
  // and
  cy.get('p.oxd-text.oxd-text--p.oxd-text--card-title').contains('Configurations');

}

// Test Case 3: Verify Each subtab having Unique Url endpoint
function verifySubEndpointIsCorrect(tab) {
  cy.wait(2000);
  const normalizedTab = tab.toLowerCase().replace(/\s+/g, '');

  if (normalizedTab === 'candidates') {
    // For "My Info", verify URL and empNumber is visible
    cy.url().should('include', 'recruitment/viewCandidates');

  } else {
    // General URL check
    cy.url().should('include', '/recruitment/viewJobVacancy');
  }
}


// Test Case 4: Verify Search Functionality is working
function verifySearchFunctionalityWorking() {
  cy.get('span.oxd-text.oxd-text--span.oxd-main-menu-item--name')
    .should('have.length', 1)                       
    .first()                                       
    .should('contain.text', 'Dashboard');
}


// Test Case 5: Verify Subtab Will Collapsed after Clicking
function verifySubtabCollapse() {
  cy.wait(2000);
  cy.get('span.oxd-text.oxd-text--span.oxd-main-menu-item--name')
      .contains("Admin")
      .should('exist')         
      .and('not.be.visible');
}
// Test Case 6 : Verify LogOut functionality is Working
function verifyLogoutCompleted() {
  cy.url().should('include', '/auth/login');
  cy.contains('Login').should('be.visible');
};


// Test Case 7: Verify Holiday Created
function verifyHoldiayCreaded() {
  cy.fixture('Data/HolidayForm').then((testData) => {
    cy.wait(2000); // wait for the list to update (optional)

    cy.get('.orangehrm-container')
      .find('.oxd-table-cell')
      .should('contain.text', testData.name);
  });
}

// Test Case 8: Verify Password Mismatch Error
function verifyPasswordMismatchError() {
  cy.wait(1000);
  cy.get('span.oxd-input-field-error-message')
    .should('be.visible')
    .contains('Passwords do not match');
}

// Test Case 9: Verify Upgrade Link Attributes
function verifyAddAdmin() {
  cy.wait(2000);
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Saved');
  cy.log('Admin user added successfully');
}


 // Test Case 10
function verifyDeleteUser() {
  cy.wait(2000);
  cy.get('@deletedUsername').then((deletedName) => {
      // Wait for table to reload
      cy.wait(2000);
      // Verify deleted user is not listed
      cy.get('.oxd-table-body').should('not.contains.text', deletedName);
    });
}

// Test case 11
function verifyWorkWeekAdded() {

      // Click Tuesday dropdown (index 1)
    cy.get('div.oxd-select-text').eq(1).click();

    // Select "Half Day"
    cy.get('.oxd-select-dropdown').contains('Half Day').click();

    // Assert that the dropdown now shows "Half Day"
    cy.get('div.oxd-select-text').eq(1)
      .should('contain.text', 'Half Day');
}


// Test Case 12
function verifyEditProfileName(uniqueName) {
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Updated');
  cy.reload();
  cy.get('p.oxd-userdropdown-name').contains(uniqueName).should('be.visible');
}

// Test Case 13
function verifySuccesTelephoneCopy() {
  let clipboardValue = "";

    // Read the clipboard value
    cy.window().then((win) => {
        return win.navigator.clipboard.readText();
    }).then((text) => {
        clipboardValue = text;
        cy.log("Copied from clipboard:", clipboardValue);

        // Now check that it is visible first directory card
        cy.get('p.oxd-text.oxd-text--p.oxd-text--toast-title')  // Checking first thing Phone or email
          .eq(0) // First card
          .should('contain.text', clipboardValue); //Assertion
    });
}

// Test case 14
function verifyMaintainanceOnlyAdminAcsess() {
  // wating and assertion for Maintanine is opening on only using Admin access or not 
  // Checking for maintenance URL is opened or not
  cy.url().should('include', '/maintenance/purgeEmployee');

  // ceck for Maintenance Page is visible or not 
  cy.contains('Maintenance').should('be.visible');

}

// Test case 15
function verifyClaimEventAddedSuccess(uniqueEventName) {
  
  cy.wait(4000)
  // ceck for Claim Page is visible and out event is created and visible or not
  cy.contains(uniqueEventName).should('be.visible');

}
  // ---- Helper Function ------


function navigateToHome() {
  cy.navigatingToBaseURL();
}