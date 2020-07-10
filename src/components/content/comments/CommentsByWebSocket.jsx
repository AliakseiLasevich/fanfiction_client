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
            topics: ['/topic/findComments',
                '/user/queue/gameOver',
            ]
        }
    };

    onConnect = () => {
        console.log("on connect")
        this.requestComments("xBou5AxUbA0M1ag127uueYSFBVpo8G")
        console.log(this.state)
    };

    requestComments = (artworkId) => {
        this.clientRef.sendMessage('/app/comments', JSON.stringify("xBou5AxUbA0M1ag127uueYSFBVpo8G"));
    };

    setComments = (comments) => {
        this.setState(state => ({...state, comments: comments}))
    };

    postComment = (comment) => {
        this.clientRef.sendMessage('/app/postComment', JSON.stringify(comment));
    };

    onMessageReceive = (message, topic) => {
        console.log("on onMessageReceive");
        if (topic === '/topic/comments') {
            this.refreshGamesList(message);
            return;
        }
    };


    render() {
        return (
            <div>
                <CommentForm postComment={this.postComment.bind(this)}/>
                <Comments comments={this.state.comments}/>


                <SockJsClient
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