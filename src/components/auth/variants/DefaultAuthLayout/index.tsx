'use client'
import React from 'react';
import SliderForm from './SliderForm';
// import Footer from 'components/footer/FooterAuthDefault';
function Default(props: { maincard: JSX.Element }) {
  const { maincard } = props;
  return (
    <div className="relative flex">
      <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-4 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-96 xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
        <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
         
          {maincard}
          <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
            <div
              className="absolute flex h-full w-full items-center justify-center bg-white text-brand-800 dark:bg-blue-50"
            >
              <div className="text-start">
                <h1 className="text-4xl font-bold mb-4">Let us help you run your <br /> Business</h1>
                <p className="mb-4">Simply dummy text of the printing and typesetting  <br /> industry simply dummy text</p>
               <SliderForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
