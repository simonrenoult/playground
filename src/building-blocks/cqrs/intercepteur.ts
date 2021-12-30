import Message from "./message";

export default interface Intercepteur<M extends Message> {
  executer(m: M): void
}
