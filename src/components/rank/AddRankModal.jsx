const AddRankModal = ({formData, formErrors, handleAddRank, handleChange, closeModal}) => {
  return(
    <>
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
    </>
  )
}

export default AddRankModal;