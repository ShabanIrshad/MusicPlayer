// ----------------//GETTING ELEMENTS FROM DOM//-------------------------//
const select=document.getElementById('select');
const songList=document.getElementById('song-list');
const songControl=document.getElementById('song');
const ctrlIcon=document.getElementById('ctrlIcon');
const progress=document.getElementById("progress");
const startDuration=document.getElementById('start-duration');
const endDuration=document.getElementById('end-duration');
const toggleBackground=document.getElementById('toggle-background');
const toggleBtn=document.getElementById('toggle-btn');
const playlistBtn=document.getElementById('playlist-btn');
const playlistInput=document.getElementById('playlist-input');
const addtoPlaylistBtn=document.getElementById('add-to-playlist');


//--------------------//GLOBAL VARIABLES//-----------------------------------//
let currentSong={};
let currentPlaylist;
let playlistIndex;

// -------//USING ARRAY AS DATABASE TO STORE SONGS INFORMATIONS//--------------//
const songs=[
    {
        id:1,
        img:"images/calmdown.jpeg",
        name:"Calm Down Selena",
        artist:"Selena Gomez",
        genre:"Pop",
        source:"Songs/CalmDownSelena.mp3",
    },
    {
        id:2,
        img:"images/deathbed.jpeg",
        name:"Death Bed",
        artist:"Powfu",
        genre:"Rock",
        source:"Songs/deathbedPowfu.mp3",
    },
    {
        id:3,
        img:"images/woman.jpeg",
        name:"Woman Doja Cat",
        artist:"Doja Cat",
        genre:"Electro pop",
        source:"Songs/DojaCatWoman.mp3",
    },
     {
        id:4,
        img:"images/loveagain.jpeg",
        name:"Love Again",
        artist:"Dua Lipa",
        genre:"Electro pop",
        source:"Songs/DuaLipaLoveAgain.mp3",
    },
     {
        id:5,
        img:"images/espresso.jpeg",
        name:"Espresso",
        artist:"Sabrina Carpenter",
        genre:"Jazz",
        source:"Songs/EspressoSabrinaCarpenter.mp3",
    },
     {
        id:6,
        img:"images/illuminati.jpeg",
        name:"Illuminati",
        artist:"Sushin Shyam",
        genre:"Rock",
        source:"Songs/IlluminatiSushinShyam.mp3",
    },
     {
        id:7,
        img:"images/inna.jpeg",
        name:"Inna UP",
        artist:"Inna",
        genre:"Electro pop",
        source:"Songs/UPInna.mp3",
    },
     {
        id:8,
        img:"images/nwantiti.jpeg",
        name:"Love Nwantity",
        artist:"CKay",
        genre:"Pop",
        source:"Songs/lovenwantityCkay.mp3",
    },
     {
        id:9,
        img:"images/molly.jpeg",
        name:"Molly Iann Dior",
        artist:"Iann Dior",
        genre:"Jazz",
        source:"Songs/mollyIannDior.mp3",
    },
     {
        id:10,
        img:"images/mood.jpeg",
        name:"MOOD",
        artist:"Iann Dior",
        genre:"Electro pop",
        source:"Songs/moodIannDior.mp3",
    },
     {
        id:11,
        img:"images/betheone.jpeg",
        name:"One Kiss",
        artist:"Dua Lipa",
        genre:"Jazz",
        source:"Songs/OneKissDuaLipa.mp3",
    },
     {
        id:12,
        img:"images/onthefloor.jpeg",
        name:"On The Floor",
        artist:"Jennifer Lopez",
        genre:"Pop",
        source:"Songs/OnTheFloorJenniferLopez.mp3",
    },
     {
        id:13,
        img:"images/safari.jpeg",
        name:"Safari",
        artist:"Serena",
        genre:"Electro pop",
        source:"Songs/safariSerena.mp3",
    },
     {
        id:14,
        img:"images/shapeofyou.jpeg",
        name:"Shape of You",
        artist:"Ed Sheeran",
        genre:"Jazz",
        source:"Songs/ShapeOfYouEdShereen.mp3",
    },
      {
        id:15,
        img:"images/passobemsolto.jpeg",
        name:"Passo Bem Solto",
        artist:"Hazique",
        genre:"Jazz",
        source:"Songs/passobemsolto.mp3",
    },
];

//------------------// PLAYLIST SONG ARRAY//------------------------//
const playlistArray=[];

//-------------------EVENT LISTENER ON CREATE PLALIST BUTTON//----------------//
playlistInput.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
       createPlaylist();
    }
})
playlistBtn.addEventListener('click',createPlaylist);

addtoPlaylistBtn.addEventListener('click',addtoPlaylist);

// ----------------//TOGGLE THEME FUNCTION//--------------------//
let themeLight=true;
toggleBackground.addEventListener('click',()=>{    
   toggleTheme(themeLight);
})
const toggleTheme=(bool)=>{      
     (bool)?lightTheme():darkTheme();
    themeLight=themeLight?false:true;
}

//-----------//USING CHANGE EVENT ON LIST//-------------------------------//
select.onchange=()=>{
    
    if(select.value==='All'){
        showSongs(songs);
    }else{
        const res=filterSongArray(select.value);
        showSongs(res);
    }
}
//--------------------------------//SHOW SONGS FUNCTION//--------------------//
const showSongs=(songs)=>{
    
    songList.innerHTML="";
    
    songs.forEach(song=>{
         const btn=document.createElement('button');
        const anchor=document.createElement('a');
        anchor.classList.add('song-anchor');
        anchor.setAttribute("href",'#');
        btn.textContent=song.name;
        btn.style.display='block';
        btn.classList.add('song-btn');
        anchor.appendChild(btn);
        songList.appendChild(anchor);
        btn.addEventListener('click',()=>{
            renderCurrentSong(song);
        })
    });

}

