import Index from '../components/LandingPage/Hero';
import Example from '../components/LandingPage/Team';
import Testimonials from '../components/LandingPage/Testimonials';
import Footer from '../components/LandingPage/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Index />
      
      <div id="example" className="flex-grow">
        <Example />
      </div>

      <div id="testimonials" className="flex-grow">
        <Testimonials />
      </div>
      
      <Footer />
    </div>
  );
}

export default LandingPage;
