import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { playAudio } from './util';

const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	const activeLibraryHandler = (nextPrev) => {
		const newSongs = songs.map((song) => {
			if (song.id === nextPrev.id) {
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
	};
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songs.length === -1) {
				setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
				playAudio(isPlaying, audioRef);
				return;
			}
			setCurrentSong(songs[currentIndex - 1]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		}
		playAudio(isPlaying, audioRef);
		activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>

				<input
					onChange={dragHandler}
					min={0}
					value={songInfo.currentTime}
					max={songInfo.duration || 0}
					type="range"
				/>

				<p>{getTime(songInfo.duration || 0)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>

				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
