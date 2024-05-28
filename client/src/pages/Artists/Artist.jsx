import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
function Artist() {
  const [ArtistList, setArtistList] = useState({});
 
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:4000/artists/all');
        setArtistList(response);
      } catch (error) {
        console.error('Error fetching artist list:', error);
      }
    };

    fetchArtists();
  }, []);
  return (
    <>
      {ArtistList &&
        ArtistList.length > 0 &&
        Artist?.map((obj, index) => {
          <div className="d-flex artist-container">
            <div className="row">
              <div className="col-md-12">
                <h3>{obj._id}</h3>
                <img src={obj.imageurl} />
              </div>
            </div>
          </div>;
        })()}
    </>
  );
}

export default Artist;
