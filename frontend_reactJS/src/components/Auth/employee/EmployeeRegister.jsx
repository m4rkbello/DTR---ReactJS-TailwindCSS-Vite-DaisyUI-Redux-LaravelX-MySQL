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

    console.log(getMunicipalitiesByProvince("071200000"));
    console.log(getBarangaysByMunicipality("072217000"));

  const [localFirstName, setLocalFirstName] = useState("");
  const [localLastName, setLocalLastName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localContactNo, setLocalContactNo] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [localConfirmPassword, setLocalConfirmPassword] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [municipalityList, setMunicipalityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load all regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionsList = await getAllRegions();
        setRegionList(regionsList);
        console.log("data sa regionsList", regionsList);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  // Load provinces when a region is selected
  useEffect(() => {
    const fetchProvinces = async () => {
      if (selectedRegion) {
        try {
          const provincesList = await getAllProvinces(selectedRegion);
          console.log("data sa provincesList", provincesList);
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

  // Load municipalities when a province is selected
  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedProvince) {
        try {
          const municipalitiesList = await getMunicipalitiesByProvince(selectedProvince);
          setMunicipalityList(municipalitiesList);
          console.log("data sa muncipyo", municipalitiesList);
        } catch (error) {
          console.error("Error fetching municipalities:", error);
        }
      } else {
        setMunicipalityList([]);
      }
    };
    fetchMunicipalities();
  }, [selectedProvince]);

  // Load barangays when a municipality is selected
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

    if (localPassword !== localConfirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      await registerEmployee({
        employee_firstname: localFirstName,
        employee_lastname: localLastName,
        employee_email: localEmail,
        employee_contact_no: localContactNo,
        employee_password: localPassword,
        password_confirmation: localConfirmPassword,
        employee_barangay: selectedBarangay,
        employee_municipality: selectedMunicipality,
        employee_province: selectedProvince,
        employee_region: selectedRegion,
      });
      navigate('/success');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || "Registration failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="artboard phone-2 flex flex-col items-center justify-center w-full max-w-screen-xl mx-4">
        <div className="card w-full max-w-5xl shadow-md bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 border-t-4 border-b-4 border-black">
          <form className="card-body" onSubmit={handleRegisterUserRequestAndResponse}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Region Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-black">Region</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="input input-bordered glass"
                >
                  <option value="">Select Region</option>
                  {regionList.map((region) => (
                    <option key={region.name} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Province Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-black">Province</span>
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="input input-bordered glass"
                  disabled={!selectedRegion}
                >
                  <option value="">Select Province</option>
                  {provinceList.map((province) => (
                    <option key={province.name} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Municipality Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-black">Municipality</span>
                </label>
                <select
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="input input-bordered glass"
                  disabled={!selectedProvince}
                >
                  <option value="">Select Municipality</option>
                  {municipalityList.map((municipality) => (
                    <option key={municipality.name} value={municipality.name}>
                      {municipality.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Barangay Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-black">Barangay</span>
                </label>
                <select
                  value={selectedBarangay}
                  onChange={(e) => setSelectedBarangay(e.target.value)}
                  className="input input-bordered glass"
                  disabled={!selectedMunicipality}
                >
                  <option value="">Select Barangay</option>
                  {barangayList.map((barangay) => (
                    <option key={barangay.bgy_code} value={barangay.bgy_code}>
                      {barangay.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className={`btn btn-primary ${isLoading && 'loading'}`} type="submit" disabled={isLoading}>
                Register
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = { registerEmployee };

export default connect(null, mapDispatchToProps)(EmployeeRegister);
