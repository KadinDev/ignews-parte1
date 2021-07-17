import styles from './styles.module.scss';

/* aqui é para passar o priceId que está no Home() para esse botão */
interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton( { priceId } : SubscribeButtonProps ) {
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe Now
        </button>
    );
}