import { Post, Body, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AuthBody } from '../dtos/auth.body.dto';
import { AuthResponse } from '../dtos/auth.response.dto';
import { signParamsWithJWT } from '../utils';

@OpenAPI({
  security: [],
})
@JsonController('/auth')
export class AuthController {
  @Post('')
  @OpenAPI({
    summary: 'Generate authorization token for test',
  })
  @ResponseSchema(AuthResponse)
  async auth(@Body() _body: AuthBody): Promise<AuthResponse> {
    {
      const token = signParamsWithJWT({ userId: '1' });
      return {
        token,
      };
    }
  }
}
