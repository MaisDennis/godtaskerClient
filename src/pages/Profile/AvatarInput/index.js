import React, { useState, useRef, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { useField } from '@rocketseat/unform';
//------------------------------------------------------------------------------
import { Container } from './styles';
import api from '~/services/api';
import { updateImageRequest } from '~/store/modules/image/actions';
import search from '~/assets/search-24px.svg';
//------------------------------------------------------------------------------
export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const [file] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const dispatch = useDispatch();
  const ref = useRef();
  // console.log(defaultValue)

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      })
    }
    dispatch(updateImageRequest(file))
  }, [ref, registerField, file]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('profileImage', e.target.files[0]);

    const response = await api.post('files', data, {
      headers: {
				'accept': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    });

    const { image, location } = response.data;
    setPreview(location);
    // console.log(image)
    dispatch(updateImageRequest(image))
  }
  //----------------------------------------------------------------------------
  return (
    <Container>
      <label htmlFor="avatar">
        <div className="image-background-div">
        <img src={preview || search } alt="search"/>
        {/* <div className="test" test={preview}></div> */}
        </div>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
