Cypress.Commands.add('login', (email, password) => {
        cy.get('#username').click().type(email)
        cy.get("#password").click().type(password)
        cy.get("#rememberme").click({force : true}).should('be.checked')
        cy.get('.woocommerce-form > .button').should('be.visible').click({force : true})
        cy.wait(300)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)', { timeout: 10000 })
        .should('be.visible').and('contain.text', 'Olá, aluno_ebac')
})

Cypress.Commands.add('AdicionarProdutosAoCarrinho', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.contains('Ariel Roll Sleeve Sweatshirt').click({ force: true })
        cy.wait(300)
        cy.get('.product_title').should('contains.text', 'Ariel Roll Sleeve Sweatshirt')
        cy.wait(300)
        cy.get('.button-variable-item-XS').should('be.visible').click({ force: true })
        cy.wait(300)
        cy.get('.button-variable-item-Green').should('be.visible').click({ force: true })
        cy.wait(300)
        cy.get('.single_add_to_cart_button').should('be.visible').click()
        cy.wait(300)
        cy.get('.woocommerce-message').should('contains.text', 'Ver carrinho')
        cy.wait(100)
        cy.get('.woocommerce-message > .button').click()
        cy.wait(100)
        cy.get('.remove > .fa').click()
        cy.wait(100)
        cy.get('.cart-empty').should('contains.text', 'Seu carrinho está vazio')
});

Cypress.Commands.add('favoritarProduto', () => {
        cy.get('#primary-menu > .menu-item-629 > a').should('be.visible').click({ force: true })
        cy.contains('Ajax Full-Zip Sweatshirt').should('be.visible').click({ force: true })
        cy.wait(300)
        cy.get('.button-variable-item-XS').should('be.visible').click({ force: true })
        cy.wait(300)
        cy.get('.button-variable-item-Blue').should('be.visible').click({ force: true })
        cy.get('.summary > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist > .yith-wcwl-icon').click({ force: true })
        cy.get(':nth-child(2) > .text-skin > .fa').click({ force: true })
        cy.get('.page-title').should('contains.text', 'Lista de desejos')
        cy.get('.product-name > [href="http://lojaebac.ebaconline.art.br/product/ajax-full-zip-sweatshirt/?attribute_size=XS&attribute_color=Blue"]').should('contains.text', 'Ajax Full-Zip Sweatshirt')
});

Cypress.Commands.add('removerProdutoDaListaDeDesejos', () => {
        cy.get(':nth-child(2) > .text-skin > .fa').should('be.visible').click({ force: true })
        cy.get('.product-name > [href="http://lojaebac.ebaconline.art.br/product/ajax-full-zip-sweatshirt/?attribute_size=XS&attribute_color=Blue"]').should('contains.text', 'Ajax Full-Zip Sweatshirt')
        cy.get('.remove > .fa').should('be.visible').click({froce:true})
        cy.get('.woocommerce-message').should('contains.text', 'Produto removida com sucesso.')
})


