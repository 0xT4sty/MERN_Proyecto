import React, { useState, useEffect } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { putExistingPost } from "../../utils/apicalls.js";

export default function EditPost(props){

  const [message, setMessage] = useState(props.post.message);

  const editPost = (e) => {
    e.preventDefault();
    //Update post in database with put api call
    putExistingPost(props.post._id, message)
      .then((res) => checkPUTPost(res));
  }

  //Check the response from the server
  const checkPUTPost = (res) => {
    if (res === "OK"){
      //TODO Show Modal when a the post is updated
      props.updateMyPosts();
    }else{
      //TODO Show Modal when an error updating the post occurs
    }
  }

  useEffect(() =>{
    setMessage(props.post.message);
  },[props.post]);

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Editar post</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aDescripcion">Mensaje</Label>
            <Input style={{height: '200px'}} type="textarea" name="message" id="aDescripcion" placeholder="Introduce un mensaje" value={message} onChange={(e) => setMessage(e.target.value)}/>
          </FormGroup>
            <Button color="primary" onClick={editPost}>Actualizar</Button>
        </Form>
      </Card>
    </div>
  );
}