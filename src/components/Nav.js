import React from 'react'
import './Nav.css'
import { useState,useEffect} from 'react';

export default function Nav(){
    const[query,setQuery]=useState("dog");
    
    const[loading,setLoading] = useState(true)
    const[data,setData] = useState([]);
    

    const getPhotos = async () =>{
        setLoading(true);
        await fetch ( `https://api.pexels.com/v1/search?query=${query}`,{ 
        
            headers:{
                Authorization:process.env.REACT_API_YOUR_API_KEY,
            }
        })
        .then((resp)=>{
            return resp.json();

        })
        .then((res)=>{
            setLoading(false);
            setData(res.photos);
            
        });
    }

    useEffect(() =>{
        getPhotos();

    },[]);

    const onKeyDownHandler = (e)=>{
        if(e.keyCode === 13){
            getPhotos();
        }
    } 



  return (
    <>
        <div>
            <nav className='navbar'>
                <div className='logo'>
                <img className='img' src='https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png'/>
                </div>
                <div className='home'>
                <a href="#">Home</a>
                </div>
                <div className='explore'>
                <a href="#">Explore</a>
                </div>
                <div className='create'>
                <a href="#">Create</a> 
                </div>
                <div className="search-bar">
                <input type="text" 
                placeholder="Search for photos" 
                onKeyDown={onKeyDownHandler}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                />
                </div>
                <div>
                    <img className='notifi'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1-35pCOMqfTZN1g43e5ED745V82WYuzNEw&usqp=CAU' alt='notification '/>

                </div>
                <div>
                    <img className='message'src='https://static-00.iconduck.com/assets.00/message-icon-512x463-tqzmxrt7.png' />
                </div>
                <div>
                    <img className='profile'src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg' alt=''/>
                </div>
            </nav>
            {loading && <h1>Fetching...</h1>}
            <div className='container'> 
            {data?.map((item,index)=>{
                return(
                    <div className='box' key={index}>
                        <img src={item.src.medium} alt={item.id}/>
                    </div>
                );
            })}
            </div>
            
        </div>
    </>
  )
}        

