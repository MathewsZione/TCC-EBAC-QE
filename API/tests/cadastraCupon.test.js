require('dotenv').config();
const {spec} = require('pactum');

it(' Deve cadastrar os cupons com os campos obrigatórios', async () => {
    const cuponCode = Math.floor(Math.random() * 1234567)
  
    const response = await spec()
    .post(process.env.PATH_WC_V3_CUPONS)
    .withHeaders({
      'accept': 'application/json',
      'authorization': `Basic ${process.env.AUTH_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    .withForm({
      code: cuponCode
    })
    .expectStatus(201)
    .expectJsonLike({ code: String(cuponCode) })
    .expect((reponse) => {
      if (reponse != null) {
        console.log('Validado com sucesso')
      } else {
        throw new error('corpo da requisição é está nulo')
      }
    })
    .toss();
  })