import { GetStaticProps } from 'next';
import Head from 'next/head'; // para fazer títulos dinâmicos por páginas

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// Client-side, para outros casos
// Server-side, para dados dinânicos da sessão do usúario 
// Static Site Generation, compartilha o mesmo html(paginas que iguais para todos os users)

//ex:
// Post do blog
// Conteudo (SSG)
// Comentários (Client-Side)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home( {product} : HomeProps ) {
  return (
    <>

    <Head>
      <title> Home | ig.news </title>
    </Head>

    <main className={styles.contentContainer} >
      <section className={styles.hero}>
        <span> 👏 Hey, welcome </span>
        <h1>News about the <span>React</span> world. </h1>
        <p>
          Get access to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>

        <SubscribeButton
          priceId = {product.priceId}
        />

      </section>

      <img src="/images/avatar.svg" alt="Girl coding"/>
    </main>

    </>     
  );
}

//função tipada (GetServerSideProps)
// o nome GetServerSideProps foi mudado para getStaticProps
//tudo que retornamos aqui será mostrado no Home() acima
export const getStaticProps: GetStaticProps = async () => {
  //stripe importado acima
  //retrieve pq quer chamar somente um só
  // price_1JE2tZGVDS7T93IkgB2wqrTF id do price pego no site da stripe
  const price = await stripe.prices.retrieve('price_1JE2tZGVDS7T93IkgB2wqrTF', {
    expand: ['product'] /* expand: ['product'] acessa todas as informações do produto */
  } )

  const product = {
    priceId: price.id,
    //amount: (price.unit_amount / 100), //pega o valor inteiro, salva em centavos e dividi por 100
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),

  };

  return {
    props: {
      product,
    },

    /* revalidate é dizer quanto tempo em segundo eu quero que a page
    seja reconstruída novamente */
    revalidate: 60 * 60 * 24, // 24 hours, 86.400 segundos
  }
}