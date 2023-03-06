import React, { useState, useEffect } from 'react';
import Select from 'react-tailwindcss-select';

const Onboarding = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState();
  const [role, setRole] = useState();
  const [reason, setReason] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch('/api/onboarding')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setIsOnboarded(data?.onboarded);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const onboardUser = () => {
    if (!company || !role || !reason) {
      setError('Please select all the fields');
      return;
    }
    fetch('/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company: company,
        role: role,
        reason: reason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsOnboarded(true);
        } else {
          setError('Sorry, Some unexpected error occurred. Please try again!');
        }
      });
  };

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          Please wait while we take you to yobulk...
        </div>
      ) : (
        <>
          {isOnboarded ? (
            children
          ) : (
            <div className="w-screen h-screen flex justify-center items-center">
              <form className="w-[50vw] h-[50vh] flex flex-col justify-center items-center gap-10">
                <h1 className="text-xl text-gray-700 font-bold">ONBOARDING</h1>
                <div>
                  <div className="text-base text-gray-700 my-2">
                    Which company do you work for?
                  </div>
                  <input
                    className="h-10 w-[260px] border rounded border-gray-400 active:outline-none focus:outline-none px-2 text-sm"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div class="inline-block relative w-64">
                  <div className="text-base text-gray-700 my-2">
                    Your role at company
                  </div>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.value)}
                    options={[
                      { value: 'Developer', label: 'Developer' },
                      { value: 'Sales', label: 'Sales' },
                      { value: 'Marketing', label: 'Marketing' },
                      {
                        value: 'Product_Management',
                        label: 'Product Management',
                      },
                      { value: 'Director_VP', label: 'Director / VP' },
                      { value: 'Founder_CXX', label: 'Founder / CXX' },
                    ]}
                  />
                </div>
                <div class="inline-block relative w-64">
                  <div className="text-base text-gray-700 my-2">
                    Reason for using YoBulk
                  </div>
                  <Select
                    value={reason}
                    onChange={(e) => setReason(e.value)}
                    options={[
                      {
                        value:
                          'I_am_looking_for_basic_CSV_importer_functionality',
                        label:
                          'I am looking for basic CSV importer functionality.',
                      },
                      {
                        value: 'I_want_to_explore_YoBulk_AI_features',
                        label: 'I want to explore YoBulk AI features.',
                      },
                      {
                        value:
                          'I_want_to_upload_large_CSV_files_and_get_it_cleaned',
                        label:
                          'I want to upload large CSV files and get it cleaned.',
                      },
                      {
                        value: 'I_am_looking_for_an_open_source_CSV_importer',
                        label: 'I am looking for an open source CSV importer.',
                      },
                      {
                        value:
                          'I_want_to_embed_a_CSV_importer_button_in_my_SaaS/WebApp',
                        label:
                          'I want to embed a CSV importer button in my SaaS/WebApp.',
                      },
                    ]}
                  />
                </div>
                <div className="text-sm text-red-500 my-2">{error}</div>
                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded-full text-sm mr-2"
                  onClick={onboardUser}
                >
                  Continue
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Onboarding;
