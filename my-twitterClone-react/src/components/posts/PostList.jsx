import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import '../../styles.css';

import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { BsChat, BsUpload } from "react-icons/bs";

import { getAllPosts } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";

export default function PostList(){

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }

  useEffect(() =>{
    getPosts();
  },[]);

  return (
    <div>
      <CardTitle tag="center"><Alert color="primary"><strong>Posts publicados </strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
      <Table>
        <tbody>
          { posts.map((post, index) => {
            return(
              <div>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row><Col><strong><img src={post.image} alt="Img"/> {post.user}</strong></Col></Row>
                          <Row>
                            <Col>
                              {post.message}
                            </Col>
                          </Row>
                          <Row>
                            <Col align="left" xs= "5">
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
              </div>)
            })}
          </tbody>
        </Table>
      </div>
    );
}