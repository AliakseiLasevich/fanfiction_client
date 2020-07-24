import React from "react";
import ArtworkPreview from "./ArtworkPreview";

const ArtworkPreviewsList = (props) => {

    const artworkPreviews = props.artworksPreviews?.map(artwork => <ArtworkPreview key={artwork?.artworkId}
                                                                                   artworkId={artwork?.artworkId}
                                                                                   authorId={artwork?.authorId}
                                                                                   authorName={artwork?.authorName}
                                                                                   name={artwork?.name}
                                                                                   summary={artwork?.summary}
                                                                                   creationDate={artwork?.creationDate}
                                                                                   tags={artwork?.tags}
    />);

    return (
        <>
            {artworkPreviews}
        </>
    )
};

export default ArtworkPreviewsList;