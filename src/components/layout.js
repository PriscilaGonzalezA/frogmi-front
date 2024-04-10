import Head from 'next/head';
import styles from '../styles/layout.module.css';
import Link from 'next/link';


export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Volver al home</Link>
                </div>
            )}
        </div>
    );
}