require('dotenv').config();
const {spec} = require('pactum');

it('API - Deve listar todos os cupons cadastrados', async () => {
    const response = await spec()
      .get(process.env.PATH_WC_V3_CUPONS)
      .withHeaders('accept', 'application/json')
      .withHeaders('authorization', `Basic ${process.env.AUTH_KEY}`)
      .expectStatus(200)
      .expect((body) => {
        if (body != null) {
          console.log('Validado com sucesso')
        } else {
          throw new error('corpo da requisição é está nulo')
        }
      })
  });