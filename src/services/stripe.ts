import Stripe from 'stripe';
import { version } from '../../package.json';

export const stripe = new Stripe(
    //STRIPE_API_KEY mesmo nome criado no .env.local
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version
        },
    }
)