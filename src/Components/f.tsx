import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

function Selectmultidropdown() {
  const [options, setOptions] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  useEffect(() => {
    const getCountryData = async () => {
      const response = await fetch('https://static.my.ge/myauto/js/mans.json');
      const data = await response.json();

      const countryNames = data.map((item: { man_name: string }) => item.man_name);
      setCountry(countryNames);
      setOptions(countryNames);
    };

    getCountryData();
  }, []);

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            {/* <h3 className="mt-3">Select Multi Dropdown Checkbox in React js</h3> */}

            <form className="row g-3" method="post">
              <div className="col-md-5">
                <label className="form-label"> </label>
                <div className="text-dark">
                  <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                      console.log(event);
                    }}
                    onSelect={(event) => {
                      console.log(event);
                    }}
                    options={options}
                    showCheckbox
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Selectmultidropdown;
