import Header from '../../components/Header';
import { AimlHeroSection } from '@/components/ai-ml-program/aiml-hero-section'
import { FeaturesSection } from "@/components/ai-ml-program/features-section"
import { AimlCurriculumSection } from '@/components/ai-ml-program/aiml-curriculum-section'
import { AimlAudienceSection } from '@/components/ai-ml-program/aiml-audience-section'
import { AimlLearningFormat } from '@/components/ai-ml-program/aiml-learning-format'
import { AimlJourneySection } from '@/components/ai-ml-program/aiml-journey-section'
import { AimlStructuredSection } from '@/components/ai-ml-program/aiml-structured-section'
import { InstructorSection } from "@/components/ai-ml-program/instructor-section"
import { TestimonialsSection } from "@/components/ai-ml-program/testimonials-section"
import { AimlFaqSection } from '@/components/ai-ml-program/aiml-faq-section'
import { AimlCTASection } from "@/components/ai-ml-program/aiml-cta-section"
import Footer from '../../components/Footer';

export const metadata = {
  title: 'AI and ML Training Program | Dandes Academy',
  description: 'Learn the complete AI and ML path with live instructor-led classes, structured practice, and interview preparation.',
}

export default function AiMlPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f7f8fa' }}>
      <Header />
      <AimlHeroSection />
      <FeaturesSection />
      <AimlCurriculumSection />
      <AimlAudienceSection />
      <AimlLearningFormat />
      <AimlJourneySection />
      <AimlStructuredSection />
      <InstructorSection />
      <TestimonialsSection />
      <AimlFaqSection />
      <AimlCTASection />
      <Footer />
    </main>
  )
}
