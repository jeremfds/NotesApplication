import React, { Component, ReactNode, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Card, Form, FormGroup, Input, Label, Button, FormText, Spinner, UncontrolledAlert } from 'reactstrap';
import { MNote } from '../../../models/notes';
import { MErrors } from '../../../models/utils';
import { connect } from 'react-redux';
import { IRootState, RTDispatch } from '../../../roots';
import { getNotes } from '../../../actions/notes/actionGetNotes';
import { clearGetNotes } from '../../../actions/notes/actionGetNotes';
import { createNote } from '../../../actions/notes/actionCreateNote';
import { clearCreateNote } from '../../../actions/notes/actionCreateNote';
import './Create.scss';

interface IProps {
    notes: MNote[];
    successGetNotes: boolean;
    successCreateNote: boolean;
    getNotes: () => void;
    clearGetNotes: () => void;
    createNote: (notes: MNote[], note: MNote) => void;
    clearCreateNote: () => void;
}

interface IState {
    note: MNote;
    errors: MErrors;
    isEnabled: boolean;
    isLoading: boolean;
}

class Create extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            note: {
                id: 0,
                title: '',
                text: '',
                type: ''
            },
            errors: {
                title: '',
                text: '',
                type: ''
            },
            isEnabled: false,
            isLoading: true
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(): void {
        this.props.getNotes();
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.state.isLoading) {
            if (prevProps.successGetNotes !== this.props.successGetNotes) {
                setTimeout(() => this.setState({isLoading: false}), 500);
            }
            if (prevProps.successCreateNote !== this.props.successCreateNote) {
                setTimeout(() =>
                    this.setState({
                        note: { id: 0, title: '', text: '', type: '' },
                        isLoading: false,
                        isEnabled: false
                }), 500);
            }
        }
    }

    componentWillUnmount(): void {
        this.props.clearGetNotes();
        this.props.clearCreateNote();
    }

    validateForm(): void {
        const errors: MErrors = this.state.errors;
        const note: MNote = this.state.note;
        const hasErrors: boolean = Object.keys(errors).some((key: string) => errors[key] !== '');
        const emptyNote: boolean = Object.keys(note).some((key: string) => note[key] === '');
        this.setState({
            isEnabled: !hasErrors && !emptyNote
        });
    }

    validateField(name: string, value: string): void {
        let errors: MErrors = this.state.errors;
        switch (name) {
            case 'title':
                if (!value || value === '') {
                    errors[name] = 'Can\'t be blank';
                } else if (value.length < 2) {
                    errors[name] = 'Too short. 2 characters min.';
                } else if (value.length > 30) {
                    errors[name] = 'Too long. 30 characters max.';
                } else {
                    errors[name] = '';
                }
                break;
            case 'text':
                if (!value || value === '') {
                    errors[name] = 'Can\'t be blank';
                } else if (value.length < 5) {
                    errors[name] = 'Too short. 5 characters min.';
                } else if (value.length > 500) {
                    errors[name] = 'Too long. 500 characters max.';
                } else {
                    errors[name] = '';
                }
                break;
            case 'type':
                if (value.includes("Work") ||
                    value.includes("Personal") ||
                    value.includes("Other")) {
                    errors[name] = '';
                } else {
                    errors[name] = 'The type is not on the list.';
                }
                break;
            default:
                break;
        }
        this.setState({errors: errors}, () => this.validateForm());
    }

    onChange(event: ChangeEvent<HTMLInputElement>): void {
        const field: string = event.target.name;
        const note: MNote = this.state.note;
        const value: string = event.target.value;
        note[field] = value;
        this.setState({note: note}, () => this.validateField(field, value));
    }

    onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.state.isEnabled) {
            const note: MNote = this.state.note;
            const notes: MNote[] = this.props.notes;
            this.props.clearCreateNote();
            this.setState({isLoading: true}, () => this.props.createNote(notes, note));
        }
    }

    render(): ReactNode {
        const note: MNote = this.state.note;

        console.log(this.props.notes, "kkk : ",  this.props.successGetNotes);

        const successCreatedNote: ReactNode = (
            <UncontrolledAlert color="success">
                You successfully created a note
            </UncontrolledAlert>
        );

        if (!this.props.successGetNotes) {
            return (
                <Container className="create-note">
                    <Row>
                        <Col>
                            <div>Your browser is not compatible with LocalStorage</div>
                        </Col>
                    </Row>
                </Container>
            )
        }

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

        return (
            <Container className="create-note">
                <Row>
                    <Col>
                        <h1 className="text-center">Create a note</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{ size: 6, offset: 3 }}>
                        <Card>
                            {
                                this.props.successCreateNote ? successCreatedNote : null
                            }
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text"
                                           name="title"
                                           id="title"
                                           value={note.title}
                                           onChange={this.onChange}
                                           valid={note.title.length >= 2 && note.title.length <= 30}
                                           invalid={note.title.length < 2 && this.state.errors.title.length > 0
                                           || note.title.length > 30}
                                    />
                                    {
                                        this.state.errors.title &&
                                        <FormText color="danger">
                                            {this.state.errors.title}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="text">Text</Label>
                                    <Input type="textarea"
                                           name="text"
                                           id="text"
                                           value={note.text}
                                           onChange={this.onChange}
                                           valid={note.text.length >= 5 && note.text.length <= 500}
                                           invalid={note.text.length < 5 && this.state.errors.text.length > 0
                                           || note.text.length > 500}
                                    />
                                    {
                                        this.state.errors.text &&
                                        <FormText color="danger">
                                            {this.state.errors.text}
                                        </FormText>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="type">Select type</Label>
                                    <Input type="select"
                                           name="type"
                                           id="type"
                                           value={note.type}
                                           onChange={this.onChange}
                                           className="custom-select"
                                           valid={
                                               note.type.includes("Work") ||
                                               note.type.includes("Personal") ||
                                               note.type.includes("Other")
                                           }>
                                        <option hidden defaultValue="--">--</option>
                                        <option>Work</option>
                                        <option>Personal</option>
                                        <option>Other</option>
                                    </Input>
                                    {
                                        this.state.errors.type &&
                                        <FormText color="danger">
                                            {this.state.errors.type}
                                        </FormText>
                                    }
                                </FormGroup>
                                <Button className="purple-button"
                                        disabled={!this.state.isEnabled}>
                                    Create the note
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

interface IStateToProps {
    notes: MNote[];
    successGetNotes: boolean;
    successCreateNote: boolean;
}

interface IDispatchToProps {
    getNotes: () => void;
    clearGetNotes: () => void;
    createNote: (notes: MNote[], note: MNote) => void;
    clearCreateNote: () => void;
}

const mapStateToProps = (state: IRootState): IStateToProps => ({
    notes: state.getNotes.notes,
    successGetNotes: state.getNotes.success,
    successCreateNote: state.createNote.success
});

const mapDispatchToProps = (dispatch: RTDispatch): IDispatchToProps => ({
    getNotes: () => dispatch(getNotes()),
    clearGetNotes: () => dispatch(clearGetNotes()),
    createNote: (notes: MNote[], note: MNote) => dispatch(createNote(notes, note)),
    clearCreateNote: () => dispatch(clearCreateNote())
});

export default connect<IStateToProps, IDispatchToProps, IProps, IRootState>(
    mapStateToProps,
    mapDispatchToProps
)(Create);