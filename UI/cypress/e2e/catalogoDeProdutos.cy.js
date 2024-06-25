beforeEach(() => {
  cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`)
  cy.login(Cypress.env('email'), Cypress.env('password'))
  
});

describe('Teste de exemplo', () => {

  it('Deve acessar a página de minha conta', () => {
    cy.AdicionarProdutoAoCarrinho()
  });
});
