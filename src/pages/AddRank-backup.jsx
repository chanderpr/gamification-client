import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditRank from '../components/EditRank';
// import Filebase from 'react-file-base64';


const AddRank = () => {
  const [ranks, setRanks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRankData, setEditRankData] = useState(null); // Track data for editing
  const [formData, setFormData] = useState({
    rankId: '',
    rankName: '',
    rankIcon: null,
    rankCriteria: {
      likes: 0,
      comments: 0,
      visits: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // get ranks
  useEffect(() => {
    getRanks();
  }, []);

  const getRanks = async() => {
    const response = await axios.get('https://bf6d-112-196-45-10.ngrok-free.app/api/ranks')
    .then(res => {
      setRanks(res.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }

  // const handleAddRank = () => {
  //   const requestData = {
  //     rankId: formData.rankId,
  //     rankName: formData.rankName,
  //     rankIcon: formData.rankIcon,
  //     rankCriteria: formData.rankCriteria,
  //     file: "hlll"
  //   };

  //   axios.post('https://bf6d-112-196-45-10.ngrok-free.app/api/ranks/add', requestData)
  //     .then(res => {
  //       console.log("data", res.data)
  //       const updatedData = {...ranks};
  //       updatedData.message.push(res.data.message)
  //       setRanks(updatedData);
  //       setShowModal(false);
  //     })
  //     .catch(err => console.error(err));
  // };

  // const handleAddRank = () => {
  //   const formData = new FormData();
  //   formData.append('rankIcon', formData.rankIcon); // Assuming formData.rankIcon is a File object
  //   formData.append('rankId', formData.rankId);
  //   formData.append('rankName', formData.rankName);
  //   formData.append('rankCriteria', formData.rankCriteria);
  
  //   axios.post('https://bf6d-112-196-45-10.ngrok-free.app/api/ranks/add', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //   .then(res => {
  //     console.log("data", res.data)
  //     const updatedData = {...ranks};
  //     updatedData.message.push(res.data.message)
  //     setRanks(updatedData);
  //     setShowModal(false);
  //   })
  //   .catch(err => console.error(err));
  // };

  // add ranks
  const handleAddRank = () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(formData.rankIcon);
  
    fileReader.onload = () => {
      const base64File = fileReader.result.split(',')[1];
  
      const requestData = {
        rankId: formData.rankId,
        rankName: formData.rankName,
        rankCriteria: formData.rankCriteria,
        rankIcon: base64File
      };
  
      axios.post('https://bf6d-112-196-45-10.ngrok-free.app/api/ranks/add', requestData)
        .then(res => {
          console.log("data", res.data)
          const updatedData = {...ranks};
          updatedData.message.push(res.data.message)
          setRanks(updatedData);
          setShowModal(false);
        })
        .catch(err => console.error(err));
    };
  
    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };

  // delete rank
  const handleDeleteRank = async(id, rankName) => {
    try {
      const response = await axios.delete(`https://bf6d-112-196-45-10.ngrok-free.app/api/ranks/${id}`);
      // toast.success(rankName + " deleted successfully!", {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      console.log('rank deleted', rankName);
      getRanks();
    } catch (error) {
      console.log(error )
      // toast.error(error.message, {
      //   position: toast.POSITION.TOP_RIGHT
      // });
    }  
  }

  // edit rank
  const handleRankUpdate = (updatedRank) => {
    // try {
    //   e.preventDefault();
    //   setLoading(true);
    //   const response = await axios.put(`https://bf6d-112-196-45-10.ngrok-free.app/api/rank/${id}`, product);
    //   console.log(response.data);
    //   // setProduct({
    //   //   productName: response.data.message.productName,
    //   //   quantity: response.data.message.quantity,
    //   //   price: response.data.message.price
    //   // });
    //   // toast.success(response.data.message.productName + " details updated successfully!", {
    //   //   position: toast.POSITION.TOP_RIGHT
    //   // });
    //   console.log("lenght", response.data.message.length)
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error )
    //   toast.error(error.message, {
    //     position: toast.POSITION.TOP_RIGHT
    //   });
    // }
    // Update the ranks state with the updated rank
    const updatedRanks = ranks.map(rank => {
      if (rank._id === updatedRank._id) {
        return updatedRank;
      }
      return rank;
    });
    setRanks(updatedRanks);
    // Close the popup after editing
    setEditRankData(null);
  }

  const handleEdit = (rank) => {
    // Set data for editing when Edit button is clicked
    console.log("edit button clicked", rank)
    setEditRankData(rank);
  };

  const getFileNameFromPath = (filePath) => {
    if (!filePath) return '';
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
  };



  const handleChange = e => {
    console.log("name",e.target.name)
    console.log("value",e.target.value)
    console.log("file",e.target.files)
    if (e.target.name === 'rankIcon') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else if (e.target.name === 'likes' || e.target.name === 'comments' || e.target.name === 'visits') {
      setFormData({
        ...formData,
        rankCriteria: {
          ...formData.rankCriteria,
          [e.target.name]: parseInt(e.target.value)
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleDone = ({ base64 }) => {
    setFormData({ ...formData, rankIcon: base64 });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      rankId: '',
      rankName: '',
      rankIcon: null,
      rankCriteria: {
        likes: 0,
        comments: 0,
        visits: 0
      }
    });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="container">
      <button className="button" onClick={() => setShowModal(true)}>Add Role</button>
      {ranks.message.length === 0 ? (
        <p className="no-ranks">There are no ranks available. Create your first rank.</p>
      ) : (
        // ranks.message.map(rank => (
        //   <div key={rank._id} className="rank-card">
        //     <p>Rank ID: {rank.rankId}</p>
        //     <p>Rank Name: {rank.rankName}</p>
        //     <img src={`data:image/jpeg;base64,${rank.rankIcon}`} alt={rank.rankName} title={getFileNameFromPath(rank.rankIcon)} />
        //     <p>Rank Criteria: Likes: {rank.rankCriteria.likes}, Comments: {rank.rankCriteria.comments}, Visits: {rank.rankCriteria.visits}</p>
        //     <button className="delete-button" onClick={() => handleDeleteRank(rank._id)}>Delete</button>
        //   </div>
        // ))
        <table className='custom-table'>
        <thead>
          <tr>
            <th rowSpan="2">Rank ID</th>
            <th rowSpan="2">Rank Name</th>
            <th rowSpan="2">Rank Icon</th>
            <th colSpan="3">Rank Criteria</th>
            <th rowSpan="2">Action</th>
          </tr>
          <tr>
            <th>Likes</th>
            <th>Comments</th>
            <th>Vistis</th>
          </tr>
        </thead>
        <tbody>
          {ranks.message.map(rank => (
            <tr key={rank._id} className="rank-card">
              <td><img src={`data:image/jpeg;base64,${rank.rankIcon}`} alt={rank.rankName} title={getFileNameFromPath(rank.rankIcon)} /></td>
              <td>{rank.rankId}</td>
              <td>{rank.rankName}</td>              
              <td>{rank.rankCriteria.likes}</td>
              <td>{rank.rankCriteria.comments}</td>
              <td>{rank.rankCriteria.visits}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(rank)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteRank(rank._id, rank.rankName)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      

      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <span>&times;</span>
            </button>
            <h2>Add Rank</h2>
            <form encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="rankId">Rank ID</label>
                <input
                  type="text"
                  id="rankId"
                  name="rankId"
                  value={formData.rankId}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rankName">Rank Name</label>
                <input
                  type="text"
                  id="rankName"
                  name="rankName"
                  value={formData.rankName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rankIcon">Rank Icon</label>
                <input
                  type="file"
                  id="rankIcon"
                  name="rankIcon"
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="likes">Likes</label>
                <input
                  type="number"
                  id="likes"
                  name="likes"
                  value={formData.rankCriteria.likes}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <input
                  type="number"
                  id="comments"
                  name="comments"
                  value={formData.rankCriteria.comments}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="visits">Visits</label>
                <input
                  type="number"
                  id="visits"
                  name="visits"
                  value={formData.rankCriteria.visits}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <button type="button" className="button" onClick={handleAddRank}>Add Rank</button>
            </form>
          </div>
        </div>
      )}

      {editRankData && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setEditRankData(null)}>&times;</span>
            <EditRank
              id={editRankData._id}
              rankId={editRankData.rankId}
              rankName={editRankData.rankName}
              rankCriteria={editRankData.rankCriteria}
              rankIcon={editRankData.rankIcon}
              onUpdate={handleRankUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRank;
