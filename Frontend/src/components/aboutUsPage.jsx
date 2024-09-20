import React, { useEffect, useState } from 'react';
import { Navbar, Footer, WorkImage, GraduateImage, ScholarJobLogoGreen } from '../import/all_import.jsx';

const AboutUsPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/about-us')
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error fetching About Us data:', error));
    
    fetch('http://localhost:8000/api/team-members')
      .then(response => response.json())
      .then(data => setTeamMembers(data))
      .catch(error => console.error('Error fetching Team Members data:', error));
  }, []);

  return (
    <div>
      <header className="p-12">
        <Navbar />
      </header>
      <section className="relative items-center flex mx-16 bg-gradient-to-tl from-customTeal-light/50 to-customTeal-dark/80 text-white rounded-lg">
        <div className="mb-4">{aboutData?.mission ? <span dangerouslySetInnerHTML={{ __html: aboutData.mission }} /> : 'Our Mission'}</div>
      </section>

      <section className="mt-12 flex flex-col md:flex-row justify-between items-center">
        <div className="pl-16 w-2/3">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="pr-6">
            {aboutData?.mission ? <span dangerouslySetInnerHTML={{ __html: aboutData.mission }} /> : 'Loading mission...'}
          </p>
        </div>
        <div className="w-1/2 flex justify-end pt-4 pr-16">
          <img
            src={WorkImage}
            alt="Mission Image"
            className="w-auto max-w-md rounded-lg"
          />
        </div>
      </section>

      <section className="mt-12 flex flex-col md:flex-row justify-between items-center">
        <div className="w-1/2 flex justify-start ml-16 pt-4">
          <img
            src={GraduateImage}
            alt="Vision Image"
            className="w-auto max-w-md rounded-lg"
          />
        </div>
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="pr-16">
            {aboutData?.vision ? <span dangerouslySetInnerHTML={{ __html: aboutData.vision }} /> : 'Loading vision...'}
          </p>
        </div>
      </section>

      <section className="mt-16 relative flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Our Team</h2>
        <div className="border-t border-4 w-12 mt-4 mb-8 border-customTeal rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-md rounded-lg text-center w-full sm:w-80 md:w-72 lg:w-64 p-6 mb-10 hover:scale-105 hover:shadow-2xl transition-transform duration-300 transform ease-in-out"
            >
              <img
                src={member.image_url || ScholarJobLogoGreen}
                alt={member.name}
                className="rounded-full w-36 h-36 mx-auto mb-4 object-cover border-4 border-customTeal"
              />
              <h3 className="font-semibold text-xl text-gray-800 mb-2">{member.name}</h3>
              <p className="text-customTeal font-medium mb-1">{member.position}</p>
              <p className="text-gray-500 text-sm mb-3">{member.description}</p>
              <p className="text-gray-400 text-xs">{member.contact}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12">
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUsPage;
