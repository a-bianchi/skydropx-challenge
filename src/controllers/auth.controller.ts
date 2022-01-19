import { Get, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AuthResponse } from '../dtos/auth.response.dto';
import { signParamsWithJWT } from '../utils';

@OpenAPI({
  security: [{ jwt: [] }],
})
@JsonController('/token-authorization')
export class AuthController {
  @Get('')
  @OpenAPI({
    summary: 'Generate authorization token for test',
  })
  @ResponseSchema(AuthResponse)
  async get() {
    const token = signParamsWithJWT({ userId: '1' });
    return {
      token,
    };
  }
}
