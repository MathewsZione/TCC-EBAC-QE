beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`);
    cy.GUILogin(Cypress.env('email'), Cypress.env('password'));
});

describe('Funcionalidade painel minha conta', () => {
    
    it('Deve acessar o painel e validar o menus', () => {
        cy.location('pathname').should('eq', '/minha-conta/')
        cy.validaPainel()
        
    });

    it('Deve validar mensagem de boas vindas ao usuário', () => {
        cy.location('pathname').should('eq', '/minha-conta/')
        cy.validaPainel()
        cy.validarNomeDoUsuario()
    });

});