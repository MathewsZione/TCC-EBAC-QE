class ProductViewScreen {

    get products() {
      // $$ para listas
      return $$(`-ios predicate string:name CONTAINS 'R$'`)
    }
  
    get searchIcon() {
      return $(`-ios class chain:**/XCUIElementTypeButton[2]`)
    }
  
    get searchText() {
      return $(`-ios predicate string:type == "XCUIElementTypeTextField"`)
    }
  
    get searchButton() {
      return $(`~Procurar`)
    }
  
    async search() {
      await this.searchIcon.waitForEnabled({ timeout: 10000 })
      await this.searchIcon.click()
    }
  
    async searchByName(name) {
      await this.searchText.waitForEnabled({ timeout: 10000 })
      await this.searchText.setValue(name)
      await this.searchButton.click()
    }
  
    async productList() {
      return await this.products
    }
  
    async selecionaProduto(name) {
      await $(`-ios predicate string:name CONTAINS '${name}'`).click()
    }
  
    async waitProduct(name) {
      await $(`-ios predicate string:name CONTAINS '${name}'`).waitForDisplayed({
        timeout: 100000,
      });
    }
  
    async product(name) {
      return await $(`-ios predicate string:name CONTAINS '${name}'`);
    }
  }
  module.exports = new ProductViewScreen();