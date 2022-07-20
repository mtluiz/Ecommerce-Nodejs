import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const fields = ["name", "email", "password", "passwordConfirmation"]

      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
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
    } catch (err) {
      return serverError(new ServerError());
    }
  }
}
