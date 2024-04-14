import React from 'react';
import Footer from '../components/AppFooter';
const About = () => {
  
  return (
    // <div className="home-container">
    //   <h1>Welcome to IACSD</h1>
    //   <p>
    //     This is the website for Library Group Management.
    //   </p>
    //   <p>
    //     Who has carrirng which book can easily analyse.
    //   </p>
    //   <p>
    //     Feel free to explore the rest of the site by navigating through the links in the navigation bar.
    //   </p>

    //   <p>
    //     step 1: First register and create new acoount with your email
    //     and prn no.
    //     step 2: Then create group id.
    //     step 3: Ask your group member to register and join with that 
    //         group id.
    //   </p>
    // </div>

    <div style={{ padding: '20px' }}>
    <h1>Welcome to IACSD</h1>
    <p>
        This is the website for Library Group Management.
    </p>
    <p>
        Who has carrying which book can easily analyze.
    </p>
    <p>
        Feel free to explore the rest of the site by navigating through the links in the navigation bar.
    </p>

    <h2>How to Get Started:</h2>
    <ol>
      <li>First register and create a new account with your email and PRN number.</li>
      <li>Then create a group ID as year + batch month + groupnumber like eg. 20240301.</li>
      <li>Ask your group members to register and join with that group ID.</li>
    </ol>
    <Footer />
  </div>
  );
};

export default About;
