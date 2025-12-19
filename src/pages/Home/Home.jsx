import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import HomeMeals from "../../components/Home/HomeMeals";
import HomeReview from "../../components/Home/HomeReview";
import VideoShowcase from "../../components/Home/VideoShowcase";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <HomeMeals />

      <VideoShowcase />
      <HomeReview />
    </div>
  );
};

export default Home;
