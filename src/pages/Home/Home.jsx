import Banner from '../../components/Home/Banner'
import HowItWorks from '../../components/Home/HowItWorks'
import SuccessStories from '../../components/Home/SuccessStories'
import TopScholarships from '../../components/Home/TopScholarships'
import TrustedBy from '../../components/Home/TrustedBy'
import TrustSection from '../../components/Home/TrustSection'

const Home = () => {
  return (
    <main>
      <Banner />
      <TopScholarships />
      <HowItWorks />
      <TrustSection />
      <SuccessStories />
      <TrustedBy />
    </main>
  )
}

export default Home
