export const AsyncError = (func) => (req, res, next) => Promise.resolve(func(req, res, next)).catch(next);
