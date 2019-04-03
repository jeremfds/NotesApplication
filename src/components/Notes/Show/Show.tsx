import React, { Component, ReactNode } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { NOTES } from '../../../configs';
import { showNote } from '../../../actions/notes/actionShowNote';
import { MNote } from '../../../models/notes';
import { IRootState, RTDispatch } from '../../../roots';
import {Redirect, RouteComponentProps} from 'react-router';
import Note from '../Note';
import CryptoJS, { DecryptedMessage } from 'crypto-js';
import './Show.scss';

interface IMatch  {
    id?: string;
}

interface IProps extends RouteComponentProps<IMatch> {
    note: MNote;
    success: boolean;
    notCompatible: boolean;
    showNote: (id: number) => void;
}

interface IState {
    note: MNote;
    isLoading: boolean;
    refreshNotes: boolean;
}

class Show extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            note: {
                id: 1,
                title: '',
                text: '',
                type: '',
                priority: '',
                date: ''
            },
            isLoading: true,
            refreshNotes: false
        };
        this.refreshNotes = this.refreshNotes.bind(this);
    }

    componentDidMount(): void {
        const id: number = parseInt(this.props.match.params.id);
        if (isNaN(id)) {
            this.props.history.push('/');
        } else {
            const getItem: string = window.localStorage.getItem(NOTES);
            if (getItem) {
                const bytes: DecryptedMessage = CryptoJS.AES.decrypt(getItem, 'jeremy');
                const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
                const notes: MNote[] = JSON.parse(originalText);
                if (notes !== null) {
                    if (notes.some(note => note.id === id)) {
                        this.props.showNote(id);
                    } else {
                        this.props.history.push('/');
                    }
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.props.history.push('/');
            }
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (!Object.equals(nextProps.note, prevState.note)) {
            return {
                note: nextProps.note
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.state.isLoading) {
            setTimeout(() => this.setState({isLoading: false}), 300);
        }
    }

    refreshNotes(makeRefresh: boolean): void {
        this.setState({refreshNotes: makeRefresh, isLoading: true});
    }

    render(): ReactNode {

        if (this.props.notCompatible) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <p className="text-center">
                                Your browser is not compatible with the localStorage technology.
                            </p>
                        </Col>
                    </Row>
                </Container>
            )
        }

        if (this.state.isLoading) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Spinner />
                        </Col>
                    </Row>
                </Container>
            )
        }

        if (this.state.refreshNotes) {
            return <Redirect to={'/'} />
        }

        const note: MNote = this.state.note;
        if (Object.empty(note) || note === null) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <p className="text-center">This note has already been deleted or does not exist</p>
                        </Col>
                    </Row>
                </Container>
            )
        }

        return (
            <Container className="note-details">
                <Row>
                    <Col xs={12} sm={{ size: 8, offset: 2 }} className="for-print">
                        <h1>Detail of the note</h1>
                        <Note note={note} homepage={false} refreshNotes={this.refreshNotes} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

interface IStateToProps {
    note: MNote;
    success: boolean;
    notCompatible: boolean;
}

interface IDispatchToProps {
    showNote: (id: number) => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    note: state.showNote.note,
    success: state.showNote.success,
    notCompatible: state.showNote.notCompatible
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    showNote: (id: number) => dispatch(showNote(id))
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Show);