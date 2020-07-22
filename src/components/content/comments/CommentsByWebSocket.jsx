import React from "react";
import SockJsClient from "react-stomp";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

export class CommentsByWebSocket extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            comments: [],
            topics: [
                `/topic/comments/${this.props.openedArtwork}`,
                `/topic/comments/${this.props.openedArtwork}/newComment`
            ]
        }
    };

    onConnect = () => {
        this.requestComments(this.props.openedArtwork)
    };

    requestComments = (artworkId) => {
        this.clientRef.sendMessage(`/app/comments/${artworkId}`);
    };

    setComments = (comments) => {
        this.setState(state => ({
            ...state,
            comments: [...this.state.comments, ...comments]
        }));
    };

    addComment = comment => {
        this.setState(state => ({
            ...state,
            comments: [...this.state.comments, comment]
        }));
    };

    postComment = (comment) => {
        this.clientRef.sendMessage(`/app/postComment/${this.props.openedArtwork}`, JSON.stringify(comment));
    };

    onMessageReceive = (message, topic) => {
        if (topic === `/topic/comments/${this.props.openedArtwork}`) {
            this.setComments(message);
            return;
        }
        if (`/topic/comments/${this.props.openedArtwork}/newComment`) {
            this.addComment(message);
            return;
        }
    };

    render() {
        return (
            <div>
                <CommentForm postComment={this.postComment.bind(this)}/>
                <Comments comments={this.state.comments}/>

                <SockJsClient
                    // url={"http://ec2-3-125-115-63.eu-central-1.compute.amazonaws.com:8080/webproject-0.0.1-SNAPSHOT/handler"}
                    url={"http://localhost:8080/handler"}
                    topics={this.state.topics}
                    onMessage={this.onMessageReceive}
                    onConnect={this.onConnect}
                    ref={(client) => {
                        this.clientRef = client
                    }}/>


            </div>
        )
    }
}