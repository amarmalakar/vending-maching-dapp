import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vending Machine App</title>
        <meta name="description" content="A Blockchain Vending Machine App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/vending-machine">vending machine</Link>
        </h1>
      </main>
    </div>
  )
}
