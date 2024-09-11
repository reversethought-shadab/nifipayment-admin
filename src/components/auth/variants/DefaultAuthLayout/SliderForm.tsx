'use client'
import React, { useState, useEffect } from 'react';
// const [currentIndex, setCurrentIndex] = useState(1);
const SliderForm = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Moved inside the component
    const slides = [
      '/form.svg',
      '/form.svg',
      '/form.svg',
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 3000); // Adjust time here for smoother transitions if needed
  
      return () => clearInterval(interval);
    }, [slides.length]);
  
    return (
      <div className="flex justify-start mt-10">
        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-full h-[300px]"> 
                <img src={slide} alt={`Slide ${index}`} className="w-[400px] h-full object-cover" /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SliderForm;
