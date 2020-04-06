import React from 'react';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';

const mainFeaturedPost = {
  title: 'Life in Quarantine',
  description:
      "We’re not what you might be looking for. We offer neither expertise or guidance. Merely an opportunity to " +
      "relieve yourself of a thought, observation or a concern. A place to take a breath amidst the call for thousands " +
      "of additional ventilators. Whether you’re suffering from conjugal claustrophobia, economic angst or an insatiable " +
      "need to acquire more toilet paper, expression may provide some relief; a way of feeling less alone in a crowd. " +
      "We welcome idle speculations, well mannered annoyance, even ingenious theories as this virus may be the fiendish spawn of the toilet paper industry.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};

export default function Blog() {
  return (
    <Container maxWidth="lg">
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
    </Container>
  );
}
