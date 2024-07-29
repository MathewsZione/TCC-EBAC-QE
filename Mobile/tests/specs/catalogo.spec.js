const productViewScreen = require("../screens/productView.screen");
const detalheProdutoScreen = require("../screens/detalheProduto.screen")
const carrinhoScreen = require("../screens/carrinho.screen")

describe('Utilização da tela de catálogo de produtos', () => {
    it('deve selecionar um produto do catálogo e adicionar no carrinho em quantidade 2', async () => {
        let produto = 'Ingrid Running'
        await productViewScreen.waitProduct(produto)
        await productViewScreen.selecionaProduto(produto)
        await detalheProdutoScreen.clicaAdicionaQuantidade()
        await detalheProdutoScreen.clicaBotaoAdicionaCarrinho()
        await detalheProdutoScreen.clicaTamanho()
        await detalheProdutoScreen.clicaSelecionaTamanho()
        await detalheProdutoScreen.clicaCor()
        await detalheProdutoScreen.clicaSelecionaCor()
        await detalheProdutoScreen.clicaBotaoAdicionaCarrinho()

        expect(await carrinhoScreen.product(produto)).toExist();
        expect(await carrinhoScreen.product(produto)).toHaveTextContaining(' 2');
    })
})