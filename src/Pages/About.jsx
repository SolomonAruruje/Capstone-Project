import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import OurStory from '../Components/OurStory.jsx';
import Services2 from '../Components/Services2.jsx';
import Services from '../Components/Services.jsx';
import Team from '../Components/Team.jsx'


const About = () => {
  return (
    <div>
        <Navbar/>
        <OurStory/>
        <Services2/>
        <Team/>        
        <Services/>
        <Footer/>
    </div>
  )
}

export default About