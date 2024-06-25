const produtos = require('../fixtures/produtos.json')

Cypress.Commands.add('login', (email, password) => {
        cy.get('#username').click().type(email)
        cy.get("#password").click().type(password)
        cy.get("#rememberme").click({force : true}).should('be.checked')
        cy.get('.woocommerce-form > .button').should('be.visible').click({force : true})
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)', { timeout: 10000 })
        .should('be.visible').and('contain.text', 'Olá, aluno_ebac')

})

Cypress.Commands.add('AdicionarProdutoAoCarrinho', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click({ force: true });
        cy.get('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover').click({ force: true })
        cy.get('.product_title').should('contains.text', 'Abominable Hoodie')
        cy.get('.button-variable-item-M').click({ force: true })
        cy.get('.button-variable-item-Blue').click({ force: true })
        cy.get('.button-variable-item-Blue').click({ force: true })
});


