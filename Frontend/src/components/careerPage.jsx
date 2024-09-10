import React, { useEffect, useState } from 'react';
import { Navbar, ScholarJobLogoGreen, Link ,Icon, Footer} from "../import/all_import.jsx";
import { getJobs, getOrganizationAddresses } from '../API/career_api.jsx';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    job_type: '',
    salary_min: '',
    salary: '',
    experience: '',
    category_id: '',
    organization_address: '' 
  });
  const [addresses, setAddresses] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      const { jobs, total } = await getJobs(filters, currentPage, itemsPerPage);
      setJobs(jobs);
      setTotalRecords(total);
    };

    fetchJobs();
  }, [filters, currentPage]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await getOrganizationAddresses();
      setAddresses(response.data);
    };

    fetchAddresses();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <header className="p-12 bg-white">
        <Navbar />
      </header>

      <section className="relative items-center flex min-h-[250px] mx-16 bg-gradient-to-tl from-customTeal-light/50 to-customTeal-dark/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Start your flourishing journey with us, ScholarJob!
          </h1>
          <div className="flex justify-center items-center mb-6">
            <input
              type="text"
              placeholder="Please input the position you want to find..."
              className="p-2 w-full max-w-md border rounded-lg text-gray-700"
              name="title"
              onChange={handleFilterChange}
            />
            <button 
              className="bg-white text-green-500 px-4 py-2 ml-2 rounded-lg"
              onClick={() => fetchJobs()}
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <select
              className="p-2 rounded-lg text-gray-700"
              name="job_type"
              onChange={handleFilterChange}
            >
              <option value="">Job Type</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select
              className="p-2 rounded-lg text-gray-700"
              name="experience"
              onChange={handleFilterChange}
            >
              <option value="">Experience</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3+ Years</option>
            </select>

            <select
              className="p-2 rounded-lg text-gray-700"
              name="salary"
              onChange={handleFilterChange}
            >
              <option value="">Salary</option>
              <option value="1000">&lt; 1000$</option>
              <option value="5000">1000$ - 5000$</option>
              <option value="5001">&gt; 5000$</option>
            </select>

            <select
              className="p-2 rounded-lg text-gray-700"
              name="category_id"
              onChange={handleFilterChange}
            >
              <option value="">Category</option>
              <option value="1">Accounting</option>
              <option value="2">Engineering</option>
              <option value="3">Software Development</option>
              <option value="4">Marketing</option>
            </select>
            <select
              className="p-2 rounded-lg text-gray-700"
              name="organization_address"
              onChange={handleFilterChange}
            >
              <option value="">Select Location</option>
              {addresses.map((address, idx) => (
                <option key={idx} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <br />

      <div className="flex justify-center mb-6">
        <button className="px-4 py-2 bg-gradient-to-tl from-customTeal-light/50 to-customTeal-dark/80 text-white rounded-lg">
          Recommended
        </button>
        <button className="px-4 py-2 bg-white text-green-500 rounded-lg mx-2">
          Tops
        </button>
        <button className="px-4 py-2 bg-white text-green-500 rounded-lg">
          News
        </button>
      </div>
      <section className="relative items-center flex min-h-[250px] mx-16 bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <Link to={`/career/${job.id}`} key={idx} className="no-underline">
                <div className="relative bg-white rounded-lg shadow-md p-4 flex">
                  <img
                    src={job.image_url || ScholarJobLogoGreen}
                    className="w-32 h-32 object-cover rounded-lg mr-5"
                    alt="ScholarJob Logo"
                  />                
                  {job.urgent == 1 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg">
                      Urgent!
                    </span>
                  )}
                  

                  <div className="flex flex-col justify-between">
                    <div className="ml-3">
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p>{job.organization?.name}</p>
                    </div>
                    <div className="ml-3">
                      <p>
                        <strong>Job Type:</strong> {job.job_type}
                      </p>
                      <p>
                        <strong>Salary:</strong> {job.salary}
                      </p>
                      <p>
                        <strong>Available position:</strong> {job.available_position} pax
                      </p>
                    </div>
                    <div className="ml-3 mt-2 text-gray-600">
                      <p>
                        <strong>Location:</strong> {job.organization.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <div className="flex justify-center my-6">
        <nav aria-label="Pagination">
          <div className="py-2 shadow-2xl rounded-full">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  className="mx-3 text-customTeal p-1 rounded-full hover:bg-customTeal hover:text-white"
                >
                  <Icon
                    icon="ic:round-less-than"
                    className="w-[28px] h-[28px]"
                  />
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1.5 mx-4 leading-tight rounded-full ${
                      currentPage === index + 1
                        ? "text-white bg-customTeal"
                        : "text-gray-500 bg-white"
                    } hover:bg-customTeal hover:text-white`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
                  }
                  className="mx-3 text-customTeal p-1 rounded-full hover:bg-customTeal hover:text-white"
                >
                  <Icon
                    icon="ic:round-greater-than"
                    className="w-[28px] h-[28px]"
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CareerPage;
