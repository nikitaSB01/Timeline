// Функция для валидации координат
function validateCoordinates(input) {
  // Удаляем квадратные скобки и пробелы, если они есть
  const sanitizedInput = input.replace(/[\[\]\s]/g, "");
  // Разделяем координаты по запятой
  const [latitude, longitude] = sanitizedInput.split(",");
  // Проверка, что обе части являются числами
  if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
    throw new Error("Некорректный формат координат");
  }
  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
}

module.exports = validateCoordinates;
