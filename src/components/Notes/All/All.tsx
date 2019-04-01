import React, { Component, ReactNode } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearGetNotes, getNotes } from '../../../actions/notes/actionGetNotes';
import { MNote } from '../../../models/notes';
import { IRootState, RTDispatch } from '../../../roots';
import Note from './Note';
import './All.scss';

interface IProps {
    notes: MNote[];
    success: boolean;
    notCompatible: boolean;
    getNotes: () => void;
    clearGetNotes: () => void;
}

interface IState {
    notes: MNote[];
    isLoading: boolean;
    refreshNotes: boolean;
}

class All extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            notes: [],
            isLoading: true,
            refreshNotes: false
        };
        this.refreshNotes = this.refreshNotes.bind(this);
    }

    componentDidMount(): void {
        this.props.getNotes();
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
       if (!Array.equals(nextProps.notes, prevState.notes)) {
           return {
               notes: nextProps.notes
           }
       }
       return null;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.state.isLoading) {
            if (this.state.refreshNotes !== prevState.refreshNotes) {
                this.setState({refreshNotes: false}, () => this.props.getNotes());
            }
            setTimeout(() => this.setState({isLoading: false}), 300);
        }
    }

    refreshNotes(makeRefresh: boolean): void {
        this.setState({refreshNotes: makeRefresh, isLoading: true});
    }

    render(): ReactNode {
        const notes: MNote[] = this.state.notes;

        if (this.state.isLoading) {
            return (
                <Container className="create-note">
                    <Row>
                        <Col>
                            <Spinner />
                        </Col>
                    </Row>
                </Container>
            )
        }

        if (this.props.notCompatible) {
            return (
                <Container className="create-note">
                    <Row>
                        <Col>
                            <p>Your browser is not compatible with the localStorage technology.</p>
                        </Col>
                    </Row>
                </Container>
            )
        }

        if (Array.empty(notes)) {
            return (
                <Container className="my-notes">
                    <Row>
                        <Col xs={12} sm={{ size: 8, offset: 2 }}>
                            <div className="text-center welcome">
                                <h1>Welcome to EasyNotes 👋</h1>
                                <p>It's a simple application that you can create, modify or delete a note.</p>
                                <p>Let's get started by creating a note</p>
                                <Link to="/create"
                                      title="Create a note"
                                      className="purple-button">
                                    Create a note
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }

        return (
            <Container className="my-notes">
                <Row>
                    <Col xs={12} sm={{ size: 8, offset: 2 }}>
                        <h1>My notes</h1>
                        {
                            notes.map((note: MNote, index: number) => {
                               return (
                                   <Note key={index} note={note} refreshNotes={this.refreshNotes} />
                               )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

interface IStateToProps {
    notes: MNote[];
    success: boolean;
    notCompatible: boolean;
}

interface IDispatchToProps {
    getNotes: () => void;
    clearGetNotes: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    notes: state.getNotes.notes,
    success: state.getNotes.success,
    notCompatible: state.getNotes.notCompatible
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    getNotes: () => dispatch(getNotes()),
    clearGetNotes: () => dispatch(clearGetNotes())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(All);