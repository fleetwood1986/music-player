import React, { useState, useRef } from 'react';
import './App.css';
import Song from './components/Song';
import Player from './components/Player';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
	const audioRef = useRef(null);
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [l, setL] = useState(false);
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration: duration });
	};

	const songEndHandler = () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

		setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className={`App ${l} ? "library-active" : ""`}>
			<Nav l={l} setL={setL} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setSongs={setSongs}
				l={l}
			/>
			<audio
				onEnded={songEndHandler}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}></audio>
		</div>
	);
}

export default App;
