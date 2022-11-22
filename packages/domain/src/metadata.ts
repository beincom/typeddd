export function getMetadata(): Map<string, Record<string, any>> {
  if (!global.TypeDDDStoreMetadata) {
    global.TypeDDDStoreMetadata = new Map<string, unknown>();
  }
  return global.TypeDDDStoreMetadata;
}

export function setMetadata(key: string, value: unknown) {
  getMetadata().set(key, value);
}

export function getMetadataByKey<T>(key: string): T {
  return getMetadata().get(key) as unknown as T;
}
