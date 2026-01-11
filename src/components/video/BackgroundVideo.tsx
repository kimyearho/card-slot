const BackgroundVideo = () => {
	return (
		<div className="absolute inset-0 z-0">
			<video
				autoPlay
				muted
				loop
				playsInline
				className="w-full h-full object-cover" // 핵심: 너비/높이 100% + 커버
			>
				<source src="/videos/2.mp4" type="video/mp4" />
			</video>
		</div>
	)
}

export default BackgroundVideo
