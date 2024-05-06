import { useEffect, useState } from 'react';
import ApiClient from './api/ApiClient';
import './style.scss';

interface Results {
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
  };
  id: number;

  key: string;
  masterData: {
    current: {
      name: {
        'en-US': string;
      };
      description: {
        'en-US': string;
      };
    };
  };
}

const getDataFromApi = new ApiClient(
  'https://api.europe-west1.gcp.commercetools.com',
  '/undefineds3',
);

export default function App() {
  const [response, setResponse] = useState<Results[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromApi.getProducts();
      setResponse(data.results);
    };
    fetchData();
  }, []);
  // console.log(response);
  return (
    <div>
      {response.map((elem) => {
        return (
          <div key={elem.id}>
            <p>{elem.masterData.current.name['en-US']}</p>
            <p>{elem.masterData.current.description['en-US']}</p>
          </div>
        );
      })}
    </div>
  );
}
