import React, { useState } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { postNewPost } from "../../utils/apicalls.js";

export default function AddPost(props){

  const [message, setMessage] = useState('');

  const addPost = (e) => {
    e.preventDefault();
    //Save post in database with post api call
    postNewPost(sessionStorage.getItem('email'),sessionStorage.getItem('name'), sessionStorage.getItem('image'), message)
      .then((res) => checkPOSTNewPost(res));
  }

  //Check the response from the server
  const checkPOSTNewPost = (res) => {
    if (res === "OK"){
      //TODO Show Modal when a new post is added
      props.updateMyPosts();
    }else{
      //TODO Show Modal when an error adding a new post occurs
    }
  }

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Añadir un nuevo post</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aMensaje">Mensaje</Label>
            <Input style={{height: '200px'}} type="textarea" name="message" value={message} id="aMensaje" placeholder="Introduce un mensaje" onChange={(e) => setMessage(e.target.value)}/>
          </FormGroup>
          <Button color="primary" onClick={addPost}>Añadir</Button>
        </Form>
      </Card>
    </div>
  );
}