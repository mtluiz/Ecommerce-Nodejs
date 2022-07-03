import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/missing-param'
import { badRequest } from '../helpers/http-helper'
export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const params = ["name", "email", "password", "passwordConfirmation"]

    for (const param of params) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
