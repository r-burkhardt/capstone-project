interface Serializable<T> {
  serialize(): string;
  deserialize(json: Object): T;
}
