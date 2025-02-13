/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerEmployee } from '../../redux/actions/employeeAction';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllRegions,
  getAllProvinces,
  getMunicipalitiesByProvince,
  getBarangaysByMunicipality,
 
} from "@aivangogh/ph-address";

const EmployeeRegister = ({ registerEmployee }) => {
  const [employee, setEmployee] = useState({
    employee_firstname: '',
    employee_lastname: '',
    employee_email: '',
    employee_contact_no: '',
    employee_password: '',
    employee_confirm_password: '',
    employee_barangay: '',
    employee_municipality: '',
    employee_province: '',
    employee_region: '',
    employee_civil_status_id: '',
    employee_position: '',
    employee_role: '',
    employee_department_id: '',
    employee_status_id: '',
    employee_image: '',
    employee_qrcode: '',
    employee_sss_no: '',
    employee_pagibig_no: '',
    employee_philhealth_no: '',
    employee_tin_no: '',
  });

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [municipalityList, setMunicipalityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionsList = await getAllRegions();
        setRegionList(regionsList);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      if (selectedRegion) {
        try {
          const provincesList = await getAllProvinces(selectedRegion);
          setProvinceList(provincesList);
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      } else {
        setProvinceList([]);
      }
    };
    fetchProvinces();
  }, [selectedRegion]);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedProvince) {
        try {
          const municipalitiesList = await getMunicipalitiesByProvince(selectedProvince);
          setMunicipalityList(municipalitiesList);
        } catch (error) {
          console.error("Error fetching municipalities:", error);
        }
      } else {
        setMunicipalityList([]);
      }
    };
    fetchMunicipalities();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchBarangays = async () => {
      if (selectedMunicipality) {
        try {
          const barangaysList = await getBarangaysByMunicipality(selectedMunicipality);
          setBarangayList(barangaysList);
        } catch (error) {
          console.error("Error fetching barangays:", error);
        }
      } else {
        setBarangayList([]);
      }
    };
    fetchBarangays();
  }, [selectedMunicipality]);

  const handleRegisterUserRequestAndResponse = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (employee.employee_password !== employee.employee_confirm_password) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      await registerEmployee({
        ...employee,
        employee_barangay: selectedBarangay,
        employee_municipality: selectedMunicipality,
        employee_province: selectedProvince,
        employee_region: selectedRegion,
      });
      // navigate('/success');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || "Registration failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-full drop-shadow-xl">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 glass drop-shadow-xl">
        <form className="p-6 space-y-6 bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-700 border-t-8 border-b-8 border-white rounded-lg shadow-lg" onSubmit={handleRegisterUserRequestAndResponse}>
          <h2 className="text-3xl font-semibold text-center text-white">Employee Register</h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 drop-shadow-xl">

            {/* First Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">First Name</span>
              </label>
              <input
                type="text"
                name="employee_firstname"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_firstname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Middle Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Middle Name</span>
              </label>
              <input
                type="text"
                name="employee_middlename"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_middlename}
                onChange={handleChange}
              />
            </div>

            {/* Last Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Last Name</span>
              </label>
              <input
                type="text"
                name="employee_lastname"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_lastname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Extension Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Extension Name</span>
              </label>
              <input
                type="text"
                name="employee_extensionname"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_extensionname}
                onChange={handleChange}
              />
            </div>

            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Username</span>
              </label>
              <input
                type="text"
                name="employee_username"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birthdate Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Birthdate</span>
              </label>
              <input
                type="date"
                name="employee_birthdate"
                className="input input-bordered w-full glass text-white"
                value={employee.employee_birthdate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Civil Status Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Civil Status</span>
              </label>
              <select
                name="employee_civil_status_id"
                value={employee.employee_civil_status_id}
                onChange={handleChange}
                className="input input-bordered w-full glass text-violet-700"
                required
              >
                <option value="">Select Civil Status</option>
                <option value="1">Single</option>
                <option value="2">Married</option>
                <option value="3">Separated</option>
                <option value="4">Widow</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Email</span>
              </label>
              <input
                type="email"
                name="employee_email"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Contact Number Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Contact Number</span>
              </label>
              <input
                type="text"
                name="employee_contact_no"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_contact_no}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Password</span>
              </label>
              <input
                type="password"
                name="employee_password"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Confirm Password</span>
              </label>
              <input
                type="password"
                name="employee_confirm_password"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Region Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Region</span>
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="glass input input-bordered w-full text-violet-700"
              >
                <option value="">Select Region</option>
                {regionList.map((region) => (
                  <option key={region.name} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Province Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Province</span>
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="glass input input-bordered w-full text-violet-700"
              >
                <option value="">Select Province</option>
                {provinceList.map((province) => (
                  <option key={province.name} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Municipality Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Municipality</span>
              </label>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="glass input input-bordered w-full text-violet-700"
              >
                <option value="">Select Municipality</option>
                {municipalityList.map((municipality) => (
                  <option key={municipality.name} value={municipality.code}>
                    {municipality.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Barangay Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Barangay</span>
              </label>
              <select
                value={selectedBarangay}
                onChange={(e) => setSelectedBarangay(e.target.value)}
                className="glass input input-bordered w-full text-violet-700"
              >
                <option value="">Select Barangay</option>
                {barangayList.map((barangay) => (
                  <option key={barangay.name} value={barangay.code}>
                    {barangay.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Other fields (SSS No, Pagibig No, PhilHealth No, TIN No) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">SSS No.</span>
              </label>
              <input
                type="text"
                name="employee_sss_no"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_sss_no}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">Pagibig No.</span>
              </label>
              <input
                type="text"
                name="employee_pagibig_no"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_pagibig_no}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">PhilHealth No.</span>
              </label>
              <input
                type="text"
                name="employee_philhealth_no"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_philhealth_no}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg sm:text-xl">TIN No.</span>
              </label>
              <input
                type="text"
                name="employee_tin_no"
                className="glass input input-bordered w-full text-white"
                value={employee.employee_tin_no}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn drop-shadow-lg bg-gradient-to-r from-white to-sky-500 hover:from-white hover:to-violet-800 text-black text-xl sm:text-2xl"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-spinner text-accent"></span> : 'Register'}
              </button>
            </div>
          </div>
        </form> 

      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  registerEmployee: (employee) => dispatch(registerEmployee(employee)),
});

export default connect(null, mapDispatchToProps)(EmployeeRegister);
