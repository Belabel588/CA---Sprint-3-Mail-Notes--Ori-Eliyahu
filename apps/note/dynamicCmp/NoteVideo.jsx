

export function NoteVideo(props) {
    const { videoId } = props.note;

    if (!videoId) {
        console.log('EMPTY');
    } else {
        console.log(videoId);
    }

    return (
        <div className="video-note">
            <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}
