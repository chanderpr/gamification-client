import { useState, useEffect } from 'react';
import axios from 'axios';
import EditRank from '../components/EditRank';
import { toast } from "react-toastify";


const AddRank = () => {
  const [ranks, setRanks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRankData, setEditRankData] = useState(null); // Track data for editing

  // console.log('edit rank data', editRankData)

  // console.log('rankd data', ranks)

  const [formData, setFormData] = useState({
    rankLevel: '',
    rankName: '',
    //rankIcon: null,
    rankCriteria: {
      likes: 0, 
      comments: 0,
      posts: 0
    },
    rankIcon: {
      newFilename: '',
      originalFilename: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});


  // get ranks
  useEffect(() => {
    getRanks();
  }, []);

  const getRanks = async() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://test-grazitti.onrender.com/ranks',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setRanks(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setError(error);
      setLoading(false);
    });
  }

  // add ranks
  const handleAddRank = async() => {
    const errors = {};

    if (!formData.rankName) {
      errors.rankName = 'Rank Name is required';
    }
    else if (!formData.rankIcon.name) {
      errors.rankIcon = 'Rank Icon is required';
    }
    else if (!['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(formData.rankIcon.type)) {
      errors.rankIcon = 'Only .png, .jpg and .jpeg are allowed';
    } 
    else {
      ranks.message.map(rank => {
        if(rank.rankCriteria.likes == formData.rankCriteria.likes && rank.rankCriteria.comments == formData.rankCriteria.comments  && rank.rankCriteria.posts == formData.rankCriteria.posts ) {
          errors.rankCriteria = "Rank has already been created with these criteria. Try changing one of these things - Likes, Comments, Posts"
        }
      })
    }
    

    if (Object.keys(errors).length === 0) {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('rankLevel', formData.rankLevel);
        formDataToSubmit.append('rankName', formData.rankName);
        formDataToSubmit.append('rankIcon', formData.rankIcon);
        formDataToSubmit.append('likes', formData.rankCriteria.likes);
        formDataToSubmit.append('comments', formData.rankCriteria.comments);
        formDataToSubmit.append('posts', formData.rankCriteria.posts);
    
        await axios.post('https://test-grazitti.onrender.com/ranks/add', formDataToSubmit)
          .then(res => {
            console.log("data", res.data)
            const updatedData = {...ranks};
            updatedData.message.push(res.data.message)
            setRanks(updatedData);
            setShowModal(false);
            toast.success(res.data.message.rankName + " details saved successfully!", {
              position: "top-right"
            });
          })
          .catch((err) => {
            toast.error(err.message, {
              position: "top-right"
            });
          });

      }
      else {
        setFormErrors(errors);
      }

      closeModal();
  };

  // delete rank
  const handleDeleteRank = async(id, rankName) => {
    try {
      const response = await axios.delete(`https://test-grazitti.onrender.com/ranks/${id}`);
      toast.success(rankName + " deleted successfully!", {
        position: "top-right"
      });
      console.log('rank deleted', rankName);
      getRanks();
    } catch (error) {
      console.log(error )
    }  
  }

  // edit rank
  const handleRankUpdate = (updatedRank) => {
    // Update the ranks state with the updated rank
    const updatedRanks = ranks.map(rank => {
      if (rank.id === updatedRank.id) {
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

  const handleChange = e => {
    console.log("name",e.target.name)
    console.log("value",e.target.value)
    console.log("file",e.target.files)
    if (e.target.name === 'rankIcon') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else if (e.target.name === 'likes' || e.target.name === 'comments' || e.target.name === 'posts') {
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

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      rankLevel: '',
      rankName: '',
      rankIcon: null,
      rankCriteria: {
        likes: 0,
        comments: 0,
        posts: 0
      }
    });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;
  return (
    <div className="container">
      <div className='button-wrapper'>
        <button className="button" onClick={() => setShowModal(true)}>Add New Rank</button>
      </div>
      {ranks.message.length === 0 ? (
        <p className="no-ranks">There are no ranks available. Create your first rank.</p>
      ) : (<table className='custom-table'>
        <thead>
          <tr>
            <th rowSpan="2">Rank Icon</th>
            <th rowSpan="2">Rank Level</th>
            <th rowSpan="2">Rank Name</th>
            <th colSpan="3">Rank Criteria</th>
            <th rowSpan="2">Action</th>
          </tr>
          <tr>
            <th>Likes</th>
            <th>Comments</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {ranks.message.map(rank => (
            <tr key={rank.id} className="rank-card">
              <td>
                <img src={`${rank.rankIcon?.url}`} alt={rank.rankIcon?.originalFilename} title={rank.rankIcon?.originalFilename} />
              </td>
              <td>{rank.rankLevel}</td>
              <td>{rank.rankName}</td>              
              <td>{rank.rankCriteria.likes}</td>
              <td>{rank.rankCriteria.comments}</td>
              <td>{rank.rankCriteria.posts}</td>
              <td>
                <button className="button edit-button" onClick={() => handleEdit(rank)}>Edit</button>
                <button className="button delete-button" onClick={() => handleDeleteRank(rank.id, rank.rankName)}>Delete</button>
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
                <label htmlFor="rankName">Rank Name <span className='required-icon'>*</span></label>
                <input
                  type="text"
                  id="rankName"
                  name="rankName"
                  value={formData.rankName}
                  onChange={handleChange}
                  className="input-field"
                  required="true"
                />
                {formErrors.rankName && <span className='validation-error'>{formErrors.rankName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="rankIcon">Rank Icon <span className='required-icon'>*</span></label>
                
                
                <input
                  type="file"
                  id="rankIcon"
                  name="rankIcon"
                  onChange={handleChange}
                  className="input-field"
                  accept="image/jpeg, image/png, image/svg+xml"
                />

                {formErrors.rankIcon && <span className='validation-error'>{formErrors.rankIcon}</span>}
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
                <label htmlFor="posts">Posts</label>
                <input
                  type="number"
                  id="posts"
                  name="posts"
                  value={formData.rankCriteria.posts}
                  onChange={handleChange}
                  className="input-field"
                />
                {formErrors.rankCriteria && <span className='validation-error'>{formErrors.rankCriteria}</span>}
              </div>
              <button type="button" className="button" onClick={handleAddRank}>Add Rank</button>
            </form>
          </div>
        </div>
      )}

      {editRankData && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={() => setEditRankData(null)}>&times;</span>
            <EditRank
              id={editRankData.id}
              rankLevel={editRankData.rankLevel}
              rankName={editRankData.rankName}
              rankCriteria={editRankData.rankCriteria}
              rankIcon={editRankData.rankIcon}
              onUpdate={handleRankUpdate}
              ranks={ranks}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRank;