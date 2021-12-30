import Message from '../../ddd/message'

/**
 * Message déclarant une intention de modification du système.
 * @see https://martinfowler.com/bliki/CQRS.html
 */
export default interface Commande extends Message {
}
