import React, { useEffect } from 'react';
import $ from 'jquery';
const RankList = ({allRanksDetails, handleEdit, handleDeleteRank}) => {
  console.log("allRanks",allRanksDetails)
  useEffect(() => {
    $('#rankTable').DataTable();
  }, []);

  return(
    <>
      {allRanksDetails.message.length === 0 ? (
        <p className="no-ranks">There are no ranks available. Create your first rank.</p>
      ) : (

        
        <table className='custom-table' id={'rankTable'}>
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
            {allRanksDetails.message.map(rank => (
              <tr key={rank.id} className="card">
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
    </>
  )
}

export default RankList;