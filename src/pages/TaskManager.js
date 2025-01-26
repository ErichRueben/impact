import React, { useState } from "react";
import { DndContext, useDroppable, useDraggable, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { Container, Button } from "react-bootstrap";
import TaskModal from '../components/TaskModal.js';
import "../styles/Page.css";
import "../styles/TaskManager.css";

const TaskColumn = ( { id, title, tasks } ) => {
    const { setNodeRef } = useDroppable( { id } );

    return (
        <div ref={ setNodeRef } className="task-column">
            <h2>{ title }</h2>
            <SortableContext items={ tasks }>
                { ( tasks || [] ).map( ( task ) =>
                    <TaskItem key={ task.id } id={ task.id } task={ task } />
                ) }
            </SortableContext>
        </div>
    );
};

const TaskItem = ( { id, task } ) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable( { id } );

    const style = {
        transform: `translate3d(${ transform?.x || 0 }px, ${ transform?.y || 0 }px, 0)`,
        transition
    };

    return (
        <div
            ref={ setNodeRef }
            style={ style }
            className="task-item"
            { ...listeners }
            { ...attributes }
        >
            <strong>{ task.task }</strong>
            <p>{ task.description }</p>
            <small>Client: { task.client }</small>
        </div>
    )
}

const TaskManager = () => {
    const [ tasks, setTasks ] = useState( {
        "do": [],
        "progress": [],
        "review": [],
        "completed": [],
    } );

    const [ showModal, setShowModal ] = useState( false );

    const sensors = useSensors(
        useSensor( PointerSensor ),
        useSensor( KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        } )
    );

    const handleDragEnd = ( { active, over } ) => {
        if( !over || active.id == over.id ) return;

        const sourceColumn = Object.keys( tasks ).find( ( column ) =>
            tasks[ column ].some( ( task ) => task.id === active.id )
        );
        const destinationColumn = over.id;

        if ( sourceColumn === destinationColumn ) {
            const updatedTasks = arrayMove(
              tasks[ sourceColumn ],
              tasks[ sourceColumn ].findIndex( ( task ) => task.id === active.id ),
              tasks[ sourceColumn ].findIndex( ( task ) => task.id === over.id )
            );
      
            setTasks( {
              ...tasks,
              [ sourceColumn ]: updatedTasks,
            } );
        } else {
            const taskToMove = tasks[ sourceColumn ].find( ( task ) => task.id === active.id );
            const sourceTasks = tasks[ sourceColumn ].filter( ( task ) => task.id !== active.id );
            const destinationTasks = [ ...tasks[ destinationColumn ], taskToMove ];

            setTasks( {
                ...tasks,
                [ sourceColumn ]: sourceTasks,
                [ destinationColumn ]: destinationTasks
            } );
        }
    };

    const handleAddTask = ( project, task, description, client ) => {
        const newTask = { 
            id: `${ Date.now() }`,
            project, 
            task, 
            description, 
            client 
        };
    
        setTasks( ( prev ) => ( {
          ...prev,
          do: [ ...prev.do, newTask ],
        } ) );
    };

    return (
        <div className='page-container'>
            <h1>Task Manager</h1>

            <div className="task-header">
                <span>An interactive way to manage all your Saas projects!</span>
                <Button variant="primary" onClick={ () => setShowModal( true ) }>
                    Add Task
                </Button>
            </div>

            <div className='task-container'>
                <DndContext
                    sensors={ sensors }
                    collisionDetection={ closestCenter }
                    onDragEnd={ handleDragEnd }
                >
                    <div className='task-manager'>
                        { Object.entries( tasks ).map( ( [ columnId, columnTasks ] ) => (
                            <TaskColumn
                                key={ columnId }
                                id={ columnId }
                                title={ columnId }
                                tasks={ columnTasks }
                            />
                        ) ) }
                    </div>
                </DndContext>
            </div>

            <TaskModal
                show={ showModal }
                handleClose={ () => setShowModal( false ) }
                handleSave={ handleAddTask }
            />
        </div>
    );
};

export default TaskManager;