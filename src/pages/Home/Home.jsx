import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import HomeMeals from "../../components/Home/HomeMeals";
import HomeReview from "../../components/Home/HomeReview";
import VideoShowcase from "../../components/Home/VideoShowcase";
import FeaturesSection from "../../components/Home/FeaturesSection";
import CategoriesSection from "../../components/Home/CategoriesSection";
import StatisticsSection from "../../components/Home/StatisticsSection";
import NewsletterSection from "../../components/Home/NewsletterSection";
import FAQSection from "../../components/Home/FAQSection";
import CTASection from "../../components/Home/CTASection";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <FeaturesSection />
      <HomeMeals />
      <CategoriesSection />
      <VideoShowcase />
      <StatisticsSection />
      <HomeReview />
      <NewsletterSection />
      <FAQSection />

      <CTASection />
    </div>
  );
};

export default Home;
