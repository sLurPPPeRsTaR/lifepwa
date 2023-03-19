import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileImage({ urlAPI, token }) {
    const [image, setImage] = useState(false);
    useEffect(() => {
        axios
            .get(urlAPI, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            })
            .then((response) => {
                setImage(response.data);
            });
    }, [urlAPI, token])

    return (
        <>
            {image ?
                <img src={URL.createObjectURL(image)} className="w-8" />
                :
                <div className=""></div>
            }
        </>
    )
}