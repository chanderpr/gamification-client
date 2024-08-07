import EditRank from './EditRank'

const EditRankModal = ({ allRanksDetails, editRankData, setEditRankData, handleRankUpdate}) => {
  return(
    <>
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
            ranks={allRanksDetails}
          />
        </div>
      </div>
    </>
  )
}

export default EditRankModal;