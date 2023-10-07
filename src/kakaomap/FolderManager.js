import axios from 'axios';
import React, { useState } from 'react';

const FolderManager = ({ place, folders, setFolders }) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddPlaceToFolder = async (folder) => {
    try {
      const newPlace = {
        name: place.place_name,
        address: place.road_address_name,
        phone: place.phone,
        longtitude: place.x,
        latitude: place.y,
      };
      const response = await axios.post('http://localhost:8000/folders/', {
        places: [...folder.places, newPlace],
      });

      if (response.status === 201) {
        alert('폴더에 장소를 성공적으로 저장하였습니다.');
        // 폴더 상태 업데이트
        setFolders((prevFolders) => prevFolders.map((f) => (f.id === folder.id ? response.data : f)));
      }
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleCreateNewFolder = async () => {
    try {
      const newPlace = {
        longtitude: place.x,
        latitude: place.y,
        name: place.place_name,
        address: place.address_name,
        phone: place.phone,
      };

      const response = await axios.post('http://localhost:8000/folders/', {
        title: newFolderName,
        places: [newPlace],
      });

      if (response.status === 201) {
        alert('새로운 폴더가 성공적으로 생성되었습니다.');
        setFolders((prevFolders) => [...prevFolders, response.data]);
        setNewFolderName('');
      }
    } catch (error) {
      console.error(error);
      alert('폴더 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {folders.map((folder) => (
        <button key={folder.id} onClick={() => handleAddPlaceToFolder(folder)}>
          {folder.title}
        </button>
      ))}

      <div>
        <input type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
        <button onClick={handleCreateNewFolder}>새 폴더 생성</button>
      </div>
    </div>
  );
};

export default FolderManager;
