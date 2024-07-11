beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}/minha-conta/`);
    cy.GUILogin(Cypress.env('email'), Cypress.env('password'));
});


describe('Detalhes da Conta', () => {
    
    it('Acessar Detalhes da conta, alterar os dados nome e email', () => {
        cy.validaPainel()
        cy.get('#main > div > div').should('be.visible','contains.text', 'aluno_ebac')
        cy.alteraDetalhesDaconta()
    });

    it('Validar o não preenchimento de campos obrigatórios', () => {
        cy.validaPainel()
        cy.get('#main > div > div').should('be.visible','contains.text', 'aluno_ebac')
        cy.alteraDetalhesDaconta().then((limparNome) =>{
            cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a')
            .should('contains.text', 'Detalhes da conta').click()
            cy.get('#account_first_name').clear(limparNome)
            cy.get('.woocommerce-Button').should('be.visible').click()
            cy.get('#main > div > div > div > ul')
            .should('be.visible', 'contains.text', 'Nome é um campo obrigatório.').click()
        })
    });

    it('Ao atualizar a senha informando a senha atual incorreta', () => {
        cy.validaPainel()
        cy.get('#main > div > div').should('be.visible','contains.text', 'aluno_ebac')
        cy.alteraSenha()
    });

});