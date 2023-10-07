import React, { useState } from 'react';
import SearchPlace from './kakaomap/SearchPlace'; // MapContainer 컴포넌트 import

function App() {
  const [folders, setFolders] = useState([]);

  return (
    <div className="App">
      <SearchPlace folders={folders} setFolders={setFolders} />
    </div>
  );
}

export default App;
