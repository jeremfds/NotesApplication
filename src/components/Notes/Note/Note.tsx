import React, { Component, ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { MNote } from '../../../models/notes';
import { IRootState, RTDispatch } from '../../../roots';
import { deleteNote, clearDeleteNote } from '../../../actions/notes/actionDeleteNote';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfCreator from '../PdfCreator';
import './Note.scss';

interface IProps {
    note: MNote;
    homepage: boolean;
    success?: boolean;
    refreshNotes: (makeRefresh: boolean) => void;
    deleteNote?: (id: number) => void;
    clearDeleteNote?: () => void;
}

interface IState {
    modal: boolean;
    click: boolean;
}

class Note extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            modal: false,
            click: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.clickedOnRemove = this.clickedOnRemove.bind(this);
        this.clickOnPdf = this.clickOnPdf.bind(this);
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.props.success !== prevProps.success) {
            this.props.refreshNotes(true);
        }
    }

    componentWillUnmount(): void {
        this.props.clearDeleteNote();
    }

    toggleModal(): void {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    clickedOnRemove(id: number): void {
        if (!isNaN(id) && id === this.props.note.id) {
            this.setState(prevState => ({
                modal: !prevState.modal
            }), () => this.props.deleteNote(id));
        }
    }

    clickOnPdf(): void {
        this.setState({click: !this.state.click});
    }

    render(): ReactNode {
        const note: MNote = this.props.note;

        const downloadPdf = (
            this.state.click ? (
                <div className="download-link" onClick={this.clickOnPdf}>
                    <PDFDownloadLink document={<PdfCreator note={note} />} fileName="note.pdf">
                        {({ loading }) => (loading ? 'Loading' : 'Download')}
                    </PDFDownloadLink>
                </div>
            ) : null
        );

        return (
            <Card className={`show-note ${note.type.toLowerCase()}`}>
                <CardHeader>
                    <div className="title-container">
                        <h2>{note.title}</h2>
                        <time className="date">{note.date}</time>
                        <span className="version">version {note.version}</span>
                    </div>
                    <span className={`priority ${note.priority.toLowerCase()}`} />
                </CardHeader>
                <CardBody>
                    {
                        note.text.length < 255 ? <ReactMarkdown source={note.text} /> : this.props.homepage ?
                            <ReactMarkdown source={`${note.text.substr(0, 255)}...`} /> :
                            <ReactMarkdown source={note.text} />
                    }
                    {
                        this.props.homepage ? null :
                            note.images.length > 0 ?
                                <div className="image-display-container">
                                    {
                                        note.images.map((image: string, index: number) => {
                                            return <img key={index} src={image} alt="image" />
                                        })
                                    }
                                </div> : null
                    }
                </CardBody>
                <CardFooter>
                    <div className="note-information">
                        <span className={`show-type-name ${note.type.toLowerCase()}`}>{note.type}</span>
                        {
                            this.props.homepage ?
                                note.images.length > 0 ?
                                    <div className="icon image">{note.images.length}</div>
                                    : null
                                : null
                        }
                    </div>
                    <div className="note-event">
                        {
                            this.props.homepage ? (
                                <Link to={`/show/${note.id}`} title="Show note" className="icon see" />
                            ) : null
                        }
                        <Link to={`/edit/${note.id}`} title="Edit" className="icon edit" />
                        <div className="icon pdf" onClick={this.clickOnPdf} />
                        {downloadPdf}
                        {
                            this.props.homepage ? null : (
                                <div className="icon print" onClick={() => window.print()} />
                            )
                        }
                        <div className="icon delete" onClick={this.toggleModal} />
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Are you sure ?</ModalHeader>
                            <ModalBody>
                                You are going to remove {note.title}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.clickedOnRemove(note.id)}>Remove</Button>
                                <Button className="purple-btn" onClick={this.toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </CardFooter>
            </Card>
        )
    }
}

interface IStateToProps {
    success: boolean;
}

interface IDispatchToProps {
    deleteNote: (id: number) => void;
    clearDeleteNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    success: state.deleteNote.success
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    deleteNote: (id: number) => dispatch(deleteNote(id)),
    clearDeleteNote: () => dispatch(clearDeleteNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Note);