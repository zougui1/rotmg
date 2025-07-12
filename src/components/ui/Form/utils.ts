export const getFormErrorMessage = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error &&
    'message' in error
  ) {
    return String(error.message);
  }

  return String(error);
}