//------------------------RENDER CURRENT SONG FUNCTION//------------------------------//
const renderCurrentSong=(song)=>{
    const songSource=document.getElementById('song-source');
    const artist=document.getElementById('artist-name');
    const title=document.getElementById('song-name');
    const songImage=document.getElementById('image');
    songImage.setAttribute("src",song.img);
    title.textContent=song.name;
    artist.textContent=song.artist;
    songSource.setAttribute("src",song.source);
    currentSong=song;
    songControl.load();
    songControl.play();
}

//--------------------------//CREATE PLAYLIST FUNCTION//-------------------------------//
function createPlaylist(){
    if(playlistInput.value===""){
        return alert('Please provide a Playlist name.')
    }
    const playlistButtons=document.getElementById('playlist-buttons');
    
    const button=document.createElement('button');
    button.textContent=goodCasing(playlistInput.value);
    button.setAttribute("id",playlistArray.length+1);
    button.addEventListener('click',()=>{
        button.style.backgroundColor="#778da9";
        return renderPlaylistSong(button);
    });
    playlistButtons.appendChild(button);    
    playlistArray.push({
             playlistName:`${goodCasing(playlistInput.value)}`,
             songs:[],
        });
    playlistInput.value="";
    playlistInput.focus();

}

//--------------------------//ADD TO PLAYLIST FUNCTION//-----------------------------------//
function addtoPlaylist(){
    if(playlistArray.length===0){
        return alert('Create a playlist first.');
    }
    console.log(currentPlaylist);
    playlistArray.forEach(obj=>{
        if(obj.playlistName.toLowerCase()===currentPlaylist.toLowerCase()){
            obj.songs.push(currentSong);
        }
    });
    return showPlaylistSongs(playlistArray[playlistIndex].songs);
}

//-------------------------//RENDER PLAYLIST SONG FUNCTION//-------------------------------//
function renderPlaylistSong(data){
    const pName=document.getElementById('playlistName');
    pName.textContent=`Selected Playlist : ${data.textContent}`;
    playlistIndex=data.id-1;
    currentPlaylist=data.textContent;   
    const songsObj=playlistArray[data.id-1];
    if(data.textContent.toLowerCase()===songsObj.playlistName.toLowerCase()){
        return showPlaylistSongs(songsObj.songs);
       
    }  
}
    
//-------------------//HELPFUL FUNCTIONS TO MAKE SMOOTHER EXECUTION//------------------//

function showPlaylistSongs(songs){
    const elementContainer=document.getElementById('element-container');
    elementContainer.innerHTML="";
    if(songs.length===0)return;
    songs.forEach(song=>{
        const p=document.createElement('p');
        p.textContent=song.name;
        p.classList.add('list-element');
        p.addEventListener('click',()=>{
            return renderCurrentSong(song);
        })
        elementContainer.appendChild(p);
    });
}


function goodCasing(str){
    if(str.length===0){
        return "";
    }
    let j=0;
    let result=str.charAt(j++).toUpperCase();
    for(j=1;j<str.length;j++){
    
        if(str.charAt(j)===' '){
            result+=' '
            result+=str.charAt(j+1).toUpperCase();
            j++;
        }else{
             result+=str.charAt(j);
        }
    }
    return result;    
}
function filterSongArray(str){
    let result=[];
    songs.forEach(song=>(song.genre===str)?result.push(song):"");
    return result;
}
const lightTheme=()=>{
    const themeText=document.getElementById('theme-text');   
    themeText.textContent=" Dark";
    toggleBtn.style.transform='translate(30px)';
    document.body.style.backgroundColor='#495057';

}
const darkTheme=()=>{
    const themeText=document.getElementById('theme-text');   
    themeText.textContent=" Light";
    toggleBtn.style.transform='translate(0px)';
    document.body.style.backgroundColor='white';
}
const genreArray=()=>{
    const array=[];
    songs.forEach(song=>array.push(goodCasing(song.genre)));
    const genre=new Set([...array]);
    const genreList=[...genre];
    genreList.forEach(gen=>{
        const opt=document.createElement('option');
        opt.textContent=gen;
        select.appendChild(opt);
    })
}

function convertTime(duration){
    let minutes=Math.floor(duration/60);
    let seconds=Math.floor(duration%60);
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

document.addEventListener('DOMContentLoaded',()=>{
    genreArray();
    showSongs(songs);
    // songControl.pause();
})

///-------------------------------------------------------------//END OF THE CODE//------------------------------------------------------//


//------------------//SONG CARD FUNCTIONALITIES BAR FUNCTION//-----------------//
songControl.onloadedmetadata = () => {
    progress.value = 0;

    startDuration.textContent = convertTime(songControl.currentTime);
    endDuration.textContent = convertTime(songControl.duration);

    // Set max value of the progress bar to duration (in seconds)
    progress.max = Math.floor(songControl.duration);

    // Start playing the song
    songControl.play().then(() => {
        // Use timeupdate event instead of setInterval
        songControl.addEventListener('timeupdate', () => {
            progress.value = songControl.currentTime;
            startDuration.textContent = convertTime(songControl.currentTime);
        });
    }).catch(error => {
        console.error("Failed to play:", error);
    });
};


progress.onchange=()=>{
    try {
         songControl.currentTime=progress.value;
         songControl.play();
    } catch (error) {
        console.error(error);
    }
    
   
}; 

