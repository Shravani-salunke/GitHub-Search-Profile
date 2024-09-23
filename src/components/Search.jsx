import React,{useState} from 'react'
import axios from 'axios';
import './SearchUser.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
const Search = () => {
    const[username,setUsername]=useState("");
    const [profile,setProfile]=useState(null);
    const [error,setError]=useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(response.data);
            setError(null);
        }catch(error){
           setProfile(null);
           setError("User Not Found!");
        }
    };
  return (
    <div className='main-box'>
        <h1 className='heading'>Github Search-User</h1>
       <form className='search-form'onSubmit={handleSubmit}  >
      <input type='text' placeholder='enter Github username.....'className='search-input' value={username}
        onChange={(e)=>setUsername(e.target.value)}/>
        <button type='submit' className='search-btn'>Search</button>
        </form>
        {error && <p className='error-msg'>{error}</p>}
        {profile &&(
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-img">
                        <img src={profile.avatar_url} alt="Avatar" className='profile-avatar' />
                    </div>
                    <div className="profile-details">
                        <div className="profile-des">
                            <h2 className='profile-name'>{profile.name}</h2>
                            <p className='profile-created'>
                              Joined:{new Date(profile.created_at).toLocaleDateString()}
                           </p>
                        </div>
                         <a href={profile.html_url}target='_blank' rel="noreferrer"className='profile-username'>
                            @{profile.login}
                         </a>
                         <p className='profile-bio'>{profile.bio}</p>
                         <div className="profile-stats">
                            <p className="profile-reps">Repositories<br/><span className='stats'>{profile.public_repos}</span></p>
                            <p className="profile-followers">Followers<br/><span className='stats'>{profile.followers}</span></p>
                            <p className="profile-following">Following<br/><span className='stats'>{profile.following}</span></p>
                         </div>
                         <div className="profile-info">
                            <p className="profile-location">
                              <LocationOnIcon/>{profile.location}
                            </p>
                            <p className='profile-company'>
                                <LocationCityIcon/>{profile.company}
                            </p>
                         </div>
                         <div className="profile-links">
                           <a href={`https://twitter.com/${profile.twitter_username}`}target='_blank' className='twitter-link'>
                           <TwitterIcon/>{profile.twitter_username}
                           </a>
                           <a href={`https://instagram.com/${profile.instagram_username}`}target='_blank' className='instagram-link'>
                           <InstagramIcon/>{profile.instagram_username}
                           </a>
                           <a href={profile.html_url}target='_blank' rel='noreferrer'className='profile-url'>
                            <GitHubIcon/>View Profile
                           </a>
                         </div>
                    </div>
                </div>
            </div>
         )}
    </div>
  )
}

export default Search