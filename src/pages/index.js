import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
      <Layout home>
          <Head>
              <title>Comenzamos?</title>
          </Head>
          <h1 className={styles.title}>
              Comenzamos? <Link href="/features">temblores{"->"}</Link>
          </h1>
      </Layout>
  );
}

export const getStaticProps = async () => {
    return { props: { } };
}