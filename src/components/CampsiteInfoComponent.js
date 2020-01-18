import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Label, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {isModalOpen: false}
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button outline color="secondary" size="large" onClick={this.toggleModal}><i className="fa fa-pencil" /> Submit Comment</Button>{' '}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor=".rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor=".name">Your Name</Label>
                                <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".feedback" className="form-control" id="feedback" name="feedback" rows="6" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                    
                    <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>        
        );
    }

function RenderComments({comments}) {
        if (comments) {
            return(
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                        {comments.map(comment => {
                            return(
                                <div key={comment.id}>
                                    <p>{comment.text}<br />{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </div>
                            );
                        })}
                         <CommentForm />
                    </div>
            );
        }
        return(<div />);
        }
    
    
function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                <hr />
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
    return (
        <div />
    );
    }


export default CampsiteInfo;