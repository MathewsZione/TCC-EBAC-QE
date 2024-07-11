///<reference types= "cypress"/>

const { faker } = require('@faker-js/faker')

const ruafaker = faker.address.street()
const cityfaker = faker.address.city()
const emailfaker = faker.internet.email()
const zipCodeFaker = faker.address.zipCode()
const numberPhoneFaker = faker.phone.number()
const nomeFaker = faker.internet.userName()
const lastNameFaker = faker.name.fullName()
const displayNameFaker = faker.internet.displayName()
const passwordfaker = faker.internet.password()

Cypress.Commands.add('GUILogin', (email = Cypress.env('email'), password = Cypress.env('password')) => {
        cy.get('#username').click().type(email)
        cy.get("#password").click().type(password, {log:false})
        cy.get("#rememberme").click({force : true}).should('be.checked')
        cy.get('.woocommerce-form > .button').should('be.visible').click({force : true})
        cy.wait(300)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)', { timeout: 10000 })
        .should('be.visible').and('contain.text', 'Olá')
        cy.location('pathname').should('eq', '/minha-conta/')
})

Cypress.Commands.add('sessionLogin', (email = Cypress.env('email'), password = Cypress.env('password')) => {
       
        const login = () => {
                cy.GUILogin(email, password)
                cy.session(email, login)
        }
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

Cypress.Commands.add('validaPainel', () => {
        cy.get('.breadcrumb > .active').should('be.visible','contains.text', 'MINHA CONTA')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard.is-active > a').should('be.visible','contains.text', 'PAINEL')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--orders > a').should('be.visible','contains.text', 'PEDIDOS')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--downloads > a').should('be.visible','contains.text', 'DOWNLOAD')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-address > a').should('be.visible','contains.text', 'ENDEREÇOS')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-account > a').should('be.visible','contains.text', 'DETALHES DA CONTA')
        cy.get('#main > div > nav > ul > li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a').should('be.visible','contains.text', 'SAIR')
})

Cypress.Commands.add('validarNomeDoUsuario', () => {
        cy.get('#main > div > div').should('be.visible','contains.text', 'aluno_ebac')
})

Cypress.Commands.add('validarPedido', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--orders > a').click()
        cy.location('pathname').should('eq', '/minha-conta/orders/')
        cy.get('.woocommerce-MyAccount-content').should('not.be.null', 'Exist')
})

Cypress.Commands.add('visualizarPedidos', () => {
        cy.get(':nth-child(1) > .woocommerce-orders-table__cell-order-actions > .woocommerce-button')
        .should('be.visible').click()
        cy.get('.woocommerce-order-details__title').should('be.visible').and('contains.text', 'Detalhes do pedido')
})

Cypress.Commands.add('atualizaEndereço', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a')
        .should('be.visible').click()
        cy.get('h2')
        .should('contains.text', 'My Addresses')
        cy.get(':nth-child(1) > .title > .edit').should('be.visible').click()
        cy.get('#billing_address_1').clear().type(ruafaker)
        cy.get('#billing_city').click().clear().type(cityfaker)
        cy.get('#billing_postcode').click().clear().type('28905000')
        cy.get('#billing_email').click().clear().type(emailfaker)
        cy.get('.button').should('be.visible').click()
        cy.get('#main > div > div > div.woocommerce-notices-wrapper > div').should('be.visible', 'contains.text', 'Endereço alterado com sucesso')
})

Cypress.Commands.add('atualizaEndereçoErro', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a')
        .should('be.visible').click()
        cy.get('h2')
        .should('contains.text', 'My Addresses')
        cy.get(':nth-child(1) > .title > .edit').should('be.visible').click()
        cy.get('#billing_address_1').clear().type(ruafaker)
        cy.get('#billing_city').click().clear().type(cityfaker)
        cy.get('#billing_postcode').click().clear().type(numberPhoneFaker)
        cy.get('#billing_phone').click().clear().type(zipCodeFaker)
        cy.get('#billing_email').click().clear().type(emailfaker)
        cy.get('.button').should('be.visible').click()
        cy.get('#main > div > div > div > ul').should('be.visible', 'contains.text', 'Digite um CEP válido')
})

Cypress.Commands.add('alteraDetalhesDaconta', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a')
            .should('contains.text', 'Detalhes da conta').click();
        cy.get('#account_first_name').clear().type(nomeFaker);
        cy.get('#account_last_name').clear().type(lastNameFaker);
        cy.get('#account_display_name').clear().type(displayNameFaker);
        cy.get('.woocommerce-Button').should('be.visible').click();
        cy.get('.woocommerce-notices-wrapper > :nth-child(1)')
            .should('contains.text', 'Detalhes da conta modificados com sucesso.');
});

Cypress.Commands.add('alteraSenha', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a')
        .should('contains.text', 'Detalhes da conta').click()
        cy.get('#password_current').type(passwordfaker)
        cy.get('#password_1').type(passwordfaker)
        cy.get('#password_2').type(passwordfaker)
        cy.get('.woocommerce-Button').should('be.visible').click()
        cy.get('.woocommerce-error')
        .should('contains.text', 'Sua senha atual está incorreta.')
})
