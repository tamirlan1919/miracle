import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    // Fetch data about works from your API
    axios.get('http://127.0.0.1:8000/api/work/')
      .then(response => setWorks(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMarkerClick = (work) => {
    setSelectedWork(work);
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Works</h1>

      <div className="relative mb-8">
        <iframe
          title="Yandex Map"
          width="100%"
          height="500"
          frameBorder="1"
          className="rounded-lg overflow-hidden"
          src="https://yandex.ru/map-widget/v1/?ll=39.735345%2C47.228816&mode=search&oid=149705269337&ol=biz&z=16.51"
        ></iframe>
      </div>
<div className='max-w-2xl'>


      {works.map(work => (
        <div key={work.id} className="mb-4">
          <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
            <h2 className="text-lg font-semibold">{work.name}</h2>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleMarkerClick(work)}
            >
              Посмотреть детали
            </button>
          </div>

          {selectedWork && selectedWork.id === work.id && (
            <div className="mt-3 p-3 bg-white rounded-md shadow-md">
              <div>
                <h3 className="text-lg font-semibold">Обязанности:</h3>
                <p>{selectedWork.responsibilities}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Требования:</h3>
                <p>{selectedWork.requirements}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Условия:</h3>
                <p>{selectedWork.conditions}</p>
              </div>
              <div className='flex'>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedWork(null)}
              >
                Закрыть
              </button>
             <a href="https://t.me/timaadev"><button className='mt-3 bg-black ml-4 text-white px-4 py-2 rounded-md'>Связаться</button></a> 
              </div>

            </div>
          )}
        </div>
        
      ))}
    </div>
    </div>
  );
};

export default Work;
