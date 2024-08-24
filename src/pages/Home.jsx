// import React, { useState } from 'react';
// import Button from '../components/Button';

export default function Home({ handleCreate }) {
  // const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <p className='text-gray-900 text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quis nobis aut iste, tempore animi nam fuga repudiandae praesentium quidem!
        </p>
        {/* {!isEditing && (
          <div className='mt-4'>
            <Button type="create" onClick={handleCreate}> 
              Create New Item
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
