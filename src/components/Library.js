import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	l,
}) => {
	return (
		<div className={`library  ${l ? 'active-library' : ''}  `}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((item) => {
					return (
						<LibrarySong
							item={item}
							setCurrentSong={setCurrentSong}
							songs={songs}
							id={item.id}
							key={item.id}
							audioRef={audioRef}
							isPlaying={isPlaying}
							setSongs={setSongs}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Library;
