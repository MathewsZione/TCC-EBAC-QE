require('dotenv').config();
const {spec} = require('pactum');

it(' Deve validar erro ao cadastrar cupon existente', async () => {
    const response = await spec()
    .post(process.env.PATH_WC_V3_CUPONS)
    .withHeaders({
      'accept': 'application/json',
      'authorization': `Basic ${process.env.AUTH_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    .withForm({
      code: 4692
    })
    .expectStatus(400)
    .expectJson({
      "code": "woocommerce_rest_coupon_code_already_exists",
      "message": "O código de cupom já existe",
      "data": {
        "status": 400
      }
    })
    .expect((reponse) => {
      if (reponse != null) {
        console.log('Validado com sucesso')
      } else {
        throw new error('corpo da requisição é está nulo')
      }
    })
    .toss();
  })