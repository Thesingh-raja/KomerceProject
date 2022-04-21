import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

export const ImageUpload = ({image, name, setImage}) => {
  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const {data} = await axios.post('/api/upload', formData, config);
      setImage(data);
    } catch (error) {
      toast.warn('Invalid Image Format');
    }
  };
  return (
    <div className="product-imageitem">
      <div id="wrapper">
        <label htmlFor="description">Product Image</label>
        <div className="mt-10">
          <div className="tooltip">
            <span className="tooltiptext">
              {image ? 'Click image to remove' : ''}
            </span>
            {!image ? (
              <label htmlFor="image-file" className="drop-zone">
                <input
                  type="file"
                  id="image-file"
                  className="drop-zone__input"
                  onChange={uploadFileHandler}
                />
                Drop file here or click to upload
              </label>
            ) : (
              <img
                alt={name}
                src={image}
                onClick={() => setImage()}
                className="drop-zone"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
