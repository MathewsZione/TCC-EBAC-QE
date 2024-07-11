beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`);
    cy.GUILogin(Cypress.env('email'), Cypress.env('password'));
});


describe('Validar funcionalidade meus pedidos', () => {
    
    it('Acessar Endereços e validar a atualização de endereç', () => {
        cy.atualizaEndereço()
    });

    it('Deve exibir mensagem de erro ao informar dados incorretos', () => {
        cy.atualizaEndereçoErro()
    });

});