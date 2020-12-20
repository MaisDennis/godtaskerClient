import React, { useState, useRef, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { useField } from '@rocketseat/unform';
//------------------------------------------------------------------------------
import { Container } from './styles';
import api from '~/services/api';
import { updateImageRequest } from '~/store/modules/image/actions';
//------------------------------------------------------------------------------
export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const [file] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const dispatch = useDispatch();
  const ref = useRef();

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

    //**********
    // console.log(e.target.files[0])
    const response = await api.post('files', data, {
      headers: {
				'accept': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    });

    const { image, location } = response.data;
    setPreview(location);
    dispatch(updateImageRequest(image))
  }
  //----------------------------------------------------------------------------
  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fd%2Fd4%2FMickey_Mouse.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMickey_Mouse&tbnid=rhBE6Cpz2CIZqM&vet=12ahUKEwi8qN2R_8rsAhXuKrkGHYG4BOUQMygAegUIARC5AQ..i&docid=o8fKNZd6urBFOM&w=265&h=370&q=mickey%20mouse&ved=2ahUKEwi8qN2R_8rsAhXuKrkGHYG4BOUQMygAegUIARC5AQ"} alt=""/>
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
