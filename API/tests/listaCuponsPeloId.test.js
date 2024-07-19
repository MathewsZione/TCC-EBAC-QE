require('dotenv').config();
const {spec} = require('pactum');

it('API - Deve listar buscando por ID do cupom', async () => {
    const response = await spec()
      .get(process.env.PATH_WC_V3_CUPONS)
      .withHeaders('accept', 'application/json')
      .withHeaders('authorization', `Basic ${process.env.AUTH_KEY}`)
      .withForm({
        code: '4692'
      })
      .expectStatus(200)
      .expectJsonLike([{
        "id": 4692,
        "code": "nomecupoma0000110"
      }])
      .expect((reponse) => {
        if (reponse != null) {
          console.log('Validado com sucesso')
        } else {
          throw new error('corpo da requisição é está nulo')
        }
      })
  });