import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/missing-param'
import { InvalidParamError } from '../errors/invalid-param'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const params = ["name", "email", "password", "passwordConfirmation"]

    for (const param of params) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError("email"))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
