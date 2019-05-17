import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,
     FormGroup, Label, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



    
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component{

        constructor(props) {
            super(props);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                isModalOpen : false,
                isNavOpen:false
            };
        }
    
        
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author,values.comment)
            // event.preventDefault();
        }
        toggleModal(){

            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
          }
        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}> Submit Comment</Button>
                    <div className="col-10 col-md-8">
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        <FormGroup>
                                            <Label htmlFor="rating">Rating</Label>
                                            <Control.select model=".rating" name="Rating"
                                                className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="yourname">Your Name</Label>
                                            <Control.text model=".author" id="yourname" name="your name"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    minLength:minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".yourname"
                                                show="touched"
                                                messages={{
                                                    minLength: 'Must be greater than 2 numbers',
                                                    maxLength: 'Must be 15 numbers or less',
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="comment">Comment</Label>
                                            
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="6"
                                                className="form-control" />
                                            
                                        </FormGroup>
                                        
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                       
                                        
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            );
        }
    }
    

    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

            </div>
        );
    }

    function RenderComments({comments,postComment,dishId}){
            return(
                <div className="col-12 col-md-5 m-1">

                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment)=>{
                            return(
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />           
                </div>
            )
    }
        
    

    const DishDetail = (props)=>{
       
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
                    
        }
        else if(props.errMess){

            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );

        }
        else if (props.dish!=null)
        
        
            return(

               
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div> 
                    </div>
                    <div className="row">
                        
                            <RenderDish dish={props.dish} />
                        
                            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
            );
        
    }

export default DishDetail;