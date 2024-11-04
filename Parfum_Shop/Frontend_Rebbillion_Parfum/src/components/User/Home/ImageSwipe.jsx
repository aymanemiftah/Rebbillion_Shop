import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; // استيراد الأيقونات
import '../../../CSS/Home.css'
import scratch from '../../../image/scratch.png'

const ImageSwipe = () => {
  const images = [
    'https://images6.alphacoders.com/641/thumb-1920-641465.jpg',
    'https://wallpaperaccess.com/full/6781196.jpg',
    'https://media.gqitalia.it/photos/5cae102826f5099c19064ad9/16:9/w_1920,c_limit/FY19_ZEGNA_ESSENZE_EDP_COLLECTION.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000); 
    return () => clearInterval(interval); 
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <div className=' max-sm:hidden w-full sm:max-h-[500px] sm:min-h-[500px] md:max-h-[650px] md:min-h-[650px] lg:max-h-[750px] lg:min-h-[750px] xl:max-h-[900px] xl:min-h-[900px] flex'>
      <div className='w-1/2 sm:max-h-[500px] sm:min-h-[500px] md:max-h-[650px] md:min-h-[650px] lg:max-h-[750px] lg:min-h-[750px] xl:max-h-[900px] xl:min-h-[900px]'>
          <div className='relative flex justify-center items-center sm:min-w-[450px] sm:max-w-[450px] sm:min-h-[340px] sm:max-h-[340px] md:min-w-[550px] md:max-w-[550px] md:min-h-[430px] md:max-h-[430px] lg:min-w-[700px] lg:max-w-[700px] lg:min-h-[500px] lg:max-h-[500px] xl:max-w-[900px] xl:min-w-[900px] xl:max-h-[650px] xl:min-h-[650px] bg-white md:ml-5 lg:ml-14 mt-20 xl:ml-32 slide-in-left'>
            <div className=' sm:min-w-[430px] sm:max-w-[430px] sm:min-h-[320px] sm:max-h-[320px] md:min-w-[530px] md:max-w-[530px] md:min-h-[410px] md:max-h-[410px] lg:min-w-[680px] lg:max-w-[680px] lg:max-h-[480px] lg:min-h-[480px] xl:max-w-[880px] xl:min-w-[880px] xl:max-h-[630px] xl:min-h-[630px]'>
              <img
                src={'https://static.wixstatic.com/media/d99169_4713498713044ad7bf124ab3d6b0c51c~mv2_d_3840_5760_s_4_2.jpg/v1/crop/x_0,y_670,w_3840,h_2792/fill/w_1060,h_761,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d99169_4713498713044ad7bf124ab3d6b0c51c~mv2_d_3840_5760_s_4_2.jpg'}
                className="sm:min-w-[430px] sm:max-w-[430px] sm:min-h-[320px] sm:max-h-[320px] md:min-w-[530px] md:max-w-[530px] md:min-h-[410px] md:max-h-[410px] lg:min-w-[680px] lg:max-w-[680px] lg:max-h-[480px] lg:min-h-[480px] xl:max-w-[880px] xl:min-w-[880px] xl:max-h-[630px] xl:min-h-[630px]"
              />
            </div>
          </div>
          <div className={`relative sm:min-w-[400px] sm:max-w-[400px] sm:min-h-[120px] sm:max-h-[120px] md:min-w-[500px] md:max-w-[500px] md:min-h-[150px] md:max-h-[150px] lg:min-w-[700px] lg:max-w-[700px] lg:min-h-[150px] lg:max-h-[150px] xl:min-w-[1000px] xl:max-w-[1000px] xl:min-h-[150px] xl:max-h-[150px]  -mt-20  ml-4 lg:ml-8 xl:ml-11 ` } style={{ backgroundImage: `url(${scratch})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </div>
        </div>

        {/* مربع النص مع الأنيميشن */}
        <div className='w-1/2 sm:max-h-[500px] sm:min-h-[500px] md:max-h-[650px] md:min-h-[650px] lg:max-h-[750px] lg:min-h-[750px] xl:max-h-[900px] xl:min-h-[900px] bg-[#c3eae1]'>
          <div className='relative flex justify-center items-center sm:min-w-[280px] sm:max-w-[280px] sm:min-h-[250px] sm:max-h-[250px] md:min-w-[320px] md:max-w-[320px] md:min-h-[290px] md:max-h-[290px] lg:min-w-[360px] lg:max-w-[360px] lg:min-h-[320px] lg:max-h-[320px] xl:max-w-[400px] xl:min-w-[400px] xl:max-h-[350px] xl:min-h-[350px] bg-white sm:mt-32 md:mt-36 lg:mt-44 xl:mt-60 slide-in-right'>
            <div className='flex justify-center items-center flex-col sm:min-w-[260px] sm:max-w-[260px] sm:min-h-[230px] sm:max-h-[230px] md:min-w-[300px] md:max-w-[300px] md:min-h-[270px] md:max-h-[270px] lg:min-w-[340px] lg:max-w-[340px] lg:min-h-[300px] lg:max-h-[300px] xl:max-w-[380px] xl:min-w-[380px] xl:max-h-[330px] xl:min-h-[330px] bg-[#dff4ef]'>
              <p className='sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold text-gray-500 ml-5 '>Change your life with us</p>
              <p className='sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold md:ml-0 lg:ml-3 xl:ml-5 text-gray-900'> for the better </p>
            </div>
          </div>
        </div>
      </div>
    <div className="relative w-full mx-auto overflow-hidden sm:hidden  max-h-[600px]">
      
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full"
            style={{ minWidth: '100%', maxHeight: '600px' }}
          />
        ))}
      </div>

      
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 text-white rounded-full"
      >
        <FaAngleLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 text-white rounded-full"
      >
        <FaAngleRight size={24} />
      </button>

      

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ImageSwipe;
