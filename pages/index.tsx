import Stories from "../src/components/Stories";
import Head from "next/head";

const Index = () => (
  <>
    <Head>
      <title>Hacker News Stories</title>
    </Head>
    <div className="container">
      <Stories />
    </div>
  </>
);

export default Index;
