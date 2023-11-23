import './range.css'
import { useState, useRef, useEffect, useCallback } from 'react';


export default function RangeSlider({min, max, priceGap}) {

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const changeInputValue = (event) => {
    const value = event.target.value;

    if (event.target.id === 'min') {
      setMinVal(Math.min(value, max - priceGap));
    }
  
    if (event.target.id === 'max') {
      setMaxVal(value)
    }
  };

  const onBlurInput = (event) => {
    if(!event.target.value){
      if(event.target.id == 'min'){
        setMinVal(min)
      }else if(event.target.id == 'max'){
        setMaxVal(max)
      }
    }
  }

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="range">
        <div className="input-price">
          <div className="field-wrapper">
            <div className="field">
              <input type="number" id='min' value={minVal} onInput={changeInputValue} onBlur={onBlurInput}/>
              <span>Р</span>
            </div>
            <div className="field">
              <input type="number" id='max' value={maxVal} onInput={changeInputValue} onBlur={onBlurInput}/>
              <span>Р</span>
            </div>
          </div>
        </div>
        <div className="range-slider">
          <div ref={range} className="progress"></div>
          <div className="range-input">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - priceGap);
              setMinVal(value);
              minValRef.current = value;
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 && "5" }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + priceGap);
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className="thumb thumb--right"
          />
          </div>
        </div>
        
      </div>
  )
}


