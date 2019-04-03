import React, { Component, ReactNode } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearGetNotes, getNotes } from '../../../actions/notes/actionGetNotes';
import { clearShowNote } from '../../../actions/notes/actionShowNote';
import { MNote } from '../../../models/notes';
import { IRootState, RTDispatch } from '../../../roots';
import Note from '../Note';
import Search from './Search';

interface IProps {
    notes: MNote[];
    success: boolean;
    successDeleteAllNotes: boolean;
    notCompatible: boolean;
    getNotes: () => void;
    clearGetNotes: () => void;
    clearShowNote: () => void;
}

interface IState {
    notes: MNote[];
    isLoading: boolean;
    refreshNotes: boolean;
    searched: boolean;
    searchLoading: boolean;
}

class All extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            notes: [],
            isLoading: true,
            refreshNotes: false,
            searched: false,
            searchLoading: false
        };
        this.refreshNotes = this.refreshNotes.bind(this);
        this.searchNotes = this.searchNotes.bind(this);
        this.hasDeleted = this.hasDeleted.bind(this);
    }

    componentDidMount(): void {
        this.props.getNotes();
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (!Array.equals(nextProps.notes, prevState.notes) && !prevState.searched) {
            return {
                notes: nextProps.notes
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.state.isLoading) {
            if (this.state.refreshNotes !== prevState.refreshNotes) {
                this.setState({refreshNotes: false, searched: false}, () => this.props.getNotes());
            }
            setTimeout(() => this.setState({isLoading: false}), 300);
        } else if (this.state.searchLoading) {
            setTimeout(() => this.setState({searchLoading: false}), 300);
        }
    }

    componentWillUnmount(): void {
        this.props.clearGetNotes();
        this.props.clearShowNote();
    }

    refreshNotes(makeRefresh: boolean): void {
        this.setState({refreshNotes: makeRefresh, isLoading: true});
    }

    searchNotes(notes: MNote[]): void {
        this.setState({notes: notes.reverse(), searched: true, searchLoading: true});
    }

    hasDeleted(): void {
        this.setState({isLoading: true, searched: false});
        setTimeout(() => this.props.getNotes(), 300);
    }

    render(): ReactNode {

        if (this.props.notCompatible || this.props.successDeleteAllNotes) {
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

        const notes: MNote[] = this.state.notes.reverse();
        if (Array.empty(notes) && !this.state.searched) {
            return (
                <Container>
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

        const displayNotes: ReactNode = (
            this.state.searchLoading ? (
                <Row>
                    <Col>
                        <Spinner />
                    </Col>
                </Row>
            ) : Array.empty(notes) && this.state.searched ? (
                <Row>
                    <Col>
                        <p className="text-center"> No notes</p>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                        {
                            notes.map((note: MNote, index: number) => {
                                return (
                                    <Note key={index}
                                          note={note}
                                          homepage={true}
                                          refreshNotes={this.refreshNotes}
                                    />
                                )
                            })
                        }
                    </Col>
                </Row>
            )
        );

        return (
            <Container>
                <Row>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                        <h1>My notes</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                        <Search searchNotes={this.searchNotes} hasDeleted={this.hasDeleted} />
                    </Col>
                </Row>
                {displayNotes}
            </Container>
        )
    }
}

interface IStateToProps {
    notes: MNote[];
    success: boolean;
    notCompatible: boolean;
    successDeleteAllNotes: boolean;
}

interface IDispatchToProps {
    getNotes: () => void;
    clearGetNotes: () => void;
    clearShowNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    notes: state.getNotes.notes,
    success: state.getNotes.success,
    notCompatible: state.getNotes.notCompatible,
    successDeleteAllNotes: state.deleteAllNotes.success
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    getNotes: () => dispatch(getNotes()),
    clearGetNotes: () => dispatch(clearGetNotes()),
    clearShowNote: () => dispatch(clearShowNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(All);