/**
 * Pattern de (dé)sérialisation.
 *
 * @see https://matthiasnoback.nl/2018/03/ormless-a-memento-like-pattern-for-object-persistence/
 */

export interface Deserializable<State> {
  toState(): State;
}

export interface Serializable<State, SerializedState> {
  FromState(state: State): SerializedState;
}
