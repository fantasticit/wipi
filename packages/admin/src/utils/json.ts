export function safeJsonParse(value) {
  try {
    if (!value) return {};

    if (typeof value === 'object') {
      return value;
    }

    if (typeof value === 'string') {
      return JSON.parse(value as string);
    }

    return {};
  } catch (e) {
    return {};
  }
}
