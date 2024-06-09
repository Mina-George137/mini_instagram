import notFound from '../assets/not_found_404.png'

function MediaNotFound(){
    return (
        <div className="media-not-found">
            <h1>Media not found</h1>
            <img src={notFound} style={{objectFit:'contain', width:'480px', height:'380px'}}/>
        </div>
    );
}

export default MediaNotFound;