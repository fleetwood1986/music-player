import React from 'react';
import { playAudio } from './util';

const LibrarySong = ({
	item,
	songs,
	setCurrentSong,
	id,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = () => {
		setCurrentSong(item);
		//Add active state
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
		//check if song is playing
		playAudio(isPlaying, audioRef);
	};

	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${item.active ? 'selected' : ''}`}>
			<img src={item.cover} alt={item.name} />
			<div className="song-description">
				<h3>{item.name}</h3>
				<h4>{item.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
