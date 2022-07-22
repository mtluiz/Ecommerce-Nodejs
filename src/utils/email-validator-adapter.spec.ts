import EmailValidatorAdapter from "./email-validator-adapter";
describe("EmailValidator Adapter", () => {
  test("should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid("invalid_emaila")
    expect(isValid).toBe(false)
  })

  test("should return true if validator returns true", () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid("valid_email@gmail.com")
    expect(isValid).toBe(true)
  })

  test("should return false with empty string", () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid("")
    expect(isValid).toBe(false)
  })
})