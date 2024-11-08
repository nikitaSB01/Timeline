const validateCoordinates = require("../validateCoordinates");

describe("validateCoordinates", () => {
  test("корректный формат с пробелом", () => {
    expect(validateCoordinates("51.50851, -0.12572")).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test("корректный формат без пробела", () => {
    expect(validateCoordinates("51.50851,-0.12572")).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test("корректный формат с квадратными скобками", () => {
    expect(validateCoordinates("[51.50851, -0.12572]")).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test("некорректный формат", () => {
    expect(() => validateCoordinates("51.50851 -0.12572")).toThrow(
      "Некорректный формат координат"
    );
  });

  test("некорректный формат с буквами", () => {
    expect(() => validateCoordinates("abc, xyz")).toThrow(
      "Некорректный формат координат"
    );
  });

  test("пустой ввод", () => {
    expect(() => validateCoordinates("")).toThrow(
      "Некорректный формат координат"
    );
  });
});
