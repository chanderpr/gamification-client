import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import RankList from "../../pages/RanksList";
import AddRank from "./AddRankModal";
import EditRank from "./EditRankModal";

const AllRanks = () => {
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

  const getRanks = async() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://test-grazitti.onrender.com/ranks',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log('ranks respons',JSON.stringify(response.data));
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
    console.log("formData",formData.rankName)
    if (!formData.rankName) {
      errors.rankName = 'Rank Name is required';
    }
    else if (!formData.rankIcon) {
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
            closeModal();
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

      // closeModal();
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
    console.log("aclose");
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
    setFormErrors({})
  };

  // get ranks
  useEffect(() => {
    getRanks();
  }, []);
  
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;
  return(
    <>
      <div className="container">
        <p className="header-description">Add a ranking system to enhance engagement in the community. Simply create a rank and set the criteria to achieve the rank.</p>
        <div className='button-wrapper'>
          <button className="button" onClick={() => setShowModal(true)}>Add New Rank</button>
        </div>
        {ranks && (
          <RankList 
            allRanksDetails={ranks}
            handleEdit={handleEdit}
            handleDeleteRank={handleDeleteRank}
          />
        )}
      </div>
      {showModal && (
        <AddRank 
          formData={formData}
          formErrors={formErrors}
          handleAddRank={handleAddRank}
          handleChange={handleChange}
          closeModal={closeModal}
        />
      )}
      {editRankData && (
        <EditRank
          allRanksDetails={ranks}
          editRankData={editRankData}
          setEditRankData={setEditRankData}
          handleRankUpdate={handleRankUpdate}
        />
      )}
    </>
  )
}

export default AllRanks;