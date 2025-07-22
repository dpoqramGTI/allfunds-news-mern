describe("module-alias config", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.resetModules();
  });

  it("permite importar usando @ en modo desarrollo", () => {
    process.env.NODE_ENV = "development";
    require("../../src/register-aliases");

    const { dummy } = require("@/dummy");
    expect(dummy).toBe("funciona");
  });

  it("permite importar usando @ en modo producción", () => {
    process.env.NODE_ENV = "production";
    require("../../src/register-aliases");

    const { dummy } = require("@/dummy");
    expect(dummy).toBe("funciona");
  });
});
