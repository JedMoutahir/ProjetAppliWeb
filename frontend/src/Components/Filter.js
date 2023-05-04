import React from 'react'
import './Filter.css';

const FilterOptions = ({keywords,setKeywords}) => {
  const Tag = [
      "Animals",
      "People",
      "Nature", 
      "Buildings", 
      "Food",
    ];
    const options = [
      {
        title: "Tag",
        options: [
          "Animals",
          "People",
          "Nature", 
          "Buildings", 
          "Food",
        ],
        height : 150
      },
      {
        title: "Location",
        options: ["Indoor", "Outdoor"],
        height : 40
      },
     
    ];
    const handleChange = (e)=>{
      if (e.target.checked) {
        setKeywords(prev=>([...prev,e.target.name]));
      }
      else {
        setKeywords(prev=>prev.filter(p=>e.target.name!==p));
      }
    }
    
return (
  <div className="filter">
  <div className="items">
    <div className="text1">Filters</div>
    <div className="text2">Clear All</div>
  </div>
  {options.map((option,idx) => (
    <div key={idx}>
      <hr className="mt-5" />
      <div>
        <div className="option">{option.title}</div>
        <div className="mt-2">
          <input
            type="text"
            className="border"
            placeholder={`Search by ${option.title}`}
          />
        </div>
        <div className="mt-4" style={{height :` ${option.height}px`}}>
          {option.options.map((name,idx) => (
            <div key={idx} className="space-x-2">
              <div className="inputOption">
                <input
                  type="checkbox"
                  name={name}
                  onChange={handleChange}
                  className="checkbox"
                />
              </div>
              <div className="names">{name}</div>
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