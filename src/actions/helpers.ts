function safeStringify(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return Object.prototype.toString.call(value); // e.g. "[object Object]"
  }
}

export function throwIfError(err: unknown): asserts err is null | undefined {
  if (err) {
    if (err instanceof Error) {
      throw err;
    }

    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as { message?: unknown }).message === 'string'
    ) {
      throw new Error((err as { message: string }).message);
    }

    throw new Error(safeStringify(err));
  }
}
