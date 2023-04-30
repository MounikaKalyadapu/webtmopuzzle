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
  it('Then: I should able to Add to list',()=>{
    cy.get('input[type="search"]').type('Bluejay');
    cy.get('form').submit();
    cy.get('[data-testing="add-book"]').first().click();
    cy.get('[data-testing="add-book"]').first().should("be.disabled");
    cy.get('[data-testing="toggle-reading-list"').click();
    cy.get('[data-testing="remove-from-list"]').first().click();
    cy.get('[data-testing="array-ReadingList"]').should('not.exist');
    cy.wait(300);
    cy.contains('button', 'Add to List?').click();
    cy.get('[data-testing="add-book"]').first().should("be.disabled");
  });
});
