const request = require('supertest');
const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const app = require('../server'); // Ajuste o caminho conforme sua configuração

// Defina o esquema Joi para validar a resposta
const responseSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  // Adicione outras propriedades conforme necessário
});

describe('API Contract Test', () => {
  it('should validate the response contract', async () => {
    const response = await request(app)
      .get('/endpoint') // Ajuste o endpoint conforme necessário
      .expect(200);

    // Valide a resposta contra o esquema Joi
    const { error } = responseSchema.validate(response.body);

    // Se houver um erro de validação, lance um erro
    if (error) {
      throw new Error(`Response validation error: ${error.message}`);
    }
  });
});
