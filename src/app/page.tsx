'use client';

import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from './page.module.css'
import {SigningStargateClient} from "@cosmjs/stargate";
import { Button } from 'antd';

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const initializeKeplr = async () => {
    const { keplr } = window as any;
    if (!keplr) {
      alert("Please install keplr extension");
    } else {
     
      //  await keplr.experimentalSuggestChain(this.getTestnetChainInfo())
      // Create the signing client
      const chainId = "cosmoshub-4";
    const offlineSigner =
        keplr.getOfflineSigner!(chainId)
    // const signingClient = await SigningStargateClient.connectWithSigner(
    //   "https://cosmos-rpc.publicnode.com:443",
    //     offlineSigner,
      // )
    
    const accounts = await offlineSigner.getAccounts();
    console.log('ACCOUNTS', accounts)
       const cosmJS =  await SigningStargateClient.connect(
        "https://cosmos-rpc.publicnode.com:443",
          accounts[0].address,
         //  offlineSigner
        );
        console.log({ accounts, cosmJS})
          
    //   const chainId = "cosmoshub-4";

    //   // Enabling before using the Keplr is recommended.
    //   // This method will ask the user whether to allow access if they haven't visited this website.
    //   // Also, it will request that the user unlock the wallet if the wallet is locked.
    //   await (window as any).keplr.enable(chainId);

    //   const offlineSigner = (window as any).keplr.getOfflineSigner(chainId);

    //   // You can get the address/public keys by `getAccounts` method.
    //   // It can return the array of address/public key.
    //   // But, currently, Keplr extension manages only one address/public key pair.
    //   // XXX: This line is needed to set the sender address for SigningCosmosClient.
    //   const accounts = await offlineSigner.getAccounts();
    //  // const cosmosjs = (await import('@cosmjs/stargate')).default;
    //   // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    //   setTimeout(() => {
    //     console.log('connecting....');
    //    // const cosmJS = stargate.SigningStargateClient;
    //    // const cosmJS = stargate.SigningStargateClient.connect(
    //     //   "https://lcd-cosmoshub.keplr.app/rest",
    //     //   accounts[0].address
    //     //   // offlineSigner
    //     // );
          
    //   }, 5000);
    //   console.log({
    //     accounts,
    //     // cosmJS
    //   });
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
      <Button onClick={()=>initializeKeplr()
      } >Connect</Button>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={''}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={''}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={''}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={''}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={''}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={''}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
