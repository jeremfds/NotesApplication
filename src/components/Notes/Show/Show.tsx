import React, { Component, ReactNode } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { showNote, clearShowNote } from '../../../actions/notes/actionShowNote';
import { MNote } from '../../../models/notes';
import { IRootState, RTDispatch } from '../../../roots';
import {Redirect, RouteComponentProps} from 'react-router';
import Note from '../Note';

interface IMatch  {
    id?: string;
}

interface IProps extends RouteComponentProps<IMatch> {
    note: MNote[];
    success: boolean;
    showNote: (id: number) => void;
    clearShowNote: () => void;
}

interface IState {
    note: MNote[];
    isLoading: boolean;
    refreshNotes: boolean;
}

class Show extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            note: [],
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
            this.props.showNote(id);
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (!Array.equals(nextProps.note, prevState.note)) {
            return {
                note: nextProps.note
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.state.isLoading) {
            setTimeout(() => this.setState({isLoading: false}), 300);
        }
    }

    componentWillUnmount(): void {
        this.props.clearShowNote();
    }

    refreshNotes(makeRefresh: boolean): void {
        this.setState({refreshNotes: makeRefresh, isLoading: true});
    }

    render(): ReactNode {
        const note: MNote[] = this.state.note;

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

        if (Array.empty(note) || note === null) {
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
            <Container>
                <Row>
                    <Col xs={12} sm={{ size: 8, offset: 2 }}>
                        <h1>Note details</h1>
                        {
                            note.map((note: MNote, index: number) => {
                                return (
                                    <Note key={index} note={note} homepage={false} refreshNotes={this.refreshNotes} />
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
    note: MNote[];
    success: boolean;
}

interface IDispatchToProps {
    showNote: (id: number) => void;
    clearShowNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    note: state.showNote.note,
    success: state.showNote.success
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    showNote: (id: number) => dispatch(showNote(id)),
    clearShowNote: () => dispatch(clearShowNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Show);