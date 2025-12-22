import Banner from '../../components/Home/Banner'
import HowItWorks from '../../components/Home/HowItWorks'
import SuccessStories from '../../components/Home/SuccessStories'
import TopScholarships from '../../components/Home/TopScholarships'
import TrustSection from '../../components/Home/TrustSection'

const Home = () => {
  return (
    <main>
      <Banner />
      <TopScholarships />
      <HowItWorks />
      <TrustSection />
      <SuccessStories />
    </main>
  )
}

export default Home
