describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('Then: I should able to mark as finished on markAsRead Button click',()=>{
    cy.get('input[type="search"]').type('Bluejay');
    cy.get('form').submit();
    cy.get('[data-testing="add-book"]').first().click();
    cy.wait(500);
    cy.get('[data-testing="toggle-reading-list"]').first().click();
    cy.get('[data-testing="finished-book"]').click();
    cy.get('[data-testing="finished-book"]').should(
      'contain.text',
      'Finished'
    );
  });
});
