export type WordValidationResult =
  | { ok: true; value: string }
  | { ok: false; reason: string };

export function normalizeWord(input: string): string {
  return input.trim().toLowerCase();
}

export function validateWord(input: string): WordValidationResult {
  const value = normalizeWord(input);

  if (value.length < 6 || value.length > 14) {
    return { ok: false, reason: 'Word length must be between 6 and 14 characters.' };
  }

  if (!/^[a-z]+$/.test(value)) {
    return { ok: false, reason: 'Only English letters (a-z) are allowed.' };
  }

  return { ok: true, value };
}
