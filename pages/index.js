import Hero from "../components/Hero";
import RootLayout from "../Layout/RootLayout";
import { ROOT_ROUTE } from "../localization";

const Home = () => {
  return (
    <RootLayout source={ROOT_ROUTE}>
      <Hero />
    </RootLayout>
  );
};

export default Home;
