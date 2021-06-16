export function safeJsonParse(value) {
  try {
    return value && typeof value === 'object' ? value : JSON.parse(value as string);
  } catch (e) {
    return {};
  }
}
