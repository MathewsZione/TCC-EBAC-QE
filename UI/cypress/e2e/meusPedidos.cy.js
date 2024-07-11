beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`);
    cy.GUILogin(Cypress.env('email'), Cypress.env('password'));
});


describe('Validar funcionalidade meus pedidos', () => {
    
    it('validar lista de produtos', () => {
        cy.validaPainel()
        cy.validarNomeDoUsuario()
        cy.validarPedido()
    });

    it('Deve visualizar um pedido', () => {
        cy.validaPainel()
        cy.validarNomeDoUsuario()
        cy.validarPedido()
        cy.visualizarPedidos()
    });

});