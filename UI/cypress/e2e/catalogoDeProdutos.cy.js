beforeEach(() => {
  cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`);
  cy.GUILogin(Cypress.env('email'), Cypress.env('password'));
});


describe('Funcionalidade produtos', () => {

  it('Selecionar um produto com cor diferente e adicionar a lista de desejos', () => {
    cy.AdicionarProdutosAoCarrinho()
  });

  it('Deve favoritar um produto', () => {
    cy.favoritarProduto()
  });

  it('Deve remover o produto da lista de desejos', () => {
    cy.removerProdutoDaListaDeDesejos()
  });

});
