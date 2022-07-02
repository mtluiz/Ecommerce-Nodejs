import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const params = ["name", "email", "password"]

    for (const param of params) {
      if (!httpRequest.body[param]) {
        return {
          statusCode: 400,
          body: new MissingParamError(param)
        }
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
