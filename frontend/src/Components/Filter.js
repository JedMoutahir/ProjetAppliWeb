import React from 'react'
import './Filter.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FilterOptions = ({ keywords, setKeywords }) => {
  const Tag = [
    "Animal",
    "People",
    "Nature",
    "Buildings",
    "Food",
  ];
  const options = [
    {
      title: "Tag",
      options: [
        "Animal",
        "People",
        "Nature",
        "Buildings",
        "Food",
      ],
      height: 190
    },
    {
      title: "Location",
      options: ["Indoor", "Outdoor"],
      height: 40
    },

  ];
  const handleChange = (e) => {
    if (e.target.checked) {
      setKeywords(prev => ([...prev, e.target.name]));
    }
    else {
      setKeywords(prev => prev.filter(p => e.target.name !== p));
    }
  }

  return (
    <div className="filter">
      <div className="items">
        <div className="text1">Filters</div>
      </div>
      {options.map((option, idx) => (
        <div key={idx}>
          <hr className="mt-5" />
          <div>
            <div className="option">{option.title}</div>

            <div className="mt-4" style={{ height: ` ${option.height}px` }}>
              {option.options.map((name, idx) => (
                <div key={idx} className="space-x-2">
                  <div className="inputOption">
                    <FormControlLabel 
                    sx = {{
                      marginBottom : '-30px',
                    }} 
                    required 
                    control={
                    <Checkbox 
                    sx = {{
                      '&.Mui-checked': {
                        color: "#78909C",
                      },
                    }} 
                    name = {name} 
                    onChange={handleChange} />
                  } 
                    label={name } 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FilterOptions