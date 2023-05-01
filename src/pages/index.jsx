import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Head from "next/head";
import Image from "next/image";

export async function getServerSideProps() {
  let res;

  res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const { setup, punchline } = await res.json();

  res = await fetch("https://api.quotable.io/random");
  const { content, author } = await res.json();

  res = await fetch("https://catfact.ninja/fact");
  const { fact } = await res.json();

  return {
    props: {
      data: {
        // joke
        setup,
        punchline,

        // quotes
        content,
        author,

        // fact
        fact,
      },
    },
  };
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Find Your Happiness</title>
      </Head>
      <Header />
      <Card data={data} />
      <Footer />
    </>
  );
}
