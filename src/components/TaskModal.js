import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskModal = ( { show, handleClose, handleSave } ) => {
    const [ project, setProject ] = useState( '' );
    const [ task, setTask ] = useState( '' );
    const [ description, setDescription ] = useState( '' )
    const [ client, setClient ] = useState( '' );

    const handleSubmit = () => {
        if( task.trim() ) {
            handleSave( project, task, description, client );
            setProject( '' )
            setTask( '' );
            setDescription( '' );
            setClient( '' );
            handleClose();
        }
    };

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            value={ project }
                            onChange={ ( e ) => setProject( e.target.value ) }
                            />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder=""
                            value={ task }
                            onChange={ ( e ) => setTask( e.target.value ) }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            value={ description }
                            onChange={ ( e ) => setDescription( e.target.value ) }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Client</Form.Label>
                        <Form.Select
                        value={ client }
                        onChange={ ( e ) => setClient( e.target.value ) }
                        >
                        <option value="Walmart">Walmart</option>
                        <option value="Uber">Uber</option>
                        <option value="Shopify">Shopify</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="L'Oréal">L'Oréal</option>
                        <option value="Fanatics">Fanatics</option>
                        <option value="Levi">Levi</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                    Cancel
                </Button>
                <Button variant="primary" onClick={ handleSubmit }>
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;