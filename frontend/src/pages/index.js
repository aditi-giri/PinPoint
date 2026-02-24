import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBarComponent from "@/Components/Navbar";
import ProfileList from "@/Components/ProfileList";


export default function Home() {
  return (
    <>
      <Head>
        <title>PinPoint</title>
        
      </Head>
      <NavBarComponent></NavBarComponent>
      <ProfileList></ProfileList>

    </>
  );
}
