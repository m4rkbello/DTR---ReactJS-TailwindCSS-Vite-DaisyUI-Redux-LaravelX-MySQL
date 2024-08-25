/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//REDUXISM
import { fetchDeductions, addDeduction, updateDeduction, deactivateDeduction, searchDeduction   } from '../../../redux/actions/deductionAction';
//DEDUCTIONS MODALS
import AddDeductionModal from '../../modals/deductions/AddDeductionModal';
import DeactivateDeductionModal from '../../modals/deductions/DeactivateDeductionModal';
//ICONS
import { FcFolder, FcOpenedFolder, FcPlus, FcSalesPerformance, FcOvertime, FcSearch, FcPrevious, FcViewDetails, FcEmptyTrash, FcNext } from "react-icons/fc";
//TOASTER
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deduction = (props) => {

//deduction.id gamit useParams / matchParams
const {deductionId} = useParams;

//DEDUCTIONS USESTATES
  const [isAddDeductionDetailsModal, setIsAddDeductionDetailsModal] = useState(false);
  const [isDeactivateDeductionModal, setIsDeactivateDeductionModal] = useState(false);
  const [selectedDeductionId, setSelectedDeductionId] = useState(null);
  const [searchQueryDeduction, setSearchQueryDeduction] = useState('');
  const [currentPageDeduction, setCurrentPageDeduction] = useState(1);
  const [itemsPerPageDeduction, setItemsPerPageDeduction] = useState(10);





  return (
    <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 shadow-slate-900/100 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg'>
    

    {/***
      
      <AddDeductionModal
     isOpen={isAddOvertimeDetailsModal}
     onClose={() => setIsAddOvertimeDetailsModal(false)}
     addOvertime={props.addOvertime}
     fetchOvertimes={props.fetchOvertimes}
   />
 
   <DeactivateDeductionModal
   isOpen={isDeactivateOvertimeModal}
   onClose={() => setIsDeactivateOvertimeModal(false)}
   deactivateOvertime={confirmDeactivateRate}
   />
      */}

    <div className="flex flex-col bg-transparent mb-10 shadow-slate-900/100" >
        <div className="flex items-center text-sm breadcrumbs">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className='flex items-center hover:text-white'>
                <FcPrevious style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/overtimes" className='flex items-center hover:text-white'>
                <FcFolder
                  style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Overtimes</span>
              </Link>
            </li>
            <li>
              <Link to="" className='flex items-center hover:text-white'>
                <FcOpenedFolder style={{ height: "2rem", width: "2rem" }} />
                <span className="ml-2">Data</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
        <ToastContainer />
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
          <div className='glass shadow-slate-900/100'>
            <div className="grid grid-cols-3 items-center mt-10 mb-10 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-lg">
              <div>
                <span className="inline-grid grid-cols-3 gap-4 py-5">
                  <div className="p-3 flex justify-start">
                    <input
                      type="text"
                      placeholder="Search"
                  
                      className="border-b-4 bg-transparent text-md rounded text-black custom-placeholder-text-color"
                    />
                  </div>
                  <div className="p-3 flex justify-end">
                    <FcSearch style={{ height: "2rem", width: "2rem" }} />
                  </div>
                </span>
              </div>
              <div className="pb-5 pt-5 flex justify-center">
                <h3 className="font-bold text-4xl text-black">OVERTIMES LIST</h3>
              </div>
              <div className="p-3 flex justify-end">
                <FcPlus
           
                  style={{ height: "3rem", width: "3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col items-center justify-center">

          {/***
            
            {props.loading && props.loading ? (
            */}

              <div className="flex flex-col gap-4 w-full max-w-5xl ps-2 pe-2 mt-32 mb-32">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-6 w-36"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
              </div>

              {/***
                
              ) : filteredOvertimes.length === 0 ? (
                */}


              <div className="mockup-browser bg-base-300 border mt-36 mb-36">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://markbello.com</div>
                </div>
                <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                  style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                >
                  <b>
                    AYAW NA PANGITAA ANG <u>{searchQueryOvertime}</u> KAY WALA!
                  </b>
                </span></div>
              </div>

              {/***
                
              ) : currentOvertimes?.length > 0 ? (
                */}
              <div className="w-full max-w-5xl">
                <table className="table glass w-full border-2 border-black">
                  <thead className="text-red">
                    <tr className="md:table-row" style={{ fontSize: "17px", backgroundColor: 'black', color: "white" }}>
                      <th className="md:table-cell text-white"></th>
                      <th className="md:table-cell text-white">NAME</th>
                      <th className="md:table-cell text-white">AMOUNT</th>
                      <th className="md:table-cell text-white">DETAILS</th>
                      <th className="md:table-cell text-white">DESCRIPTION</th>
                      <th className="md:table-cell text-white">DEPARTMENT</th>
                      <th className="md:table-cell text-white">ACTION</th>
                    </tr>
                  </thead>
                  {/***

                    <tbody className='text-black'>
                      {currentOvertimes.map((item) => (
                        item.overtime_status_id !== 0 && (
                          <tr className="md:table-row"
                            key={item.id}
                          >
                            <td className="md:table-cell"><FcOvertime style={{ fontSize: "40px", color: "transparent" }} /></td>
                            <td className="md:table-cell">{item.overtime_name}</td>
                            <td className="md:table-cell">
                              <span>&#8369;</span>
                              <b>{item.overtime_rate_per_hour}</b>
                            </td>
                            <td className="md:table-cell">{item.overtime_hour}</td>
                            <td className="md:table-cell">{item.overtime_description}</td>
                            <td className="md:table-cell">{item.overtime_description}</td>
                            <td className="md:table-cell">
                              <div className="flex items-center space-x-2">
                                <Link to={`/admin/overtime/edit/${item.id}`}>
                                  <FcViewDetails
                                    style={{ height: "2rem", width: "2rem" }}
                                  />
                                </Link>
  
                                <FcEmptyTrash
                                  onClick={() => handleDeactivateRate(item.id)}
                                  style={{ height: "2rem", width: "2rem" }}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>

                      */}
                </table>
                <div className="flex justify-center mt-4 mb-4">
                  <div className="join grid grid-cols-2">
                    <button
                      className="join-item btn btn-outline  glass"
                      onClick={() => handlePageChange(currentPageOvertime - 1)}
                      disabled={currentPageOvertime === 1}
                    >
                      <FcPrevious
                        style={{ height: "2rem", width: "2rem" }}
                      /> Previous
                    </button>
                    <button
                      className="join-item btn btn-outline glass"
                      onClick={() => handlePageChange(currentPageOvertime + 1)}
                      disabled={currentPageOvertime === totalPages}
                    >
                      Next
                      <FcNext
                        style={{ height: "2rem", width: "2rem" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/***
                
              ) : (
  
                <div className="mockup-browser bg-base-300 border mt-36 mb-36">
                  <div className="mockup-browser-toolbar">
                    <div className="input">https://markbello.com</div>
                  </div>
                  <div className="bg-base-200 flex justify-center px-4 py-16">        <span
                    style={{ fontSize: '30px', fontWeight: 'Bolder' }}
                  >
                    <b>
                      AYAW NA PANGITAA ANG <u>{searchQueryOvertime}</u> KAY WALA!
                    </b>
                  </span></div>
                </div>
              )}
                */}

            
          </div>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    deductionData: state.deductionState,
    loading: state.deductionState.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeductions: () => dispatch(fetchDeductions()),
    addDeduction: () => dispatch(addDeduction()),
    updateDeduction: () => dispatch(updateDeduction()),
    deactivateDeduction: () => dispatch(deactivateDeduction()),
    searchDeduction: () => dispatch(searchDeduction()),


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Deduction);