Cypress.Commands.add('drupalLogin', () => {
  cy.request({
    method: 'POST',
    url: '/user/login',
    form: true,
    followRedirect: true, // required for session to persist
    body: {
      name: Cypress.env("USERNAME"),
      pass: Cypress.env("PASSWORD"),
      form_id: 'user_login_form'
    }
  }).then((resp) => {
    // ✅ Skip manual setCookie
    expect(resp.status).to.eq(200); // or 303 depending on redirect behavior
  });
});

Cypress.Commands.add('uiLogin', () => {
  cy.visit('/user/login');
  cy.get('#edit-name').type(`${Cypress.env('USERNAME')}`);
  cy.get('#edit-pass').type(Cypress.env('PASSWORD'));
  cy.get('#edit-submit').click();
});

Cypress.Commands.add('visualCheck', (tag) => {
  cy.eyesCheckWindow({ tag, fully: true });
});

