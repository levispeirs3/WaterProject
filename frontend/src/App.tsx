import { useState } from 'react';
import './App.css';
import CategoryFilter from './CategoryFilter';
import ProjectList from './ProjectList';
import WelcomeBand from './WelcomeBand';

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  return (
    <>
      <div className='container mt-4'>
        <div className='row bg-primary text-navy'>
          <WelcomeBand />
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>
          <div className='col-md-8'>
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
