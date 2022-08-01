import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles.css';


import { Row, Col, Card, CardTitle, Badge, CardBody,
Table, Alert, Button, Nav, NavItem, NavLink, TabContent,
TabPane, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { BsChat, BsUpload } from "react-icons/bs";

import { getMyPosts, deletePost } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";

import AddPost from './AddPost';
import EditPost from './EditPost';

export default function MyPostList(props){

  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
  const [activeTab, setActiveTab] = useState('1');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const getPosts = () => {
      getMyPosts(sessionStorage.getItem('email')).then((posts) => {
          setPosts(posts);
      });
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab)
      setActiveTab(tab);
  }

  const handleUpdateMyPosts = () => {
    getPosts();
  }

  const askForDelete = (post) => {
    setShowDeleteModal(
      <Modal isOpen="true" className={props.className}>
        <ModalHeader>Eliminar post</ModalHeader>
        <ModalBody>
          Se va a eliminar el post:<br/><small><strong>{post.message}</strong></small>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deletePostSel(post)}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={() => setShowDeleteModal(null)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }

  //Deleting selected post
  const deletePostSel = (post) => {
    deletePost(post._id)
      .then((res) => checkDELETEPost(res));
  }

  //Check the response from server
  const checkDELETEPost = (res) => {
    //if ok, remove modal and reset edit component
    if (res === "OK"){
      setShowDeleteModal(null);
      setEdit(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
      handleUpdateMyPosts();
    }else{
      //TODO Show a modal when error from server
    }
  }

  const handleShowEdit = (post) => {
    setEdit(<EditPost post= {post} updateMyPosts = {handleUpdateMyPosts} />);
  }

  useEffect(() =>{
    getPosts();
  },[]);

  return(
    <div>
      {showDeleteModal}
      <Row>
        <Col xs="7">
          <CardTitle tag="center"><Alert color="primary"><strong>Mis Posts publicados </strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
          <Table>
            <tbody>
              { posts.map((post, index) => {
                return(<div>
                  <div>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row><Col><strong><img src={post.image} alt="Img"/> {post.user}</strong></Col>
                               <Col align="right">
                                  <Button outline onClick={() => handleShowEdit(post)}><FaEdit /></Button>
                                  {' '}
                                  <Button outline onClick={() => askForDelete(post)}><FaTrashAlt /></Button>
                                </Col>
                                </Row>
                          <Row>
                            <Col>
                              {post.message}
                            </Col>
                          </Row>
                          <Row>
                            <Col align="left" xs= "8">
                              <Row>
                                <Col xs="2"><BsChat /></Col>
                                <Col xs="2"><AiOutlineRetweet /><small>{Math.floor((Math.random() * 10) + 1)}</small></Col>
                                <Col xs="2"><AiOutlineHeart /><small>{Math.floor((Math.random() * 100) + 1)}</small></Col>
                                <Col xs="2"><BsUpload/></Col>
                              </Row>
                            </Col>
                            <Col align="right">
                              <small>{getDateInStrFormat(new Date(post.publicationdate))}</small>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <br/>
              </div>
                </div>)
              })}
            </tbody>
          </Table>
        </Col>
        <Col xs="5">
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                Añadir
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                Editar
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <AddPost updateMyPosts = {handleUpdateMyPosts}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  {edit}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}