// EditRank.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const EditRank = ({ id, rankLevel, rankName, rankCriteria, rankIcon, onUpdate, ranks }) => {
  const [formData, setFormData] = useState({
    rankLevel,
    rankName,
    rankCriteria,
    rankIcon
  });
  const [formErrors, setFormErrors] = useState({});

  const [currentIcon, setCurrentIcon] = useState(rankIcon);



  const handleChange = e => {
    console.log("name",e.target.name)
    console.log("value",e.target.value)
    console.log("file",e.target.files)
    if (e.target.name === 'rankIcon') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else if (e.target.name === 'likes' || e.target.name === 'comments' ||  e.target.name === 'posts') {
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const errors = {};

    console.log('getFormData', formData)

    if (!formData.rankName) {
      errors.rankName = 'Rank Name is required';
    } 

    
    if (formData.rankIcon.type) {
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(formData.rankIcon.type)) {
        errors.rankIcon = 'Only .png, .jpg and .jpeg are allowed';
      }      
    }else {
      ranks.message.map(rank => {
        if((rank.rankCriteria.likes == formData.rankCriteria.likes && rank.rankCriteria.comments == formData.rankCriteria.comments  && rank.rankCriteria.posts == formData.rankCriteria.posts ) && (rank.rankLevel != formData.rankLevel)) {
          errors.rankCriteria = "Rank has already been created with these criteria. Try changing one of these things - Likes, Comments, Posts"
        }
      })
    }

    if (Object.keys(errors).length === 0) {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('rankLevel', formData.rankLevel);
    formDataToSubmit.append('rankName', formData.rankName);
    if(formData.rankIcon) {
      formDataToSubmit.append('rankIcon', formData.rankIcon);
    }
    formDataToSubmit.append('likes', formData.rankCriteria.likes);
    formDataToSubmit.append('comments', formData.rankCriteria.comments);
    formDataToSubmit.append('posts',formData.rankCriteria.posts);
  
      axios.put(`https://test-grazitti.onrender.com/api/ranks/update/${id}`, formDataToSubmit)
      .then(res => {
        window.location.href = 'http://localhost:5173/';
        window.location.reload();
        toast.success(res.data.message.rankName + " details updated successfully!", {
          position: "top-right"
        });

        

        setCurrentIcon(res.data.rank.rankIcon)
      })
      .catch(err => console.error(err.message));
    
    }else {
      setFormErrors(errors);
    }


  };

  return (
    <>
      <h2>Edit Rank</h2>
      <form encType="multipart/form-data">
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
          {formErrors.rankName && <span className='validation-error'>{formErrors.rankName}</span>}
        </div>
          <div className="form-group">
            <label htmlFor="rankIcon">Rank Icon</label>
            <div className='editImageWrapper'></div> 
            {currentIcon  && (
              <img data={rankIcon} src={`${currentIcon.url}`} alt={currentIcon.originalFilename} title={currentIcon.originalFilename} style={{ width: '50px', height: '50px' }}  />
            )}


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
          <button className="button" onClick={handleUpdate}>Update Rank</button>
      </form>
    </>
  );
};

export default EditRank;
