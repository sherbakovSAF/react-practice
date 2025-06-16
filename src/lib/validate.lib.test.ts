import { describe, expect, it } from "vitest";
import { validateEmail, validatePassword } from "./validate.lib";

describe("ValidateEmail", () => {
  it("Empty sting", () => {
    expect(validateEmail("")).toBe(false);
  });

  it("Invalid email", () => {
    expect(validateEmail("test")).toBe(false);
  });

  it("No domain name before the dot.", () => {
    expect(validateEmail("test@.com")).toBe(false);
  });

  it("No username.", () => {
    expect(validateEmail("@mail.com")).toBe(false);
  });

  it("Double dot.", () => {
    expect(validateEmail("test@mail..com")).toBe(false);
  });

  it("Valid with subdomain.", () => {
    expect(validateEmail("test@sub.mail.com")).toBe(true);
  });

  it("Email without top-level domain", () => {
    expect(validateEmail("test@mail")).toBe(false);
  });

  it("Valid email", () => {
    expect(validateEmail("test@mail.ru")).toBe(true);
  });

  it("Number as a string", () => {
    expect(validateEmail("123")).toBe(false);
  });
});

describe("Validate Password", () => {
  it("Empty string", () => {
    expect(validatePassword("")).toBe(false);
  });

  it("Invalid password", () => {
    expect(validatePassword("123")).toBe(false);
  });

  it("Valid password", () => {
    expect(validatePassword("Ab123123")).toBe(true);
  });
});
