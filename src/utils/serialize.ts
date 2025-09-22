/**
 * Utility function to serialize ORM entities to plain objects
 * for passing between Server and Client Components
 */
export function serialize<T extends object>(entity: T) {
  return JSON.parse(JSON.stringify(entity));
}
